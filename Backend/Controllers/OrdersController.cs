using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Food_api.Data;
using Food_api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Food_api.Models;
using Microsoft.EntityFrameworkCore;

namespace Food_api;


[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly FoodDeliveryFoodContext _context;

    public OrderController(FoodDeliveryFoodContext context)
    {
        _context = context;
    }

    // [HttpPost("{userId}/AddToCart")]
    // public async Task<IActionResult> AddToCart(int userId, [FromBody] List<orderitemsDto> orderItemsDto,int restaurantId)
    // {
    //     if (orderItemsDto == null || !orderItemsDto.Any())
    //     {
    //         return BadRequest("Order items cannot be empty.");
    //     }

    //     // Get or create an order for the user
    //     var order = await _context.Orders
    //         .FirstOrDefaultAsync(o => o.UserId == userId && o.Status == "Pending");

    //     if (order == null)
    //     {
    //         order = new Order
    //         {
    //             UserId = userId,
    //             OrderDate = DateTime.Now,
    //             Status = "Pending",
    //             RestaurantId = restaurantId,
    //         };
    //         _context.Orders.Add(order);
    //         await _context.SaveChangesAsync();
    //     }

    //     // Add items to the order
    //     foreach (var itemDto in orderItemsDto)
    //     {
    //         var menuItem = await _context.MenuItems.FindAsync(itemDto.MenuItemId);
    //         if (menuItem == null)
    //         {
    //             return NotFound($"MenuItem with ID {itemDto.MenuItemId} not found.");
    //         }

    //         var orderItem = new OrderItem
    //         {
    //             OrderId = order.OrderId,
    //             MenuItemId = itemDto.MenuItemId,
    //             Quantity = itemDto.Quantity,
    //             Price = menuItem.Price * itemDto.Quantity
    //         };

    //         _context.OrderItems.Add(orderItem);
    //     }

    //     await _context.SaveChangesAsync();

    //     return Ok(order);
    // }

    // [HttpPost("CreateOrder")]
    // public async  Task<IActionResult> AddToCart(int userId,int restaurantId,decimal TotalAmount){
    //     var d = new Order{
    //         UserId = userId,
    //         RestaurantId = restaurantId,
    //         OrderDate = DateTime.Now,
    //         TotalAmount = TotalAmount,
    //         Status = "Ordered"
    //     };
    //     _context.Orders.Add(d);
    //     await _context.SaveChangesAsync();
    //     return Ok(d);
    // }

    // [HttpPost("CreateOrder")]
    // public async Task<IActionResult> AddToCart(int userId, int restaurantId, decimal TotalAmount, List<CreateOrderDTO> orderItems)
    // {
    //     var order = new Order
    //     {
    //         UserId = userId,
    //         RestaurantId = restaurantId,
    //         OrderDate = DateTime.Now,
    //         TotalAmount = TotalAmount,
    //         Status = "Ordered"
    //     };

    //     _context.Orders.Add(order);
    //     await _context.SaveChangesAsync();

    //     foreach (var item in orderItems)
    //     {
    //         var orderItem = new OrderItem
    //         {
    //             OrderId = order.OrderId,
    //             MenuItemId = item.MenuItemId,
    //             Quantity = item.Quantity,
    //             Price = item.Price
    //         };

    //         _context.OrderItems.Add(orderItem);
    //     }

    //     await _context.SaveChangesAsync();

    //     return Ok(order);
    // }

    [HttpPost("CreateOrder")]
    public async Task<IActionResult> AddToCart(int userId, int restaurantId, decimal TotalAmount, List<CreateOrderDTO> orderItems)
    {
        var order = new Order
        {
            UserId = userId,
            RestaurantId = restaurantId,
            OrderDate = DateTime.Now,
            TotalAmount = TotalAmount,
            Status = "Ordered"
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        var a = _context.Orders.Where(x => (x.UserId == userId) && (x.RestaurantId == restaurantId) && (x.TotalAmount == TotalAmount)).OrderByDescending(x => x.OrderId).FirstOrDefault();

        foreach (var item in orderItems)
        {
            var orderItem = new OrderItem
            {
                OrderId = a.OrderId,
                MenuItemId = item.MenuItemId,
                Quantity = item.Quantity,
                Price = item.Price
            };

            _context.OrderItems.Add(orderItem);
        }

        await _context.SaveChangesAsync();

        return Ok(a);
    }



    [HttpGet("GetOrderbyUserid/{Id}")]

    public async Task<ActionResult<IEnumerable<Order>>> GetOrderData(int Id)
    {

        var orders = _context.Orders.Where(x => x.UserId == Id).Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItem).ThenInclude(mi => mi.Dish).ToList()
                                                                .Select(o => new

                                                                {
                                                                    OrderId = o.OrderId,
                                                                    OrderDate = o.OrderDate,
                                                                    restaurant = o.RestaurantId,
                                                                    TotalAmount = o.TotalAmount,
                                                                    status = o.Status,
                                                                    Items = o.OrderItems.Select(oi => new
                                                                    {
                                                                        DishName = oi.MenuItem.Dish.Name,
                                                                        Price = oi.Price,
                                                                        Quantity = oi.Quantity,
                                                                        DishTotal = oi.Price * oi.Quantity,
                                                                        ImageUrl = oi.MenuItem.ImageUrl
                                                                    }).ToList()
                                                                }).GroupBy(o => o.OrderId);

        return Ok(orders);

    }

    [HttpGet("GetAllOrdersByRestaurant")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByResOwner(int id){
        var orders = _context.Orders.Where(x => x.RestaurantId == id).Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItem).ThenInclude(mi => mi.Dish).ToList()
                                                                .Select(o => new

                                                                {
                                                                    OrderId = o.OrderId,
                                                                    OrderDate = o.OrderDate,
                                                                    restaurant = o.RestaurantId,
                                                                    TotalAmount = o.TotalAmount,
                                                                    status = o.Status,
                                                                    Items = o.OrderItems.Select(oi => new
                                                                    {
                                                                        DishName = oi.MenuItem.Dish.Name,
                                                                        Price = oi.Price,
                                                                        Quantity = oi.Quantity,
                                                                        DishTotal = oi.Price * oi.Quantity,
                                                                        ImageUrl = oi.MenuItem.ImageUrl
                                                                    }).ToList()
                                                                }).GroupBy(o => o.OrderId);

        return Ok(orders);
    }

    [HttpPut("StatusChange_InTransit")]
 
    public async Task<IActionResult> changeStatustransit(int orderId)
    {
 
        var a = await _context.Orders.FindAsync(orderId);
        if(a == null)
        {
            return NotFound();
        }
        a.Status = "In-Transit";
        await _context.SaveChangesAsync();
 
        return Ok(a);
    }
 
    [HttpPut("StatusChange_Delivered")]
 
    public async Task<IActionResult> changeStatusdelivered(int orderId)
    {
 
        var a = await _context.Orders.FindAsync(orderId);
        if(a == null)
        {
            return NotFound();
        }
        a.Status = "Delivered";
        await _context.SaveChangesAsync();
 
        return Ok(a);
    }
}