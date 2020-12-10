namespace KitchenKanban.ViewModels
{
    public class ItemViewModel
    {
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public decimal ItemCharge { get; set; }
        public decimal ItemQuantity { get; set; }
        public string ImageId { get; set; }
        public byte[]? ImageContent { get; set; }
    }
}
