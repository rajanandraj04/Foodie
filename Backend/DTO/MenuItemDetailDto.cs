using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Food_api.Models;

public class MenuItemDetailDto
{
    public string DishName{get; set;}

    public decimal Price{get; set;}

    public string Description{get; set;}

    public decimal Rating{get;set;}

    public string ImageUrl{get;set;}

    public int MenuItemId {get;set;}

    public int restaurantId {get; set;}
    
}
