using System.ComponentModel.DataAnnotations;

namespace KitchenKanban.ViewModels
{
    public class AuthenticateRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
