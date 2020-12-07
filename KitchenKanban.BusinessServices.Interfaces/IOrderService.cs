using KitchenKanban.ViewModels;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IOrderService
    {
        OrderDetailViewModel Create(OrderDetailViewModel input);
        OrderDetailViewModel GetOrder(string orderId);
        bool ChangeOrderStatus(OrderStatusInputViewModel input);
    }
}
