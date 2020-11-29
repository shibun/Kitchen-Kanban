using KitchenKanban.Models;
using System.Collections.Generic;
using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.BusinessServices
{
    public static class UserStore
    {
        private static List<User> _users = new List<User>
        {
            new User { UserId = 1, FirstName = "Shibu", LastName = "Narayanan", Username = "shibu", Password = "123456", UserType = UserType.Admin },
            new User { UserId = 2, FirstName = "Jayanth", LastName = "Joseph", Username = "jayanth", Password = "123456", UserType = UserType.User },
            new User { UserId = 3, FirstName = "Sony", LastName = "Krishna", Username = "sony", Password = "123456", UserType = UserType.Admin },
            new User { UserId = 4, FirstName = "Pramod", LastName = "Karkera", Username = "pramod", Password = "123456", UserType = UserType.User },
            new User { UserId = 5, FirstName = "Sujeesh", LastName = "Soman", Username = "sujeesh", Password = "123456", UserType = UserType.User }
        };

        public static List<User> GetAll()
        {
            return _users;
        }
    }
}
