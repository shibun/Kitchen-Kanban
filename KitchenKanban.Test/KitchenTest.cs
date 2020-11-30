using KitchenKanban.BusinessServices;
using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace KitchenKanban.Test
{
    public class KitchenTest
    {
        [Fact]
        public void CreateKitchen()
        {
            var serviceCollection = new ServiceCollection();

            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);

            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

            IUserInfo userinfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };

            IKitchenService kitchenService = new KitchenService(serviceProvider, userinfo);

            var kitchens = kitchenService.Create(new ViewModels.KitchenViewModel()
            {
                CounterNumber = "My Counter 1"
            });
        }
    }
}
