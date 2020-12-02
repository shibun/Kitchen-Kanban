using System.Collections.Generic;

namespace KitchenKanban.ViewModels
{
    public class OrderDetailViewModel
    {
        public OrderDetailViewModel()
        {
            Order = new OrderViewModel();
            OrderLines = new List<OrderLineViewModel>();
        }
        public OrderViewModel Order { get; set; }
        public List<OrderLineViewModel> OrderLines { get; set; }
    }
}
