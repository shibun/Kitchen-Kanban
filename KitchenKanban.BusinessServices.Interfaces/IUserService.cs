using KitchenKanban.ViewModels;
using System.Collections.Generic;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IUserService
    {
        UserViewModel Authenticate(AuthenticateRequest input);
        UserViewModel GetUserById(string userId);
        UserViewModel Create(UserInputViewModel input);
        List<UserViewModel> GetUsers();
        UserViewModel Update(UserInputViewModel input);
    }
}
