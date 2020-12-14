using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace KitchenKanban.WebAPI.Controllers
{
    [Route("api/User")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private IUserService _userService { get; set; }
        ILoggerFactory _loggerFactory;
        ILogger _logger;

        public UserController(ILoggerFactory loggerFactory, IUserService userService)
        {
            this._userService = userService;
            _loggerFactory = loggerFactory;
            _logger = _loggerFactory.CreateLogger("User Controller");
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserById(string userId)
        {
            try
            {
                if (!String.IsNullOrEmpty(userId))
                {
                    var user = _userService.GetUserById(userId);
                    return Ok(user);
                }
                else
                {
                    _logger.LogError("userId is null");
                    return BadRequest("userId is null");
                }                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in GetUserById");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var users = _userService.GetUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Get");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(UserInputViewModel model)
        {
            try
            {
                var user = _userService.Create(model);
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Post");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(UserInputViewModel model)
        {
            try
            {
                var user = _userService.Update(model);
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Put");
                return BadRequest(ex.Message);
            }
        }
    }
}
