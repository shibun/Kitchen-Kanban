﻿using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using static KitchenKanban.Models.Enums.ImageEnum;

namespace KitchenKanban.BusinessServices
{
    public class ItemService : IItemService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;
        private IUserInfo _userInfo;
        private readonly IImageService _imageService;

        public ItemService(IServiceProvider services, IImageService imageService ,IUserInfo userInfo)
        {
            _userInfo = userInfo;
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
            _imageService = imageService;
        }

        public ItemViewModel Create(ItemViewModel input)
        {
            var newItem = new Item()
            {
                ItemId = Guid.NewGuid().ToString(),
                ItemName = input.ItemName,
                ItemCharge = input.ItemCharge,
                CreatedBy = _userInfo.UserId,
                CreatedOn = DateTime.Now
            };

            _databaseContext.Items.Add(newItem);
            _databaseContext.SaveChanges();

            input.ItemId = newItem.ItemId;

            return input;
        }

        public ItemViewModel GetItemById(string itemId)
        {
            var item = _databaseContext.Items.Where(x => x.ItemId == itemId).FirstOrDefault();
            if (item == null)
                return null;

            return new ItemViewModel()
            {
                ItemId = item.ItemId,
                ItemName = item.ItemName,
                ItemCharge = item.ItemCharge,
                ImageId = item.ImageId
            };
        }

        public List<ItemViewModel> GetItems()
        {
            var result = _databaseContext.Items;
            foreach (var item in result)
            {
                var itemResult = new ItemViewModel()
                {
                    ItemId = item.ItemId,
                    ItemName = item.ItemName,
                    ItemCharge = item.ItemCharge,
                    ImageId = item.ImageId
                };

                if (item.ImageId != null)
                {
                    var image = _imageService.GetImage(item.ImageId, ImageType.Icon);
                    itemResult.ImageContent = image.ImageContent;
                }
            }
            return result.Select(item => new ItemViewModel()
            {
                ItemId = item.ItemId,
                ItemName = item.ItemName,
                ItemCharge = item.ItemCharge,
                ImageId = item.ImageId,
                ImageContent = (item.ImageId ==null ? null : item.Image.ImageContent)                
            }).ToList();
        }

        public bool Update(ItemViewModel input)
        {
            var item = _databaseContext.Items.Where(x => x.ItemId == input.ItemId).FirstOrDefault();
            if (item == null)
                throw new Exception("Item not found");

            item.ItemName = input.ItemName;
            item.ItemCharge = input.ItemCharge;
            item.UpdatedBy = _userInfo.UserId;
            item.UpdatedOn = DateTime.Now;

            _databaseContext.Items.Update(item);
            _databaseContext.SaveChanges();

            return true;
        }
    }
}
