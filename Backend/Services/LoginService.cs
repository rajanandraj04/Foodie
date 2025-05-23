using Food_api.Models;
using Food_api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Food_api;

public class LoginService : LoginInterface
{
    private readonly FoodDeliveryFoodContext _context;
        public LoginService(FoodDeliveryFoodContext _context){
        this._context=_context;
    }

    public async Task<User> AddEmployee(UserDto user)
    {
        var d = new User(){
            Name = user.Name,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            Address = user.Address,
            Password = user.Password,
            Role = user.Role
        };
        _context.Users.Add(d);
        await _context.SaveChangesAsync();
        return d;
    }

    public async Task<IEnumerable<User>> GetUser()
    {
        return await _context.Users.ToListAsync<User>();
    }

    
    public async Task<User> NormalUserLogin(int UserId, string Password)
    {
       var c = _context.Users.Where(x => x.UserId == UserId && x.Password == Password).Include(u => u.Restaurants).ThenInclude(y => y.MenuItems).ThenInclude(z => z.Dish).FirstOrDefault();
       return c;
    }

    public async Task<User> UserLogin(string Email, string Password)
    {
        var c = _context.Users.Where(x => x.Email == Email && x.Password == Password).Include(u => u.Restaurants).ThenInclude(y => y.MenuItems).ThenInclude(z => z.Dish).FirstOrDefault();
        return c;
    }
}
