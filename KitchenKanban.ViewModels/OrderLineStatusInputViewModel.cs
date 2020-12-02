using static KitchenKanban.Models.Enums.OrderEnum;

namespace KitchenKanban.ViewModels
{
    public class OrderLineStatusInputViewModel
    {
        public string OrderLineId { get; set; }        
        public string KitchenId { get; set; }
        public string PreparedById { get; set; }
        public OrderLineStatus OrderLineStatus { get; set; }
    }
}
