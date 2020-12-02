using KitchenKanban.ViewModels;
using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.DataServices.UserInfo
{
    public interface IUserInfo
    {
        UserViewModel GetLoggedInUser();
        string UserId { get; }
        string FirstName { get; }
        string LastName { get; }
        string UserName { get; }
        UserType UserType { get; }
    }
}
