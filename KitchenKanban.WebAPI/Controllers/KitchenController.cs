using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<IActionResult> Get()
        {
            var kitchens = _kitchenService.GetKitchens();
            return Ok(kitchens);
        }
    }
}
