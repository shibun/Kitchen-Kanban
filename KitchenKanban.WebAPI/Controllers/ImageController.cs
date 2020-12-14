using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using KitchenKanban.WebAPI.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using static KitchenKanban.Models.Enums.DocumentEnum;
using static KitchenKanban.Models.Enums.ImageEnum;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Image")]
    [Authorize]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private IImageService _imageService { get; set; }
        ILoggerFactory _loggerFactory;
        ILogger _logger;

        public ImageController(ILoggerFactory loggerFactory, IImageService imageService)
        {
            this._imageService = imageService;
            _loggerFactory = loggerFactory;
            _logger = _loggerFactory.CreateLogger("Image Controller");
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
                    _logger.LogInformation("No image data");
                    return BadRequest("No image data");
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured while saving image.");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put([FromForm] IFormFile file, string imageId)
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
                        originalSizeImage.ImageId = imageId;

                        _imageService.Update(originalSizeImage);

                        var iconSizedImage = new ImageViewModel();
                        iconSizedImage.ImageContent = iconResized;
                        iconSizedImage.Length = iconResized.Length;
                        iconSizedImage.ImageType = ImageType.Icon;
                        iconSizedImage.ParentId = imageId;

                        var iconImageId = _imageService.UpdateWithReference(iconSizedImage);
                    }

                    return Ok(true);
                }
                else
                {
                    _logger.LogInformation("No image data");
                    return BadRequest("No image data");
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured while updating image.");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetImage(string imageId, ImageType imageType = ImageType.Icon)
        {
            try
            {
                var result = _imageService.GetImage(imageId, imageType);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest("No image found");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured while fetching image.");
                throw ex;
            }
        }

        private byte[] ImageToByteArray(Image imageIn)
        {
            using (var memoryStream = new MemoryStream())
            {
                imageIn.Save(memoryStream, ImageFormat.Png);
                return memoryStream.ToArray();
            }
        }
    }
}
