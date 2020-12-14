using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.ViewModels;
using KitchenKanban.WebAPI.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;

namespace KitchenKanban.WebAPI.Controllers
{
    [ApiController]
    [Route("token")]
    public class AuthenticateController : ControllerBase
    {
        private IUserService _userService { get; set; }
        private IOptions<AppSettings> _appSettings; 
        ILoggerFactory _loggerFactory;
        ILogger _logger;

        public AuthenticateController(ILoggerFactory loggerFactory, IOptions<AppSettings> appSettings, IUserService userService)
        {
            this._appSettings = appSettings;
            this._userService = userService;
            _loggerFactory = loggerFactory;
            _logger = _loggerFactory.CreateLogger("Authentication Controller");
        }

        [HttpPost]
        public IActionResult Post(AuthenticateRequest model)
        {
            try
            {
                var user = _userService.Authenticate(model);

                if (user == null)
                {
                    _logger.LogInformation("Username or password is incorrect");
                    return BadRequest(new { message = "Username or password is incorrect" });
                }

                var token = new CustomOAuthProvider(_appSettings).GenerateJwtToken(user);

                return Ok(new AuthenticateResponse(user, token));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured in Authenticate");
                return BadRequest("Error occured.");
            }
        }
    }
}
