using KitchenKanban.ViewModels;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IUserService
    {
        UserViewModel Authenticate(AuthenticateRequest input);
        UserViewModel GetById(string userId);
    }
}
