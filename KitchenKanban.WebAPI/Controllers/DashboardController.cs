using KitchenKanban.BusinessServices.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Dashboard")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private IDashboardService _dashboardService { get; set; }
        ILoggerFactory _loggerFactory;
        ILogger _logger;

        public DashboardController(ILoggerFactory loggerFactory, IDashboardService dashboardService)
        {
            this._dashboardService = dashboardService;
            _loggerFactory = loggerFactory;
            _logger = _loggerFactory.CreateLogger("Dashboard Controller");
        }

        [HttpGet]
        [Route("Kanbanboard")]
        public IActionResult GetKanbanboard()
        {
            try
            {
                var kanbanboard = _dashboardService.GetKanbanBoard();
                return Ok(kanbanboard);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Kanbanboard");
                return BadRequest(ex.Message);
            }
        }
    }
}
