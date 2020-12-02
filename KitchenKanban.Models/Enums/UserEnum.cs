namespace KitchenKanban.Models.Enums
{
    public class UserEnum
    {
        public enum UserType : int
        {
            Administrator = 1,
            FrontDesk = 2,
            Chef = 3,
            BackOffice = 4,
            Service = 5
        }
    }
}
