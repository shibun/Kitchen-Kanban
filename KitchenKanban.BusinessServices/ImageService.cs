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
    public class ImageService : IImageService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;
        private IUserInfo _userInfo;

        public ImageService(IServiceProvider services, IUserInfo userInfo)
        {
            _userInfo = userInfo;
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
        }

        public long Create(Image input)
        {
            throw new NotImplementedException();
        }

        public bool Delete(string imageId)
        {
            throw new NotImplementedException();
        }

        public Image GetImageById(string imageId)
        {
            throw new NotImplementedException();
        }

        public bool Update(Image input)
        {
            throw new NotImplementedException();
        }
    }
}
