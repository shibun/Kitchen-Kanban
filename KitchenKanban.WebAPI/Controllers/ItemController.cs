using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Item")]
    [ApiController]
    [Authorize]
    public class ItemController : ControllerBase
    {
        private IItemService _itemService { get; set; }

        public ItemController(IItemService itemService)
        {
            this._itemService = itemService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var items = _itemService.GetItems();
            return Ok(items);
        }

        [HttpGet("{itemId}")]
        public IActionResult GetItemById(string itemId)
        {
            if (!String.IsNullOrEmpty(itemId))
            {
                var result = _itemService.GetItemById(itemId);
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Post(ItemViewModel model)
        {
            try
            {
                var item = _itemService.Create(model);
                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
