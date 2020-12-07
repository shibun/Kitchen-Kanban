using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Image")]
    [Authorize]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private IImageService _imageService { get; set; }

        public ImageController(IImageService imageService)
        {
            this._imageService = imageService;
        }

    }
}
