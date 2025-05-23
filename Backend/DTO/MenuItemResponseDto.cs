using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Food_api.Models;

public class MenuItemResponseDto
{
    

    public int RestaurantID {get; set;}

    public int DishID {get; set;}

    public decimal Price {get; set;}
}
