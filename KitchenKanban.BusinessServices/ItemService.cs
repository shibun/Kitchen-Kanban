using KitchenKanban.BusinessServices.Interfaces;
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
            try
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ItemViewModel GetItemById(string itemId)
        {
            try
            {
                var item = _databaseContext.Items.Where(x => x.ItemId == itemId).FirstOrDefault();
                if (item == null)
                    return null;
                var itemRec = new ItemViewModel()
                {
                    ItemId = item.ItemId,
                    ItemName = item.ItemName,
                    ItemCharge = item.ItemCharge,
                    ImageId = item.ImageId
                };

                if (item.ImageId != null)
                {
                    var image = _imageService.GetImage(item.ImageId, ImageType.Original);
                    itemRec.ImageContent = image.ImageContent;
                }
                return itemRec;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ItemViewModel> GetItems()
        {
            try
            {
                List<ItemViewModel> output = new List<ItemViewModel>();
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

                    output.Add(itemResult);
                }
                return output;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(ItemViewModel input)
        {
            try
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(string itemId)
        {
            try
            {
                var item = _databaseContext.Items.Where(x => x.ItemId == itemId).FirstOrDefault();
                if (item == null)
                    return false;

                var orderLine = _databaseContext.OrderLines.Where(x => x.ItemId == item.ItemId).FirstOrDefault();
                if (orderLine != null)
                    throw new Exception("Item cannot be deleted as transactions added aganist it");
                _databaseContext.Items.Remove(item);
                _databaseContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
