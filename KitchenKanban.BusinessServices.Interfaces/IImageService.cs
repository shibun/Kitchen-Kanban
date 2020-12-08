using KitchenKanban.ViewModels;
using static KitchenKanban.Models.Enums.DocumentEnum;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IImageService
    {
        ImageViewModel GetImageById(string imageId);
        string CreateWithReference(ImageViewModel input, string referenceId, FileType fileType);
        string Create(ImageViewModel input);
        bool Update(ImageViewModel input);
        bool Delete(string imageId);
    }
}
