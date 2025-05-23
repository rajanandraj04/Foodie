using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Food_api.Models;

public partial class Restaurant
{
    public int RestaurantId { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Description {get;set;}

    public string? Email { get; set; }

    public decimal? Rating { get; set; }

    public string? ImageUrl { get; set; }

    public int? OwnerId { get; set; }

    public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    [JsonIgnore]
    public virtual User? Owner { get; set; }
}
