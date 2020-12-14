using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Kitchen")]
    [ApiController]
    [Authorize]
    public class KitchenController : ControllerBase
    {
        private IKitchenService _kitchenService { get; set; }
        ILoggerFactory _loggerFactory;
        ILogger _logger;

        public KitchenController(ILoggerFactory loggerFactory, IKitchenService kitchenService)
        {
            this._kitchenService = kitchenService;
            _loggerFactory = loggerFactory;
            _logger = _loggerFactory.CreateLogger("Kitchen Controller");
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var kitchens = _kitchenService.GetKitchens();
                return Ok(kitchens);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Get");
                return BadRequest("Error occured.");
            }
        }

        [HttpGet("{kitchenId}")]
        public IActionResult GetKitchenById(string kitchenId)
        {
            try
            {
                if (!String.IsNullOrEmpty(kitchenId))
                {
                    var result = _kitchenService.GetKitchenById(kitchenId);

                    return Ok(result);
                }
                else
                {
                    _logger.LogError("kitchenId is null");
                    return BadRequest("kitchenId is null");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in GetKitchenById");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(KitchenViewModel model)
        {
            try
            {
                var kitchen = _kitchenService.Create(model);
                return Ok(kitchen);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error occured in Post");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(KitchenViewModel model)
        {
            try
            {
                var result = _kitchenService.Update(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Put");
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{kitchenId}")]
        public IActionResult Delete(string kitchenId)
        {
            try
            {
                var result = _kitchenService.Delete(kitchenId);
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
