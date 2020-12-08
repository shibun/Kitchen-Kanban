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

        //[HttpGet("{orderId}")]
        [Route("GetOrderById")]
        public IActionResult GetOrderById(string orderId)
        {
            if (!String.IsNullOrEmpty(orderId))
            {
                var result = _orderService.GetOrder(orderId);
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
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

        [HttpPost]
        [Route("OrderStatus")]
        public IActionResult ChangeOrderStatus(OrderStatusInputViewModel model)
        {
            try
            {
                var item = _orderService.ChangeOrderStatus(model);
                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
