using System;
using static KitchenKanban.Models.Enums.OrderEnum;

namespace KitchenKanban.ViewModels.Dashboard
{
    public class KanbanOrder
    {
        public string OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime? OrderDate { get; set; }
        public string CustomerName { get; set; }
        public string CustomerContactNumber { get; set; }
        public decimal OrderAmount { get; set; }
        public OrderType OrderType { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public int OrderLineCount { get; set; }
    }
}
