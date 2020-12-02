using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using static KitchenKanban.Models.Enums.DocumentEnum;

namespace KitchenKanban.BusinessServices
{
    public class OrderService : IOrderService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;
        private IUserInfo _userInfo;
        private readonly IDocumentSequenceService _documentSequenceService;

        public OrderService(IServiceProvider services, IDocumentSequenceService documentSequenceService, IUserInfo userInfo)
        {
            _documentSequenceService = documentSequenceService;
            _userInfo = userInfo;
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
        }

        public OrderDetailViewModel Create(OrderDetailViewModel input)
        {
            var documentNumber = _documentSequenceService.GetDocumentNumber(DocumentType.Order);

            input.Order.OrderNumber = documentNumber;

            return input;
        }
    }
}
