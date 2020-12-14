using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Order")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService { get; set; }
        ILoggerFactory _loggerFactory;
        ILogger _logger;

        public OrderController(ILoggerFactory loggerFactory, IOrderService orderService)
        {
            this._orderService = orderService;
            _loggerFactory = loggerFactory;
            _logger = _loggerFactory.CreateLogger("Order Controller");
        }

        [Route("GetOrderById")]
        public IActionResult GetOrderById(string orderId)
        {
            try
            {
                if (!String.IsNullOrEmpty(orderId))
                {
                    var result = _orderService.GetOrder(orderId);
                    return Ok(result);
                }
                else
                {
                    _logger.LogError("orderId is null");
                    return BadRequest("orderId is null");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in GetOrderById");
                return BadRequest(ex.Message);
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
                _logger.LogError(ex, "Error occured in Post");
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
                _logger.LogError(ex, "Error occured in ChangeOrderStatus");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("OrderReport")]
        public IActionResult OrderReport()
        {
            try
            {
                var result = _orderService.GetAllOrders();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in OrderReport");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(OrderDetailViewModel model)
        {
            try
            {
                var item = _orderService.Update(model);
                return Ok(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Put");
                return BadRequest(ex.Message);
            }
        }
    }
}
