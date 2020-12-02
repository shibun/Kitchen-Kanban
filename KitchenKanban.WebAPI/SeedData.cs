using KitchenKanban.DataServices.Context;
using KitchenKanban.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using static KitchenKanban.Models.Enums.DocumentEnum;
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
                        UserId = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                        FirstName = "Kitchen",
                        LastName = "Administrator",
                        UserName = "admin",
                        Password = "123456",
                        UserType = UserType.Administrator
                    }
                    );
                context.SaveChanges();
            }
            if (!context.TaxDetails.Any())
            {
                context.TaxDetails.AddRange(
                    new TaxDetail
                    {
                        TaxDetailId = Guid.NewGuid().ToString(),
                        GSTPercentage = 5.0M,
                        CGSTPercentage = 2.5M,
                        SGSTPercentage = 2.5M
                    }
                    );
                context.SaveChanges();
            }
            if (!context.DocumentSequences.Any())
            {
                context.DocumentSequences.AddRange(
                    new DocumentSequence
                    {
                        DocumentSequenceId = Guid.NewGuid().ToString(),
                        CurrentSequenceNumber = 0,
                        DocumentPrefix = "",
                        DocumentType = DocumentType.Order,
                        SequenceLength = 4,
                        SequenceNumberLastResetOn = DateTime.Now
                    });
                context.SaveChanges();
            }
        }
    }
}
