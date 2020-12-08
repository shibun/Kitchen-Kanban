using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.Models;
using KitchenKanban.Models.Enums;
using KitchenKanban.ViewModels;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using static KitchenKanban.Models.Enums.DocumentEnum;

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

        public string Create(ImageViewModel input)
        {
            var newImage = new Image()
            {
                ImageId = Guid.NewGuid().ToString(),
                ImageContent = input.ImageContent,
                Length = input.Length,
                ImageType = input.ImageType,
                ParentId = input.ParentId,
                CreatedBy = _userInfo.UserId,
                CreatedOn = DateTime.Now
            };

            _databaseContext.Images.Add(newImage);
            _databaseContext.SaveChanges();

            return newImage.ImageId;
        }

        public string CreateWithReference(ImageViewModel input, string referenceId, FileType fileType)
        {
            var imageId = Create(input);
            switch (fileType)
            {
                case FileType.UserImage:
                    var user = _databaseContext.Users.Where(x => x.UserId == referenceId).FirstOrDefault();
                    if(user != null)
                    {
                        user.ImageId = imageId;
                        user.UpdatedBy = _userInfo.UserId;
                        user.UpdatedOn = DateTime.Now;
                        _databaseContext.Users.Update(user);
                        _databaseContext.SaveChanges();
                    }
                    break;
                case FileType.ItemImage:
                    var item = _databaseContext.Items.Where(x => x.ItemId == referenceId).FirstOrDefault();
                    if (item != null)
                    {
                        item.ImageId = imageId;
                        item.UpdatedBy = _userInfo.UserId;
                        item.UpdatedOn = DateTime.Now;
                        _databaseContext.Items.Update(item);
                        _databaseContext.SaveChanges();
                    }
                    break;
                default:
                    break;
            }
            
            return imageId;
        }

        public bool Delete(string imageId)
        {
            throw new NotImplementedException();
        }

        public ImageViewModel GetImageById(string imageId)
        {
            throw new NotImplementedException();
        }

        public bool Update(ImageViewModel input)
        {
            throw new NotImplementedException();
        }
    }
}
