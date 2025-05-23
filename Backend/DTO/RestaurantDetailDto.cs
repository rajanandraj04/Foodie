using System;
using System.Collections.Generic;

namespace Food_api.Models;

public class RestaurantDetailDto
{
    

    public string? Name { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public string Description {get; set;}

    public decimal Rating {get;set;}

    public int restaurantId {get; set;}

    
}
