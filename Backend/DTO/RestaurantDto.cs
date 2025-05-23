using System;
using System.Collections.Generic;

namespace Food_api.Models;

public class RestaurantDto
{
    

    public string? Name { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public int? OwnerId { get; set; }

    public string ImageUrl{get;set;}

    public decimal Rating{get;set;}

   
}
