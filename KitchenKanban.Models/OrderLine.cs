using static KitchenKanban.Models.Enums.OrderEnum;

namespace KitchenKanban.Models
{
    public class OrderLine : BaseModel
    {
        public string OrderLineId { get; set; }
        public string OrderId { get; set; }
        public string ItemId { get; set; }
        public int OrderQuantity { get; set; }
        public string KitchenId { get; set; }
        public string PreparedById { get; set; }
    }
}
