using KitchenKanban.DataServices.Context;
using KitchenKanban.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.WebAPI
{
    public class SeedData
    {
        public static void EnsurePopulated(IApplicationBuilder app)
        {
            var scope = app.ApplicationServices.CreateScope();
            KitchenKanbanDB context = scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User
                    {
                        UserId = Guid.NewGuid().ToString(),
                        FirstName = "Kitchen",
                        LastName = "Administrator",
                        Username = "admin",
                        Password = "123456",
                        UserType = UserType.Administrator
                    }
                    );
                context.SaveChanges();
            }
        }
    }
}
