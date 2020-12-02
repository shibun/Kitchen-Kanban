using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Order")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService { get; set; }

        public OrderController(IOrderService orderService)
        {
            this._orderService = orderService;
        }

        [HttpPost]
        public IActionResult Post(OrderDetailViewModel model)
        {
            try
            {
                var item = _orderService.Create(model);
                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
