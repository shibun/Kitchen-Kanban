using KitchenKanban.ViewModels;
using System.Collections.Generic;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IItemService
    {
        ItemViewModel Create(ItemViewModel input);
        ItemViewModel GetItemById(string itemId);
        List<ItemViewModel> GetItems();
        bool Update(ItemViewModel input);
        bool Delete(string itemId);
    }
}
