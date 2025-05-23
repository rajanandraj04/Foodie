using Food_api.Models;
using Food_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
namespace Food_api;

[Route("api/[controller]")]
[ApiController]

public class UserController : ControllerBase
{
    FoodDeliveryFoodContext db = new FoodDeliveryFoodContext();
    private readonly LoginInterface _loginservice;
    public UserController(LoginInterface loginservice)
    {
        this._loginservice = loginservice;
    }

    // [HttpGet("{Id}/{password}")]
    // public async Task<ActionResult<User>> GetUser(int Id, string password)
    // {
    //     //  && x.Role=="Customer"
    //     var c = db.Users.Where(x => x.UserId == Id && x.Password == password).Include(u => u.Restaurants).ThenInclude(y => y.MenuItems).ThenInclude(z => z.Dish).FirstOrDefault();
    //     if (c == null)
    //     {
    //         return NotFound("You are not an user, Please Register");
    //     }
    //     else
    //     {
    //         return Ok(c);
    //     }
    // }
    // [HttpGet("GetAll")]
    // public async Task<ActionResult<User>> Getall()
    // {
    //     var data = await _loginservice.GetUser();
    //     if (data is null)
    //     {
    //         return NotFound();
    //     }
    //     return Ok(data);
    // }

    [HttpPost("Register")]
    public async Task<ActionResult<UserDto>> CreateUser(UserDto user){
        var addUser = await _loginservice.AddEmployee(user);
        return Ok(addUser);
    }
    [HttpGet("GetUser")]
    public async Task<ActionResult<User>> GetUser(string Email, string password)
    {
        var c = db.Users.Where(x => x.Email == Email && x.Password == password).Include(u => u.Restaurants).ThenInclude(y => y.MenuItems).ThenInclude(z => z.Dish).FirstOrDefault();
        if (c == null)
        {
            return NotFound("You are not an user, Please Register");
        }
        else
        {
            
            return Ok(c);
        }
    } 
}
