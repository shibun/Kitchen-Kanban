namespace KitchenKanban.Models.Enums
{
    public class OrderEnum
    {
        public enum OrderType : int
        {
            DineIn = 1,
            TakeAway = 2
        }

        public enum OrderStatus : int
        {
            NewOrder = 1,
            BeingPrepared = 2,
            Prepared = 3,
            Packing = 4,
            ReadyToBeDelivered = 5,
            Completed = 6,
            Cancelled = 7
        }
    }
}
