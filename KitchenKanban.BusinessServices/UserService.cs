using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KitchenKanban.BusinessServices
{
    public class UserService : IUserService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;

        public UserService(IServiceProvider services)
        {
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
        }

        public UserViewModel Authenticate(AuthenticateRequest input)
        {
            var user = _databaseContext.Users.Where(x => x.Username == input.Username && x.Password == input.Password).SingleOrDefault();
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

        public UserViewModel GetById(string userId)
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
                    UserName = user.Username,
                    UserType = user.UserType
                };
        }
    }
}
