using KitchenKanban.DataServices.Context;
using KitchenKanban.Models;
using KitchenKanban.WebAPI.Providers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
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
            if (!context.Kitchens.Any())
            {
                context.Kitchens.AddRange(
                    new Kitchen
                    {
                        KitchenId = Guid.NewGuid().ToString(),
                        CounterNumber = "Counter 001",
                        CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                        CreatedOn = DateTime.Now
                    }
                    );
                context.SaveChanges();
            }
            if (!context.Items.Any())
            {
                string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
                string fileName = Path.Combine(baseDirectory, @"SeederImages\1.jpg");
                System.Drawing.Image image1 = System.Drawing.Image.FromFile(fileName);
                var originalImage = ImageToByteArray(image1);
                var iconResized = ImageToByteArray(ImageResizer.ResizeImage(image1, new Size(50, 50)));

                var originalSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = originalImage,
                    ImageType = Models.Enums.ImageEnum.ImageType.Original,
                    Length = originalImage.Length,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(originalSizeImage);

                var iconSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = iconResized,
                    ImageType = Models.Enums.ImageEnum.ImageType.Icon,
                    Length = iconResized.Length,
                    ParentId = originalSizeImage.ImageId,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(iconSizeImage);

                context.Items.Add(
                    new Item
                    {
                        ItemId = Guid.NewGuid().ToString(),
                        ItemName = "Beef Short Rib with Pepper and Onion",
                        ItemCharge = 75.50M,
                        ImageId = originalSizeImage.ImageId,
                        CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                        CreatedOn = DateTime.Now
                    }
                );

                fileName = Path.Combine(baseDirectory, @"SeederImages\2.jpg");
                image1 = System.Drawing.Image.FromFile(fileName);
                originalImage = ImageToByteArray(image1);
                iconResized = ImageToByteArray(ImageResizer.ResizeImage(image1, new Size(50, 50)));

                originalSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = originalImage,
                    ImageType = Models.Enums.ImageEnum.ImageType.Original,
                    Length = originalImage.Length,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(originalSizeImage);

                iconSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = iconResized,
                    ImageType = Models.Enums.ImageEnum.ImageType.Icon,
                    Length = iconResized.Length,
                    ParentId = originalSizeImage.ImageId,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(iconSizeImage);

                context.Items.Add(
                    new Item
                    {
                        ItemId = Guid.NewGuid().ToString(),
                        ItemName = "Crispy Skin Barramundi",
                        ItemCharge = 60.50M,
                        ImageId = originalSizeImage.ImageId,
                        CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                        CreatedOn = DateTime.Now
                    }
                );

                fileName = Path.Combine(baseDirectory, @"SeederImages\3.jpg");
                image1 = System.Drawing.Image.FromFile(fileName);
                originalImage = ImageToByteArray(image1);
                iconResized = ImageToByteArray(ImageResizer.ResizeImage(image1, new Size(50, 50)));

                originalSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = originalImage,
                    ImageType = Models.Enums.ImageEnum.ImageType.Original,
                    Length = originalImage.Length,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(originalSizeImage);

                iconSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = iconResized,
                    ImageType = Models.Enums.ImageEnum.ImageType.Icon,
                    Length = iconResized.Length,
                    ParentId = originalSizeImage.ImageId,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(iconSizeImage);

                context.Items.Add(
                    new Item
                    {
                        ItemId = Guid.NewGuid().ToString(),
                        ItemName = "Scallops with Turnips",
                        ItemCharge = 50.00M,
                        ImageId = originalSizeImage.ImageId,
                        CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                        CreatedOn = DateTime.Now
                    }
                );

                fileName = Path.Combine(baseDirectory, @"SeederImages\4.jpg");
                image1 = System.Drawing.Image.FromFile(fileName);
                originalImage = ImageToByteArray(image1);
                iconResized = ImageToByteArray(ImageResizer.ResizeImage(image1, new Size(50, 50)));

                originalSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = originalImage,
                    ImageType = Models.Enums.ImageEnum.ImageType.Original,
                    Length = originalImage.Length,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(originalSizeImage);

                iconSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = iconResized,
                    ImageType = Models.Enums.ImageEnum.ImageType.Icon,
                    Length = iconResized.Length,
                    ParentId = originalSizeImage.ImageId,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(iconSizeImage);

                context.Items.Add(
                    new Item
                    {
                        ItemId = Guid.NewGuid().ToString(),
                        ItemName = "Toffee Apple",
                        ItemCharge = 10.00M,
                        ImageId = originalSizeImage.ImageId,
                        CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                        CreatedOn = DateTime.Now
                    }
                );

                fileName = Path.Combine(baseDirectory, @"SeederImages\5.jpg");
                image1 = System.Drawing.Image.FromFile(fileName);
                originalImage = ImageToByteArray(image1);
                iconResized = ImageToByteArray(ImageResizer.ResizeImage(image1, new Size(50, 50)));

                originalSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = originalImage,
                    ImageType = Models.Enums.ImageEnum.ImageType.Original,
                    Length = originalImage.Length,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(originalSizeImage);

                iconSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = iconResized,
                    ImageType = Models.Enums.ImageEnum.ImageType.Icon,
                    Length = iconResized.Length,
                    ParentId = originalSizeImage.ImageId,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(iconSizeImage);

                context.Items.Add(
                    new Item
                    {
                        ItemId = Guid.NewGuid().ToString(),
                        ItemName = "Lamb, Peas and Mint",
                        ItemCharge = 10.00M,
                        ImageId = originalSizeImage.ImageId,
                        CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                        CreatedOn = DateTime.Now
                    }
                );

                fileName = Path.Combine(baseDirectory, @"SeederImages\6.jpg");
                image1 = System.Drawing.Image.FromFile(fileName);
                originalImage = ImageToByteArray(image1);
                iconResized = ImageToByteArray(ImageResizer.ResizeImage(image1, new Size(50, 50)));

                originalSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = originalImage,
                    ImageType = Models.Enums.ImageEnum.ImageType.Original,
                    Length = originalImage.Length,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(originalSizeImage);

                iconSizeImage = new Models.Image()
                {
                    ImageId = Guid.NewGuid().ToString(),
                    ImageContent = iconResized,
                    ImageType = Models.Enums.ImageEnum.ImageType.Icon,
                    Length = iconResized.Length,
                    ParentId = originalSizeImage.ImageId,
                    CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                    CreatedOn = DateTime.Now
                };
                context.Images.Add(iconSizeImage);

                context.Items.Add(
                    new Item
                    {
                        ItemId = Guid.NewGuid().ToString(),
                        ItemName = "Bombe Alaska",
                        ItemCharge = 15.25M,
                        ImageId = originalSizeImage.ImageId,
                        CreatedBy = "95632324-a9f8-44ba-9b3d-4c90dd5d9650",
                        CreatedOn = DateTime.Now
                    }
                );
                context.SaveChanges();
            }
        }

        private static byte[] ImageToByteArray(System.Drawing.Image imageIn)
        {
            using (var memoryStream = new MemoryStream())
            {
                imageIn.Save(memoryStream, ImageFormat.Png);
                return memoryStream.ToArray();
            }
        }
    }
}
