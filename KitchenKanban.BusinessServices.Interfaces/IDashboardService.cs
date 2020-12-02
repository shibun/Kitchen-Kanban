using KitchenKanban.ViewModels.Dashboard;
using System.Collections.Generic;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IDashboardService
    {
        List<KanbanBucket> GetKanbanBoard();
    }
}
