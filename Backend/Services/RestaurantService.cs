using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Food_api.Interfaces;
using Food_api.Models;
using Food_api.Data;
using Food_api;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;


public class RestaurantService : RestaurantInterface
{


    private readonly FoodDeliveryFoodContext _context;
    public RestaurantService(FoodDeliveryFoodContext _context)
    {
        this._context = _context;

    }

    public Task<MenuItem> addMenuItem(int RestaurantID)
    {
        throw new NotImplementedException();
    }

    public async Task<Restaurant> AddRestaurant(RestaurantDto restaurantDto)
    {
       
                var d = new Restaurant()
                {
                    Name = restaurantDto.Name,
                    Address = restaurantDto.Address,
                    PhoneNumber = restaurantDto.PhoneNumber,
                    Email = restaurantDto.Email,
                    ImageUrl =restaurantDto.ImageUrl,
                    Rating = (decimal?)4.5,
                    OwnerId = restaurantDto.OwnerId
                };
                _context.Restaurants.Add(d);
                await _context.SaveChangesAsync();
                return d;
            }
        

      
    public async Task<Restaurant> DeleteRestaurant(int id)
    {
       var menu = _context.MenuItems.Where(x => x.RestaurantId == id).ToList();
       
        foreach(var x in menu)
        {
            _context.MenuItems.Remove(x);
        }
        await _context.SaveChangesAsync();
 
        var restaurant = await _context.Restaurants.FindAsync(id);
        if (restaurant == null)
        {
            return null;
        }
       
        _context.Restaurants.Remove(restaurant);
        await _context.SaveChangesAsync();
       
 
        return restaurant;
    }

    public async Task<IEnumerable<Restaurant>> displayAllRestaurant()
    {
        return await _context.Restaurants.Include(u => u.MenuItems).ThenInclude(y => y.Dish).ToListAsync<Restaurant>();
    }

    public async Task<IEnumerable<Restaurant>> displayForUser(int Id)
    {
        var c = _context.Users.Where(x => x.UserId == Id).Include(u => u.Restaurants).ThenInclude(y => y.MenuItems).ThenInclude(z => z.Dish).FirstOrDefault();
        if (c != null)
        {
            if (c.Role == "customer")
            {
                var d = await displayAllRestaurant();
                return d;
            }
            else if (c.Role == "owner")
            {
                var e = _context.Restaurants.Where(x => x.OwnerId == Id);
                return e;
            }

        }
        throw new NotImplementedException();
    }

    public async Task<Restaurant> GetRestaurantByResID(int id)
    {   
         var restaurant = await _context.Restaurants.FindAsync(id);
         return restaurant;
    }
}
