using Food_api.Models;
using Food_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Food_api.Interfaces;
namespace Food_api;

[Route("api/[controller]")]
[ApiController]

public class RestaurantController:ControllerBase
{
    FoodDeliveryFoodContext db = new FoodDeliveryFoodContext();
    private readonly RestaurantInterface _restaurantservice;
    public RestaurantController(RestaurantInterface restaurantservice)
    {
        this._restaurantservice = restaurantservice;
    }

    [HttpGet("GetRestaurantsbyResId/{Id}")]
    public async Task<ActionResult<Restaurant>> GetRestaurantsbyresId(int Id){
        var c = await _restaurantservice.GetRestaurantByResID(Id);
        return Ok(c);
    }


    [HttpGet("GetRestaurantsbyUserId/{Id}")]
    public async Task<ActionResult<Restaurant>> GetRestaurantsbyId(int Id){
        var c = await _restaurantservice.displayForUser(Id);
        return Ok(c);
    }

    [HttpPost("AddRestaurant")]
    public async Task<ActionResult<Restaurant>> Add(RestaurantDto restaurantDto){
        var c = await _restaurantservice.AddRestaurant(restaurantDto);
        if(c!=null){
            return(c);
        }
        else{
            return NotFound("You do not have permisiion to add restaurant");
        }
        
    }

    [HttpGet("Getall")]
     public async Task<ActionResult<Restaurant>> displayAll(){
        var c = await _restaurantservice.displayAllRestaurant();
        return Ok(c);
     }


    [HttpDelete("Delete Restaurant")]

    public async Task<ActionResult<Restaurant>> Delete(int id){
        var c = await _restaurantservice.DeleteRestaurant(id);
        return Ok(c);
    }



    
}
