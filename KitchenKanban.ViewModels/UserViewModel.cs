﻿using static KitchenKanban.Models.Enums.UserEnum;

namespace KitchenKanban.ViewModels
{
    public class UserViewModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public UserType UserType { get; set; }
        public string ImageId { get; set; }
        public byte[]? ImageContent { get; set; }
    }
}
