using System.ComponentModel.DataAnnotations.Schema;

namespace KitchenKanban.Models
{
    public class Kitchen : BaseModel
    {
        public string KitchenId { get; set; }
        public string CounterNumber { get; set; }
    }
}
