using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KitchenKanban.BusinessServices
{
    public class UserService : IUserService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;
        private IUserInfo _userInfo;

        public UserService(IServiceProvider services, IUserInfo userInfo)
        {
            _userInfo = userInfo;
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
        }

        public UserViewModel Authenticate(AuthenticateRequest input)
        {
            var user = _databaseContext.Users.Where(x => x.UserName == input.Username && x.Password == input.Password).SingleOrDefault();
            if (user == null)
                return null;
            else
                return new UserViewModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserId = user.UserId,
                    UserName = user.UserName,
                    UserType = user.UserType
                };
        }

        public UserViewModel Create(UserInputViewModel input)
        {
            var newUser = new User()
            {
                UserId = Guid.NewGuid().ToString(),
                FirstName = input.FirstName,
                LastName = input.LastName,
                UserName = input.UserName,
                Password = input.Password,
                UserType = input.UserType,
                CreatedBy = _userInfo.UserId,
                CreatedOn = DateTime.Now
            };

            _databaseContext.Users.Add(newUser);
            _databaseContext.SaveChanges();

            return new UserViewModel()
            {
                UserId = newUser.UserId,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                UserName = newUser.UserName,
                UserType = newUser.UserType                
            };
        }

        public UserViewModel GetUserById(string userId)
        {
            var user = _databaseContext.Users.Where(x => x.UserId == userId).FirstOrDefault();
            if (user == null)
                return null;
            else
                return new UserViewModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserId = user.UserId,
                    UserName = user.UserName,
                    UserType = user.UserType
                };
        }

        public List<UserViewModel> GetUsers()
        {
            var result = _databaseContext.Users;
            return result.Select(user => new UserViewModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserId = user.UserId,
                UserName = user.UserName,
                UserType = user.UserType
            }).ToList();
        }
    }
}
