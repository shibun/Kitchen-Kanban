using KitchenKanban.BusinessServices;
using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using Xunit;
using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.UnitTests
{
    public class OrderTest
    {
        [Fact]
        public void CreateOrder()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };

            IDocumentSequenceService documentService = new DocumentSequenceService(serviceProvider, userInfo);
            IOrderService orderService = new OrderService(serviceProvider, documentService, userInfo);

            var kitchen = CreateKitchen();

            var frontDeskUser = CreateFrontDeskUser();
            var chefUser = CreateChefUser();
            var backOfficeUser = CreateBackOfficeUser();

            var baconClubhouseBurger = CreateItem(new ItemViewModel()
            {
                ItemName = "Bacon Clubhouse Burger - Meal",
                ItemCharge = 6.49M
            });

            var mcWrap = CreateItem(new ItemViewModel()
            {
                ItemName = "Premium McWrap Chicken & Bacon",
                ItemCharge = 6.39M
            });

            var bbqSandwitch = CreateItem(new ItemViewModel()
            {
                ItemName = "BBQ Pulled Pork Sandwich - Meal",
                ItemCharge = 4.99M
            });

            var fruitPunch = CreateItem(new ItemViewModel()
            {
                ItemName = "Minute Maid Fruit Punch Slushie",
                ItemCharge = 3.59M
            });

            var input = new OrderDetailViewModel();
            input.Order = new OrderViewModel()
            {
                CustomerContactNumber = "5236412543",
                CustomerName = "Felix Caldwell",
                OrderAmount = 21.46M,
                OrderTakenBy = frontDeskUser.UserId
            };

            input.OrderLines.Add(new OrderLineViewModel()
            {
                ItemId = baconClubhouseBurger.ItemId,
                OrderQuantity = 1                
            });

            input.OrderLines.Add(new OrderLineViewModel()
            {
                ItemId = mcWrap.ItemId,
                OrderQuantity = 1
            });

            input.OrderLines.Add(new OrderLineViewModel()
            {
                ItemId = bbqSandwitch.ItemId,
                OrderQuantity = 1
            });

            input.OrderLines.Add(new OrderLineViewModel()
            {
                ItemId = fruitPunch.ItemId,
                OrderQuantity = 3
            });

            var result = orderService.Create(input);

            Assert.True(true);
        }

        private KitchenViewModel CreateKitchen()
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
            var kitchen = kitchenService.Create(input);

            return kitchen;
        }

        private UserViewModel CreateFrontDeskUser()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };
            IUserService userService = new UserService(serviceProvider, userInfo);
            var input = new UserInputViewModel()
            {
                FirstName = "Peggy",
                LastName = "Carlson",
                Password = "123456",
                UserName = "peggycarlson",
                UserType = UserType.FrontDesk
            };
            var user = userService.Create(input);

            return user;
        }

        private UserViewModel CreateChefUser()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };
            IUserService userService = new UserService(serviceProvider, userInfo);
            var input = new UserInputViewModel()
            {
                FirstName = "Gordon",
                LastName = "Ramsay",
                Password = "123456",
                UserName = "gordonramsay",
                UserType = UserType.Chef
            };
            var user = userService.Create(input);

            return user;
        }

        private UserViewModel CreateBackOfficeUser()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<KitchenKanbanDB>(options => options.UseInMemoryDatabase("KitchenKanbanDB"), ServiceLifetime.Transient);
            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IUserInfo userInfo = new UserInfo()
            {
                UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                UserType = Models.Enums.UserEnum.UserType.Administrator
            };
            IUserService userService = new UserService(serviceProvider, userInfo);
            var input = new UserInputViewModel()
            {
                FirstName = "Richard",
                LastName = "Townsend",
                Password = "123456",
                UserName = "richardtownsend",
                UserType = UserType.BackOffice
            };
            var user = userService.Create(input);

            return user;
        }

        private ItemViewModel CreateItem(ItemViewModel input)
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
            var result = itemService.Create(input);

            return result;
        }
    }
}
