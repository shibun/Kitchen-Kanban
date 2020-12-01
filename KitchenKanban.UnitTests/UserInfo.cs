using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.ViewModels;
using System;
using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.UnitTests
{
    public class UserInfo : IUserInfo
    {
        public string UserId { get; set; }
        public UserType UserType { get; set; }

        public string FirstName => throw new NotImplementedException();

        public string LastName => throw new NotImplementedException();

        public string UserName => throw new NotImplementedException();

        public UserViewModel GetAppUser()
        {
            throw new NotImplementedException();
        }
    }
}
