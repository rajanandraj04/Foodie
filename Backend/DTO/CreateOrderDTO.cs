namespace Food_api.Models;

public class CreateOrderDTO

{
    //  public int OrderItemId { get; set; }

    // public int? OrderId { get; set; }

    public int? MenuItemId { get; set; }

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

}