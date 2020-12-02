using System;
using System.Collections.Generic;
using static KitchenKanban.Models.Enums.OrderEnum;

namespace KitchenKanban.Models
{
    public class Order
    {
        public string OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime? OrderDate { get; set; }
        public string CustomerName { get; set; }
        public string CustomerContactNumber { get; set; }
        public decimal OrderAmount { get; set; }        
        public decimal TotalAmount { get; set; }
        public OrderType OrderType { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public string OrderTakenBy { get; set; }

        public virtual List<OrderLine> OrderLines { get; set; }
    }
}
