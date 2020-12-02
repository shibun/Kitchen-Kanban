using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;


namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/Dashboard")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private IDashboardService _dashboardService { get; set; }

        public DashboardController(IDashboardService dashboardService)
        {
            this._dashboardService = dashboardService;
        }

        [HttpGet]
        [Route("Kanbanboard")]
        public IActionResult GetKanbanboard()
        {
            var kanbanboard = _dashboardService.GetKanbanBoard();
            return Ok(kanbanboard);
        }
    }
}
