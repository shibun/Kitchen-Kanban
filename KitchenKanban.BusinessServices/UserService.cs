using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using static KitchenKanban.Models.Enums.ImageEnum;

namespace KitchenKanban.BusinessServices
{
    public class UserService : IUserService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;
        private IUserInfo _userInfo;
        private readonly IImageService _imageService;

        public UserService(IServiceProvider services, IImageService imageService, IUserInfo userInfo)
        {
            _userInfo = userInfo;
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
            _imageService = imageService;
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
                    UserType = user.UserType,
                    ImageId = user.ImageId
                };
        }

        public List<UserViewModel> GetUsers()
        {
            List<UserViewModel> output = new List<UserViewModel>();
            var result = _databaseContext.Users;
            foreach (var user in result)
            {
                var itemResult = new UserViewModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserId = user.UserId,
                    UserName = user.UserName,
                    UserType = user.UserType,
                    ImageId = user.ImageId
                };

                if (user.ImageId != null)
                {
                    var image = _imageService.GetImage(user.ImageId, ImageType.Icon);
                    itemResult.ImageContent = image.ImageContent;
                }

                output.Add(itemResult);
            }
            return result.Select(user => new UserViewModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserId = user.UserId,
                UserName = user.UserName,
                UserType = user.UserType,
                ImageId = user.ImageId
            }).ToList();
        }

        public bool Update(UserInputViewModel input)
        {
            var user = _databaseContext.Users.Where(x => x.UserId == input.UserId).FirstOrDefault();
            if (user == null)
                return false;
            user.FirstName = input.FirstName;
            user.LastName = input.LastName;
            user.UserType = input.UserType;
            _databaseContext.Users.Update(user);
            _databaseContext.SaveChanges();

            return true;
        }
    }
}
