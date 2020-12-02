using KitchenKanban.ViewModels;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IOrderService
    {
        OrderDetailViewModel Create(OrderDetailViewModel input);
    }
}
