using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.Models.Enums;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Http;

namespace KitchenKanban.WebAPI.Providers
{
    public class UserInfo : IUserInfo
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private UserViewModel _iuser = null;

        public UserInfo(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            var usermodel = GetLoggedInUser();
            if (usermodel != null)
            {
                _iuser = usermodel;
            }
        }

        public string UserId
        {
            get
            {
                return _iuser.UserId;
            }
        }

        public string FirstName
        {
            get
            {
                return _iuser.FirstName;
            }
        }

        public string LastName
        {
            get
            {
                return _iuser.LastName;
            }
        }

        public string UserName
        {
            get
            {
                return _iuser.UserName;
            }
        }

        public UserEnum.UserType UserType
        {
            get
            {
                return _iuser.UserType;
            }
        }

        public UserViewModel GetLoggedInUser()
        {
            var user = (UserViewModel)_httpContextAccessor.HttpContext.Items["User"];
            return user;
        }
    }
}
