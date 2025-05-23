using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Food_api.Data;
using Food_api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Food_api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Food_api;
[Route("api/[controller]")]
[ApiController]

public class MenuItemsController : ControllerBase
{
    private readonly FoodDeliveryFoodContext _context;

    public MenuItemsController(FoodDeliveryFoodContext context)
    {
        _context = context;
    }

    [HttpPost("{restaurantId}")]
    public async Task<ActionResult<MenuItemResponseDto>> AddMenuItem(int restaurantId,MenuItemCreateDTO menuItemCreateDto)
    {
        // Validate if the restaurant exists
        var restaurant = await _context.Restaurants.FindAsync(restaurantId);
        if (restaurant == null)
        {
            return NotFound($"Restaurant with ID {restaurantId} not found.");
        }

        var dish = _context.Dishes.FirstOrDefault(d =>d.Name == menuItemCreateDto.dishname);
        if(dish == null){
            dish = new Dish{
                Name = menuItemCreateDto.dishname,
            };
        
        _context.Dishes.Add(dish);
        await _context.SaveChangesAsync();
        }

        var menuItem = new MenuItem{
            RestaurantId = restaurantId,
            DishId = dish.DishId,
            Price = menuItemCreateDto.Price,
            Description = menuItemCreateDto.Description,
            ImageUrl = menuItemCreateDto.ImageUrl,
            Rating = (decimal)4.2
        };

        _context.MenuItems.Add(menuItem);
        await _context.SaveChangesAsync();
        return Ok(menuItem);
    }

        // Create a new MenuItem
    //     var menuItem = new MenuItem
    //     {
            
    //         DishId = menuItemCreateDto.DishID,
    //         Price = menuItemCreateDto.Price,
    //         RestaurantId = restaurantId
    //     };

    //     // Add the MenuItem to the database
    //     _context.MenuItems.Add(menuItem);
    //     await _context.SaveChangesAsync();

    //     // Create response DTO
    //     var responseDto = new MenuItemResponseDto
    //     {
    //         RestaurantID = (int)menuItem.RestaurantId,
    //         DishID = (int)menuItem.DishId,
    //         Price = (decimal)menuItem.Price
    //     };

    //     return CreatedAtAction(nameof(GetMenuItem), new { id = menuItem.MenuItemId }, responseDto);
    // }

    // // GET: api/MenuItems/5
    // [HttpGet("{id}")]
    // public async Task<ActionResult<MenuItemResponseDto>> GetMenuItem(int id)
    // {
    //     var menuItem = await _context.MenuItems.Include(mi => mi.Restaurant).FirstOrDefaultAsync(mi => mi.MenuItemId == id);

    //     if (menuItem == null)
    //     {
    //         return NotFound();
    //     }

    //     var responseDto = new MenuItemResponseDto
    //     {
    //         RestaurantID = (int)menuItem.RestaurantId,
    //         DishID = (int)menuItem.DishId,
    //         Price = (decimal)menuItem.Price

    //     };

    //     return Ok(responseDto);
    // }

    [HttpGet("Restaurant/{restaurantId}")]
    public async Task<ActionResult<IEnumerable<MenuItemDetailDto>>> GetMenuItemsByRestaurant(int restaurantId)
    {
        var restaurant = await _context.Restaurants.FindAsync(restaurantId);
        if (restaurant == null)
        {
            return NotFound($"Restaurant with ID {restaurantId} not found.");
        }

        var menuItems = await _context.MenuItems
                                      .Where(mi => mi.RestaurantId == restaurantId)
                                      .Include(mi => mi.Dish)
                                      .Select(mi => new MenuItemDetailDto
                                      {
                                          
                                          DishName = mi.Dish.Name,
                                          Price = (decimal)mi.Price,
                                          Description = mi.Description,
                                          Rating = (decimal)mi.Rating,
                                          ImageUrl = mi.ImageUrl,
                                          MenuItemId = mi.MenuItemId,
                                          restaurantId = (int)mi.RestaurantId

                                      })
                                      .ToListAsync();

        return Ok(menuItems);
    }

    [HttpGet("Dish/{dishname}")]
    public async Task<ActionResult<IEnumerable<RestaurantDto>>> GetRestaurantsByDish(string dishname){
        var dishes = await _context.Dishes.Where(d => d.Name.Contains(dishname)).ToListAsync();
        if(dishes == null || !dishes.Any()){
            return NotFound("Bye");
        }
        var dishIds = dishes.Select(d => d.DishId).ToList();

        var menuItems = await _context.MenuItems.Where(mi =>mi.DishId.HasValue && dishIds.Contains(mi.DishId.Value)).Include(mi =>mi.Restaurant).ToListAsync();
    
        var restaurantDetails = menuItems.GroupBy(g =>g.Restaurant).Select(mi => new RestaurantDetailDto{
            Name = mi.Key.Name,
            Address = mi.Key.Address,
            PhoneNumber = mi.Key.PhoneNumber,
            Email = mi.Key.Email,
            Description = mi.Key.Description,
            Rating = (decimal)mi.Key.Rating,
            restaurantId = mi.Key.RestaurantId


        }).ToList();
        return Ok(restaurantDetails);
    
    }

    [HttpDelete("DeleteMenuItem")]
    public async Task<ActionResult<MenuItem>> Delete(int MenuItemId){
        var c = await _context.MenuItems.FindAsync(MenuItemId);
        if(c!=null){
            _context.MenuItems.Remove(c);
            await _context.SaveChangesAsync();
            return Ok(c);
        }
        return NotFound("MenuItem does not exists");
    }
}
