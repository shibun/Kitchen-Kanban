using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KitchenKanban.BusinessServices
{
    public class UserService : IUserService
    {

        public UserViewModel Authenticate(AuthenticateRequest input)
        {
            var user = UserStore.GetAll().SingleOrDefault(x => x.Username == input.Username && x.Password == input.Password);
            if (user == null)
                return null;
            else
                return new UserViewModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserId = user.UserId,
                    UserName = user.Username,
                    UserType = user.UserType
                };
        }

        public UserViewModel GetById(long userId)
        {
            var user = UserStore.GetAll().FirstOrDefault(x => x.UserId == userId);
            if (user == null)
                return null;
            else
                return new UserViewModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserId = user.UserId,
                    UserName = user.Username,
                    UserType = user.UserType
                };
        }
    }
}
