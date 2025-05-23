using System;
using System.Collections.Generic;

namespace Food_api.Models;


public class ordrerdto
{
    


public int UserId { get; set; }
    public List<orderitemsDto> OrderItems { get; set; }
}
