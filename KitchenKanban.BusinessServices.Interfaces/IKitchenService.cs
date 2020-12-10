using KitchenKanban.ViewModels;
using System.Collections.Generic;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IKitchenService
    {
        List<KitchenViewModel> GetKitchens();
        KitchenViewModel Create(KitchenViewModel input);
        KitchenViewModel GetKitchenById(string kitchenId);
        bool Update(KitchenViewModel input);
        bool Delete(string kitchenId);
    }
}
