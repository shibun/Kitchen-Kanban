using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Kitchen")]
    [ApiController]
    [Authorize]
    public class KitchenController : ControllerBase
    {
        private IKitchenService _kitchenService { get; set; }
        public KitchenController(IKitchenService kitchenService)
        {
            this._kitchenService = kitchenService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var kitchens = _kitchenService.GetKitchens();
            return Ok(kitchens);
        }

        [HttpGet("{kitchenId}")]
        public IActionResult GetKitchenById(string kitchenId)
        {
            if (!String.IsNullOrEmpty(kitchenId))
            {
                var result = _kitchenService.GetKitchenById(kitchenId);

                return Ok(result);
            }
            else
            {
                return BadRequest();
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
                return BadRequest(ex.Message);
            }
        }
    }
}
