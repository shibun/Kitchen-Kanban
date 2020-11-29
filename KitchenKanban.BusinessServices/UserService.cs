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
        private List<User> _users = new List<User>
        {
            new User { UserId = 1, FirstName = "Ravi", LastName = "Shastri", Username = "admin", Password = "123456" },
            new User { UserId = 2, FirstName = "Rahul", LastName = "Dravid", Username = "user1", Password = "123456" },
            new User { UserId = 3, FirstName = "Sachin", LastName = "Tendulkar", Username = "user2", Password = "123456" }
        };

        public UserViewModel Authenticate(AuthenticateRequest input)
        {
            var user = _users.SingleOrDefault(x => x.Username == input.Username && x.Password == input.Password);
            if (user == null)
                return null;
            else
                return new UserViewModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserId = user.UserId,
                    Username = user.Username
                };
        }

        public UserViewModel GetById(long userId)
        {
            var user = _users.FirstOrDefault(x => x.UserId == userId);
            if (user == null)
                return null;
            else
                return new UserViewModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserId = user.UserId,
                    Username = user.Username
                };
        }
    }
}
