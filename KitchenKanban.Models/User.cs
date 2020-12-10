using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.Models
{
    public class User : BaseModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public UserType UserType { get; set; }
        public string ImageId { get; set; }

        public virtual Image Image { get; set; }
    }
}
