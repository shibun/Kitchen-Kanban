using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.ViewModels
{
    public class UserViewModel
    {
        public long UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public UserType UserType { get; set; }
    }
}
