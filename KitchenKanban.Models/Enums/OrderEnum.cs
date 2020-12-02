﻿namespace KitchenKanban.Models.Enums
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
            BeingPacked = 4,
            Packed = 5,
            ReadyToBeServed = 6,
            ReadyToBeDelivered = 7,
            Completed = 8,
            Cancelled = 9
        }

        public enum OrderLineStatus : int
        {
            NewOrder = 1,
            BeingPrepared = 2,
            Prepared = 3,
            Cancelled = 4
        }
    }
}
