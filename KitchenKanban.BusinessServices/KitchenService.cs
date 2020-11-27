using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.Models;
using System;
using System.Collections.Generic;

namespace KitchenKanban.BusinessServices
{
    public class KitchenService : IKitchenService
    {
        public List<Kitchen> GetKitchens()
        {
            List<Kitchen> kitchens = new List<Kitchen>();

            kitchens.Add(new Kitchen()
            {
                KitchenId = 1,
                CounterNumber = "K001"
            });

            kitchens.Add(new Kitchen()
            {
                KitchenId = 2,
                CounterNumber = "K002"
            });

            kitchens.Add(new Kitchen()
            {
                KitchenId = 3,
                CounterNumber = "K003"
            });

            return kitchens;
        }
    }
}
