using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.Models
{
    public class User : BaseModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public UserType UserType { get; set; }
    }
}
