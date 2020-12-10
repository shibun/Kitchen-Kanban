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
    public class KitchenTest
    {
        [Fact]
        public void CreateKitchen()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };
            IKitchenService kitchenService = new KitchenService(serviceProvider, userInfo);
            var input = new KitchenViewModel()
            {
                CounterNumber = "My Counter 1"
            };
            var result = kitchenService.Create(input);

            Assert.Equal(input, result);
        }

        [Fact]
        public void UpdateKitchen()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };
            IKitchenService kitchenService = new KitchenService(serviceProvider, userInfo);
            var input = new KitchenViewModel()
            {
                CounterNumber = "My Counter 1"
            };
            var result = kitchenService.Create(input);

            result.CounterNumber = "My Counter Modified";
            var modifiedResult = kitchenService.Update(result);

            Assert.True(modifiedResult);
        }

        [Fact]
        public void DeleteKitchen()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };
            IKitchenService kitchenService = new KitchenService(serviceProvider, userInfo);
            var input = new KitchenViewModel()
            {
                CounterNumber = "My Counter 5"
            };
            var result = kitchenService.Create(input);

            var deleteResult = kitchenService.Delete(result.KitchenId);

            Assert.True(deleteResult);
        }
    }
}
