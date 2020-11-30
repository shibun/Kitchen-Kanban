using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.ViewModels
{
    public class AuthenticateResponse
    {

        public AuthenticateResponse(UserViewModel user, string token)
        {
            UserId = user.UserId;
            FirstName = user.FirstName;
            LastName = user.LastName;
            UserName = user.UserName;
            UserType = user.UserType;
            UserFullName = user.FirstName + " " + user.LastName;
            Token = token;
        }

        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string UserFullName { get; set; }
        public UserType UserType { get; set; }
        public string Token { get; set; }
    }
}
