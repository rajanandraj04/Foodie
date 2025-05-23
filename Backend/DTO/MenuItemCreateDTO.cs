using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Food_api.Models;

public class MenuItemCreateDTO
{
    
   

    public string dishname {get; set;}

    public string Description {get;set;}

    public string ImageUrl {get;set;}

    public decimal Rating {get; set;}

    

    public decimal Price {get; set;}
}
