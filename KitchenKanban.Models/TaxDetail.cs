namespace KitchenKanban.Models
{
    public class TaxDetail : BaseModel
    {
        public string TaxDetailId { get; set; }
        public decimal GSTPercentage { get; set; }
        public decimal CGSTPercentage { get; set; }
        public decimal SGSTPercentage { get; set; }
    }
}
