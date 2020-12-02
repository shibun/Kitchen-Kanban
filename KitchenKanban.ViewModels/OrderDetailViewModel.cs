using System.Collections.Generic;

namespace KitchenKanban.ViewModels
{
    public class OrderDetailViewModel
    {
        public OrderViewModel Order { get; set; }
        public List<OrderLineViewModel> OrderLines { get; set; }
    }
}
