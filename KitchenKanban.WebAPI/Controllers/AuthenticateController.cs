using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using KitchenKanban.WebAPI.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KitchenKanban.WebAPI.Controllers
{
    [ApiController]
    [Route("token")]
    public class AuthenticateController : ControllerBase
    {
        private IUserService _userService { get; set; }
        private IOptions<AppSettings> _appSettings;

        public AuthenticateController(IOptions<AppSettings> appSettings, IUserService userService)
        {
            this._appSettings = appSettings;
            this._userService = userService;
        }

        [HttpPost]
        public IActionResult Post(AuthenticateRequest model)
        {
            var user = _userService.Authenticate(model);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var token = new CustomOAuthProvider(_appSettings).GenerateJwtToken(user);

            return Ok(new AuthenticateResponse(user, token));
        }
    }
}
