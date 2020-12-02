using System;
using static KitchenKanban.Models.Enums.OrderEnum;

namespace KitchenKanban.ViewModels
{
    public class OrderViewModel
    {
        public string OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime? OrderDate { get; set; }
        public string CustomerName { get; set; }
        public string CustomerContactNumber { get; set; }
        public decimal OrderAmount { get; set; }
        public decimal GST { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal TotalAmount { get; set; }
        public OrderType OrderType { get; set; }
        public OrderStatus OrderStatus { get; set; }
    }
}
