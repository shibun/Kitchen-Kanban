using System.Collections.Generic;

namespace KitchenKanban.ViewModels.Dashboard
{
    public class KanbanBucket
    {
        public KanbanBucket()
        {
            Orders = new List<KanbanOrder>();
        }
        public string BucketName { get; set; }
        public int FlowOrder { get; set; }
        public int OrderCount { get; set; }
        public List<KanbanOrder> Orders { get; set; }
    }
}
