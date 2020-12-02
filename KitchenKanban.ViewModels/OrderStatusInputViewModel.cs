using static KitchenKanban.Models.Enums.OrderEnum;

namespace KitchenKanban.ViewModels
{
    public class OrderStatusInputViewModel
    {
        public string OrderId { get; set; }        
        public OrderStatus OrderStatus { get; set; }
        public string CancellationReason { get; set; }
    }
}
