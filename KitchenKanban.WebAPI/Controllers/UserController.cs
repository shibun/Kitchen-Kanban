using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Mvc;
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
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserById(string userId)
        {
            var user = _userService.GetUserById(userId);
            return Ok(user);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var users = _userService.GetUsers();
            return Ok(users);
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
                return BadRequest(ex.Message);
            }
        }
    }
}
