using KitchenKanban.Models;
using System.Collections.Generic;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IKitchenService
    {
        List<Kitchen> GetKitchens();
    }
}
