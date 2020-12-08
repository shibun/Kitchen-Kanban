using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using KitchenKanban.WebAPI.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Drawing;
using System.IO;
using static KitchenKanban.Models.Enums.DocumentEnum;
using static KitchenKanban.Models.Enums.ImageEnum;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Image")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private IImageService _imageService { get; set; }

        public ImageController(IImageService imageService)
        {
            this._imageService = imageService;
        }

        [HttpPost]
        public IActionResult Post([FromForm] IFormFile file, string referenceId, FileType fileType)
        {
            try
            {
                if (file != null)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var fileExtension = Path.GetExtension(fileName);
                    
                    using (var target = new MemoryStream())
                    {
                        file.CopyTo(target);
                        Image original = Image.FromStream(target);
                        var iconResized = ImageToByteArray(ImageResizer.ResizeImage(original, new Size(50, 50)));

                        var originalSizeImage = new ImageViewModel();
                        originalSizeImage.ImageContent = target.ToArray();
                        originalSizeImage.Length = target.ToArray().Length;
                        originalSizeImage.ImageType = ImageType.Original;

                        var imageId = _imageService.CreateWithReference(originalSizeImage, referenceId, fileType);

                        var iconSizedImage = new ImageViewModel();
                        iconSizedImage.ImageContent = iconResized;
                        iconSizedImage.Length = iconResized.Length;
                        iconSizedImage.ImageType = ImageType.Icon;
                        iconSizedImage.ParentId = imageId;

                        var iconImageId = _imageService.Create(iconSizedImage);
                    }

                    return Ok(true);
                }
                else
                {
                    return BadRequest("No image data");
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private byte[] ImageToByteArray(Image imageIn)
        {
            using (var memoryStream = new MemoryStream())
            {
                imageIn.Save(memoryStream, imageIn.RawFormat);
                return memoryStream.ToArray();
            }
        }
    }
}
