using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace Food_api.Models;


    public class OrderResponseDto
    {
       
    public DateOnly OrderDate { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; }
    public List<OrderItemDetailDto> OrderItems { get; set; } 
    }
