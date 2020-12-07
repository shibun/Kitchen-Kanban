using KitchenKanban.Models;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IImageService
    {
        Image GetImageById(string imageId);
        long Create(Image input);
        bool Update(Image input);
        bool Delete(string imageId);
    }
}
