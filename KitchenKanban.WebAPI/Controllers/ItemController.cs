using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Item")]
    [ApiController]
    [Authorize]
    public class ItemController : ControllerBase
    {
        private IItemService _itemService { get; set; }
        ILoggerFactory _loggerFactory;
        ILogger _logger;

        public ItemController(ILoggerFactory loggerFactory, IItemService itemService)
        {
            this._itemService = itemService;
            _loggerFactory = loggerFactory;
            _logger = _loggerFactory.CreateLogger("Item Controller");
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var items = _itemService.GetItems();
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Get");
                return BadRequest("Error occured.");
            }
        }

        [HttpGet("{itemId}")]
        public IActionResult GetItemById(string itemId)
        {
            try
            {
                if (!String.IsNullOrEmpty(itemId))
                {
                    var result = _itemService.GetItemById(itemId);
                    return Ok(result);
                }
                else
                {
                    _logger.LogError("itemId is null");
                    return BadRequest("itemId is null");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in GetItemById");
                return BadRequest("Error occured.");
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
                _logger.LogError(ex, "Error occured in Post");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(ItemViewModel model)
        {
            try
            {
                var result = _itemService.Update(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Put");
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{itemId}")]
        public IActionResult Delete(string itemId)
        {
            try
            {
                var result = _itemService.Delete(itemId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Delete");
                return BadRequest(ex.Message);
            }
        }
    }
}
