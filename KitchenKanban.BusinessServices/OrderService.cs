using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using static KitchenKanban.Models.Enums.DocumentEnum;
using static KitchenKanban.Models.Enums.OrderEnum;

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

            var newOrder = new Order()
            {
                CustomerContactNumber = input.Order.CustomerContactNumber,
                CustomerName = input.Order.CustomerName,
                OrderAmount = input.Order.OrderAmount,
                OrderDate = (input.Order.OrderDate == null ? DateTime.Now : input.Order.OrderDate.GetValueOrDefault()),
                OrderId = Guid.NewGuid().ToString(),
                OrderNumber = documentNumber,
                OrderStatus = OrderStatus.NewOrder,
                OrderTakenBy = input.Order.OrderTakenBy,
                OrderType = input.Order.OrderType,
                CreatedBy = _userInfo.UserId,
                CreatedOn = DateTime.Now
            };
            _databaseContext.Orders.Add(newOrder);

            foreach (var item in input.OrderLines)
            {
                var newOrderLine = new OrderLine()
                {
                    CreatedBy = _userInfo.UserId,
                    CreatedOn = DateTime.Now,
                    ItemId = item.ItemId,
                    OrderId = newOrder.OrderId,
                    OrderLineId = Guid.NewGuid().ToString(),
                    OrderLineStatus = OrderLineStatus.NewOrder,
                    OrderQuantity = item.OrderQuantity                    
                };
                _databaseContext.OrderLines.Add(newOrderLine);
            }

            _databaseContext.SaveChanges();

            input.Order.OrderNumber = documentNumber;
            input.Order.OrderId = newOrder.OrderId;

            return input;
        }

        public OrderDetailViewModel GetOrder(string orderId)
        {
            var order = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderId == orderId).FirstOrDefault();

            if (order != null)
            {
                OrderDetailViewModel result = new OrderDetailViewModel();
                result.Order = new OrderViewModel()
                {
                    CancellationReason = order.CancellationReason,
                    CustomerContactNumber = order.CustomerContactNumber,
                    CustomerName = order.CustomerName,
                    OrderAmount = order.OrderAmount,
                    OrderDate = order.OrderDate,
                    OrderId = order.OrderId,
                    OrderNumber = order.OrderNumber,
                    OrderStatus = order.OrderStatus,
                    OrderTakenBy = order.OrderTakenBy,
                    OrderType = order.OrderType
                };

                result.OrderLines.AddRange(order.OrderLines.Select(x => new OrderLineViewModel()
                {
                    ItemId = x.ItemId,
                    KitchenId = x.KitchenId,
                    OrderId = x.OrderId,
                    OrderLineId = x.OrderLineId,
                    OrderLineStatus = x.OrderLineStatus,
                    OrderQuantity = x.OrderQuantity,
                    PreparedById = x.PreparedById
                }).ToList());

                return result;
            }
            return null;
        }

        public bool ChangeOrderStatus(OrderStatusInputViewModel input)
        {
            var order = _databaseContext.Orders.Where(x => x.OrderId == input.OrderId).FirstOrDefault();
            if(order != null)
            {
                switch (input.OrderStatus)
                {                    
                    case OrderStatus.BeingPacked:
                        if(order.OrderType != OrderType.TakeAway)
                        {
                            throw new Exception("This status is invalid for DineIn orders.");
                        }
                        else if (order.OrderStatus != OrderStatus.Prepared)
                        {
                            throw new Exception("Status BeingPacked is applicable only for the items which are already Prepared.");
                        }
                        order.OrderStatus = OrderStatus.BeingPacked;
                        order.UpdatedBy = _userInfo.UserId;
                        order.UpdatedOn = DateTime.Now;
                        _databaseContext.Orders.Update(order);
                        _databaseContext.SaveChanges();
                        break;
                    case OrderStatus.Packed:
                        if (order.OrderType != OrderType.TakeAway)
                        {
                            throw new Exception("This status is invalid for DineIn orders.");
                        }
                        else if (order.OrderStatus != OrderStatus.BeingPacked)
                        {
                            throw new Exception("Status Packed is applicable only for the items which are already BeingPacked.");
                        }
                        order.OrderStatus = OrderStatus.Packed;
                        order.UpdatedBy = _userInfo.UserId;
                        order.UpdatedOn = DateTime.Now;
                        _databaseContext.Orders.Update(order);
                        _databaseContext.SaveChanges();
                        break;
                    case OrderStatus.ReadyToBeServed:
                        if (order.OrderType != OrderType.DineIn)
                        {
                            throw new Exception("This status is invalid for TakeAway orders.");
                        }
                        else if (!(order.OrderStatus >= OrderStatus.Prepared && order.OrderStatus <= OrderStatus.Packed))
                        {
                            throw new Exception("Status Ready To Be Served is applicable only for the items which are Prepared or already BeingPacked.");
                        }
                        order.OrderStatus = OrderStatus.ReadyToBeServed;
                        order.UpdatedBy = _userInfo.UserId;
                        order.UpdatedOn = DateTime.Now;
                        _databaseContext.Orders.Update(order);
                        _databaseContext.SaveChanges();
                        break;
                    case OrderStatus.ReadyToBeDelivered:

                        if (order.OrderType != OrderType.TakeAway)
                        {
                            throw new Exception("This status is invalid for DineIn orders.");
                        }
                        else if (!(order.OrderStatus >= OrderStatus.Prepared && order.OrderStatus <= OrderStatus.Packed))
                        {
                            throw new Exception("Status Ready To Be Delivered is applicable only for the items which are Prepared or already BeingPacked.");
                        }
                        order.OrderStatus = OrderStatus.ReadyToBeDelivered;
                        order.UpdatedBy = _userInfo.UserId;
                        order.UpdatedOn = DateTime.Now;
                        _databaseContext.Orders.Update(order);
                        _databaseContext.SaveChanges();
                        break;
                    case OrderStatus.Completed:
                        order.OrderStatus = OrderStatus.Completed;
                        order.UpdatedBy = _userInfo.UserId;
                        order.UpdatedOn = DateTime.Now;
                        _databaseContext.Orders.Update(order);
                        _databaseContext.SaveChanges();
                        break;
                    case OrderStatus.Cancelled:
                        if (input.CancellationReason == string.Empty)
                        {
                            throw new Exception("Cancellation reason is mandatory.");
                        }
                        order.OrderStatus = OrderStatus.Cancelled;
                        order.UpdatedBy = _userInfo.UserId;
                        order.UpdatedOn = DateTime.Now;
                        _databaseContext.Orders.Update(order);

                        var orderLines = _databaseContext.OrderLines.Where(x => x.OrderId == input.OrderId).ToList();
                        foreach (var item in orderLines)
                        {
                            item.OrderLineStatus = OrderLineStatus.Cancelled;
                            item.UpdatedBy = _userInfo.UserId;
                            item.UpdatedOn = DateTime.Now;
                            _databaseContext.OrderLines.Update(item);
                        }

                        _databaseContext.SaveChanges();
                        break;
                    default:
                        throw new NotImplementedException("The inputed status is invalid.");
                }
                return true;
            }
            else
            {
                throw new Exception("Order not found");
            }
        }

        public bool ChangeOrderLineStatus(OrderLineStatusInputViewModel input)
        {
            var orderLine = _databaseContext.OrderLines.Where(x => x.OrderLineId == input.OrderLineId).FirstOrDefault();
            if(orderLine != null)
            {
                switch (input.OrderLineStatus)
                {
                    case OrderLineStatus.BeingPrepared:
                        if(input.KitchenId == null)
                        {
                            throw new Exception("Kitchen detail is mandatory for changing status to Being Prepared");
                        }
                        else if(input.PreparedById == null)
                        {
                            throw new Exception("Chef detail is mandatory for changing status to Being Prepared");
                        }
                        var order = _databaseContext.Orders.Where(x => x.OrderId == orderLine.OrderId).FirstOrDefault();
                        if(order.OrderStatus == OrderStatus.BeingPrepared)
                        {
                            order.OrderStatus = OrderStatus.BeingPrepared;
                            order.UpdatedBy = _userInfo.UserId;
                            order.UpdatedOn = DateTime.Now;

                            _databaseContext.Orders.Update(order);
                        }
                        orderLine.OrderLineStatus = OrderLineStatus.BeingPrepared;
                        orderLine.UpdatedBy = _userInfo.UserId;
                        orderLine.UpdatedOn = DateTime.Now;
                        _databaseContext.OrderLines.Update(orderLine);
                        _databaseContext.SaveChanges();
                        break;
                    case OrderLineStatus.Prepared:
                        if (orderLine.OrderLineStatus != OrderLineStatus.BeingPrepared)
                        {
                            throw new Exception("Status can be changed to Prepared only if the order line is Being Prepared");
                        }
                        orderLine.OrderLineStatus = OrderLineStatus.Prepared;
                        orderLine.UpdatedBy = _userInfo.UserId;
                        orderLine.UpdatedOn = DateTime.Now;
                        _databaseContext.OrderLines.Update(orderLine);
                        _databaseContext.SaveChanges();

                        var orderLines = _databaseContext.OrderLines.Where(x => x.OrderId == orderLine.OrderId).ToList();

                        var preparedCount = orderLines.Where(x => x.OrderLineStatus == OrderLineStatus.Prepared || x.OrderLineStatus == OrderLineStatus.Cancelled).ToList().Count();

                        if (orderLines.Count() == preparedCount)
                        {
                            order = _databaseContext.Orders.Where(x => x.OrderId == orderLine.OrderId).FirstOrDefault();
                            order.OrderStatus = OrderStatus.Prepared;
                            order.UpdatedBy = _userInfo.UserId;
                            order.UpdatedOn = DateTime.Now;

                            _databaseContext.Orders.Update(order);
                            _databaseContext.SaveChanges();
                        }

                        break;
                    case OrderLineStatus.Cancelled:
                        orderLine.OrderLineStatus = OrderLineStatus.Cancelled;
                        orderLine.UpdatedBy = _userInfo.UserId;
                        orderLine.UpdatedOn = DateTime.Now;
                        _databaseContext.OrderLines.Update(orderLine);
                        _databaseContext.SaveChanges();
                        break;
                    default:
                        throw new NotImplementedException("The inputed status is invalid.");
                }
                return true;
            }
            else
            {
                throw new Exception("Order Line not found");
            }
        }
    }
}
