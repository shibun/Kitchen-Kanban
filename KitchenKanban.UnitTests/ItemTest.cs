using KitchenKanban.BusinessServices;
using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace KitchenKanban.UnitTests
{
    public class ItemTest
    {
        [Fact]
        public void CreateItem()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };
            IImageService imageService = new ImageService(serviceProvider, userInfo);
            IItemService itemService = new ItemService(serviceProvider, imageService, userInfo);
            var input = new ItemViewModel()
            {
                ItemName = "Pizza Margherita",
                ItemCharge = 350.50M
            };
            var result = itemService.Create(input);

            Assert.Equal(input, result);
        }

        [Fact]
        public void UpdateItem()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };
            IImageService imageService = new ImageService(serviceProvider, userInfo);
            IItemService itemService = new ItemService(serviceProvider, imageService, userInfo);
            var input = new ItemViewModel()
            {
                ItemName = "Pizza Margherita",
                ItemCharge = 350.50M
            };
            var result = itemService.Create(input);

            result.ItemName = "Margherita Pizza";
            result.ItemCharge = 550.00M;
            var modifiedResult = itemService.Update(result);

            Assert.True(modifiedResult);
        }
    }
}
