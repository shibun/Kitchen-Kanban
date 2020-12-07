using static KitchenKanban.Models.Enums.ImageEnum;

namespace KitchenKanban.Models
{
    public class Image : BaseModel
    {
        public string ImageId { get; set; }
        public byte[] ImageContent { get; set; }
        public string MimeType { get; set; }
        public int Length { get; set; }
        public ImageType ImageType { get; set; }
        public long? ParentId { get; set; }
    }
}
