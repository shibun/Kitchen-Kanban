using KitchenKanban.ViewModels;
using System.Collections.Generic;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IOrderService
    {
        OrderDetailViewModel Create(OrderDetailViewModel input);
        OrderDetailViewModel GetOrder(string orderId);
        bool ChangeOrderStatus(OrderStatusInputViewModel input);
        List<OrderViewModel> GetAllOrders();
        bool Update(OrderDetailViewModel input);
    }
}
