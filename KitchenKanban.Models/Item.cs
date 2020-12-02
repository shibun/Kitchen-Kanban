namespace KitchenKanban.Models
{
    public class Item : BaseModel
    {
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public decimal ItemCharge { get; set; }
    }
}
