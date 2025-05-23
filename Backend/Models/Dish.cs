using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Food_api.Models;

public partial class Dish
{
    public int DishId { get; set; }

    public string? Name { get; set; }

    [JsonIgnore]
    public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
}
