﻿using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KitchenKanban.BusinessServices
{
    public class KitchenService : IKitchenService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;

        public KitchenService(IServiceProvider services)
        {
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
        }

        public KitchenViewModel Create(KitchenViewModel input)
        {
            var newKitchen = new Kitchen()
            {
                KitchenId = Guid.NewGuid().ToString(),
                CounterNumber = input.CounterNumber,
                CreatedBy = _databaseContext.UserInfo.UserId,
                CreatedOn = DateTime.Now
            };

            _databaseContext.Kitchens.Add(newKitchen);
            _databaseContext.SaveChanges();

            input.KitchenId = newKitchen.KitchenId;

            return input;
        }

        public KitchenViewModel GetKitchenById(string kitchenId)
        {
            var kitchen = _databaseContext.Kitchens.Where(x => x.KitchenId == kitchenId).FirstOrDefault();
            if (kitchen == null)
                return null;

            return new KitchenViewModel()
            {
                KitchenId = kitchen.KitchenId,
                CounterNumber = kitchen.CounterNumber
            };
        }

        public List<KitchenViewModel> GetKitchens()
        {
            var result = _databaseContext.Kitchens;
            return result.Select(x => new KitchenViewModel()
            {
                KitchenId = x.KitchenId,
                CounterNumber = x.CounterNumber
            }).ToList();
        }
    }
}
