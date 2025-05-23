using System;
using System.Collections.Generic;

namespace Food_api.Models;

    public class OrderItemDetailDto
    {
     
    public int MenuItemId { get; set; }
    public string DishName { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    }
