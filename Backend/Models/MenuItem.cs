using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Food_api.Models;

public partial class MenuItem
{
    public int MenuItemId { get; set; }

    public int? RestaurantId { get; set; }

    public int? DishId { get; set; }

    public decimal? Price { get; set; }

    public decimal? Rating { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }
    [JsonIgnore]
    public virtual Dish? Dish { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    [JsonIgnore]
    public virtual Restaurant? Restaurant { get; set; }
}
