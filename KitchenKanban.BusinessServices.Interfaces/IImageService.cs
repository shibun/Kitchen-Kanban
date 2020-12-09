using KitchenKanban.ViewModels;
using static KitchenKanban.Models.Enums.DocumentEnum;
using static KitchenKanban.Models.Enums.ImageEnum;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IImageService
    {
        ImageViewModel GetImageById(string imageId);
        string CreateWithReference(ImageViewModel input, string referenceId, FileType fileType);
        ImageViewModel GetImage(string imageId, ImageType imageType);
        string Create(ImageViewModel input);
        bool Update(ImageViewModel input);
        bool UpdateWithReference(ImageViewModel input);
        bool Delete(string imageId);
    }
}
