using static KitchenKanban.Models.Enums.OrderEnum;

namespace KitchenKanban.ViewModels
{
    public class OrderLineViewModel
    {
        public string OrderLineId { get; set; }
        public string OrderId { get; set; }
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public decimal ItemCharge { get; set; }
        public int OrderQuantity { get; set; }
        public string KitchenId { get; set; }
        public string PreparedById { get; set; }

        public ItemViewModel Item { get; set; }
    }
}
