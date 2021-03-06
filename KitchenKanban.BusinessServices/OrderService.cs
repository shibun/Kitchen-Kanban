﻿using KitchenKanban.BusinessServices.Interfaces;
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
            try
            {
                decimal totalOrderAmount = 0.00M;
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
                    OrderTakenBy = _userInfo.UserId,
                    OrderType = input.Order.OrderType,
                    CreatedBy = _userInfo.UserId,
                    CreatedOn = DateTime.Now
                };
                _databaseContext.Orders.Add(newOrder);

                foreach (var item in input.OrderLines)
                {
                    var addedItem = _databaseContext.Items.Where(x => x.ItemId == item.ItemId).FirstOrDefault();
                    if(addedItem != null)
                    {
                        totalOrderAmount = totalOrderAmount + (item.OrderQuantity * addedItem.ItemCharge);
                    }
                    var newOrderLine = new OrderLine()
                    {
                        CreatedBy = _userInfo.UserId,
                        CreatedOn = DateTime.Now,
                        ItemId = item.ItemId,
                        OrderId = newOrder.OrderId,
                        OrderLineId = Guid.NewGuid().ToString(),
                        OrderQuantity = item.OrderQuantity
                    };
                    _databaseContext.OrderLines.Add(newOrderLine);
                }

                _databaseContext.SaveChanges();

                var order = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderId == newOrder.OrderId).FirstOrDefault();
                order.OrderAmount = totalOrderAmount;
                _databaseContext.Orders.Update(order);

                _databaseContext.SaveChanges();

                input.Order.OrderNumber = documentNumber;
                input.Order.OrderId = newOrder.OrderId;

                return input;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public OrderDetailViewModel GetOrder(string orderId)
        {
            try
            {
                var order = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderId == orderId).FirstOrDefault();

                if (order != null)
                {
                    User orderTakenBy = null;
                    if (order.OrderTakenBy != null)
                    {
                        orderTakenBy = _databaseContext.Users.Where(x => x.UserId == order.OrderTakenBy).FirstOrDefault();
                    }
                    OrderDetailViewModel result = new OrderDetailViewModel();
                    var orderData = new OrderViewModel()
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
                        OrderTakenByUserName = orderTakenBy?.FirstName + " " + orderTakenBy?.LastName,
                        OrderType = order.OrderType
                    };

                    if (order.OrderStatus == OrderStatus.Completed)
                    {
                        orderData.OrderDeliveryDate = order.UpdatedOn;
                    }

                    result.Order = orderData;

                    result.OrderLines.AddRange(order.OrderLines.Select(x => new OrderLineViewModel()
                    {
                        ItemId = x.ItemId,
                        KitchenId = x.KitchenId,
                        OrderId = x.OrderId,
                        OrderLineId = x.OrderLineId,
                        OrderQuantity = x.OrderQuantity,
                        PreparedById = x.PreparedById,
                        Item = new ItemViewModel()
                        {
                            ItemId = x.ItemId,
                            ItemName = _databaseContext.Items.Find(x.ItemId).ItemName,
                            ItemQuantity = x.OrderQuantity,
                            ItemCharge = _databaseContext.Items.Find(x.ItemId).ItemCharge
                        },
                        ItemName = _databaseContext.Items.Find(x.ItemId).ItemName,
                        ItemCharge = _databaseContext.Items.Find(x.ItemId).ItemCharge
                    }).ToList());

                    return result;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }        

        public bool ChangeOrderStatus(OrderStatusInputViewModel input)
        {
            try
            {
                var order = _databaseContext.Orders.Where(x => x.OrderId == input.OrderId).FirstOrDefault();
                if (order != null)
                {
                    switch (input.OrderStatus)
                    {
                        case OrderStatus.BeingPrepared:
                            //if (order.OrderStatus != OrderStatus.NewOrder)
                            //{
                            //    throw new Exception("Status Being Prepared is applicable only for New Order.");
                            //}
                            order.OrderStatus = OrderStatus.BeingPrepared;
                            order.UpdatedBy = _userInfo.UserId;
                            order.UpdatedOn = DateTime.Now;
                            _databaseContext.Orders.Update(order);
                            _databaseContext.SaveChanges();
                            break;
                        case OrderStatus.Prepared:
                            //if (order.OrderStatus != OrderStatus.BeingPrepared)
                            //{
                            //    throw new Exception("Status Prepared is applicable only for the items which are already Being Prepared.");
                            //}
                            order.OrderStatus = OrderStatus.Prepared;
                            order.UpdatedBy = _userInfo.UserId;
                            order.UpdatedOn = DateTime.Now;
                            _databaseContext.Orders.Update(order);
                            _databaseContext.SaveChanges();
                            break;
                        case OrderStatus.Packing:
                            if (order.OrderType != OrderType.TakeAway)
                            {
                                throw new Exception("This status is invalid for DineIn orders.");
                            }
                            //else if (order.OrderStatus != OrderStatus.Prepared)
                            //{
                            //    throw new Exception("Status Packing is applicable only for the items which are already Prepared.");
                            //}
                            order.OrderStatus = OrderStatus.Packing;
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
                            //else if (!(order.OrderStatus >= OrderStatus.Prepared && order.OrderStatus <= OrderStatus.Packing))
                            //{
                            //    throw new Exception("Status Ready To Be Delivered is applicable only for the items which are Prepared or already BeingPacked.");
                            //}
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
                            if (order.OrderStatus != OrderStatus.NewOrder)
                            {
                                throw new Exception("Only new order can be cancelled.");
                            }
                            else if (input.CancellationReason == string.Empty)
                            {
                                throw new Exception("Cancellation reason is mandatory.");
                            }
                            order.OrderStatus = OrderStatus.Cancelled;
                            order.UpdatedBy = _userInfo.UserId;
                            order.UpdatedOn = DateTime.Now;
                            _databaseContext.Orders.Update(order);
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<OrderViewModel> GetAllOrders()
        {
            try
            {
                List<OrderViewModel> result = new List<OrderViewModel>();
                var orders = _databaseContext.Orders.Include(x => x.OrderLines).ToList();
                User orderTakenBy = null;
                foreach (var order in orders)
                {

                    var orderView = new OrderViewModel()
                    {
                        CancellationReason = order.CancellationReason,
                        CustomerContactNumber = order.CustomerContactNumber,
                        CustomerName = order.CustomerName,
                        NoOfItemsInOrder = order.OrderLines.Count(),
                        OrderAmount = order.OrderAmount,
                        OrderDate = order.OrderDate,
                        OrderId = order.OrderId,
                        OrderNumber = order.OrderNumber,
                        OrderStatus = order.OrderStatus,
                        OrderTakenBy = order.OrderTakenBy,
                        OrderType = order.OrderType
                    };
                    if (order.OrderStatus == OrderStatus.Completed)
                    {
                        orderView.OrderDeliveryDate = order.UpdatedOn;
                    }
                    if (order.OrderTakenBy != null)
                    {
                        orderTakenBy = _databaseContext.Users.Where(x => x.UserId == order.OrderTakenBy).FirstOrDefault();
                        orderView.OrderTakenByUserName = orderTakenBy.FirstName + " " + orderTakenBy.LastName;
                    }

                    result.Add(orderView);
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(OrderDetailViewModel input)
        {
            try
            {
                var order = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderId == input.Order.OrderId).FirstOrDefault();

                if (order != null)
                {
                    if (order.OrderStatus != OrderStatus.NewOrder)
                    {
                        throw new Exception("Order can be modified only if new order.");
                    }

                    order.CustomerName = input.Order.CustomerName;
                    order.CustomerContactNumber = input.Order.CustomerContactNumber;
                    order.UpdatedBy = _userInfo.UserId;
                    order.UpdatedOn = DateTime.Now;
                    _databaseContext.Orders.Update(order);

                    var newItems = input.OrderLines.Where(x => string.IsNullOrEmpty(x.OrderLineId)).ToList();
                    var existingItems = input.OrderLines.Where(x => !string.IsNullOrEmpty(x.OrderLineId)).ToList();

                    for (int i = 0; i < order.OrderLines.Count(); i++)
                    {
                        var existingRecord = existingItems.Where(x => x.OrderLineId == order.OrderLines[i].OrderLineId).FirstOrDefault();
                        if (existingRecord != null)
                        {
                            var orderLine = _databaseContext.OrderLines.Where(x => x.OrderLineId == existingRecord.OrderLineId).FirstOrDefault();
                            orderLine.OrderQuantity = existingRecord.OrderQuantity;
                            orderLine.UpdatedBy = _userInfo.UserId;
                            orderLine.UpdatedOn = DateTime.Now;
                            _databaseContext.OrderLines.Update(orderLine);
                        }
                        else
                        {
                            var recordToDelete = _databaseContext.OrderLines.Where(x => x.OrderLineId == order.OrderLines[i].OrderLineId).FirstOrDefault();
                            if (recordToDelete != null)
                            {
                                _databaseContext.OrderLines.Remove(recordToDelete);
                            }
                        }
                    }
                    foreach (var item in newItems)
                    {
                        var newOrderLine = new OrderLine()
                        {
                            CreatedBy = _userInfo.UserId,
                            CreatedOn = DateTime.Now,
                            ItemId = item.ItemId,
                            OrderId = order.OrderId,
                            OrderLineId = Guid.NewGuid().ToString(),
                            OrderQuantity = item.OrderQuantity
                        };
                        _databaseContext.OrderLines.Add(newOrderLine);
                    }

                    _databaseContext.SaveChanges();

                    decimal totalOrderAmount = 0.00M;
                    var orderLines = _databaseContext.OrderLines.Where(x => x.OrderId == order.OrderId).ToList();
                    if(orderLines != null && orderLines.Count() > 0)
                    {
                        foreach (var item in orderLines)
                        {
                            var addedItem = _databaseContext.Items.Where(x => x.ItemId == item.ItemId).FirstOrDefault();
                            if (addedItem != null)
                            {
                                totalOrderAmount = totalOrderAmount + (item.OrderQuantity * addedItem.ItemCharge);
                            }
                        }

                        order.OrderAmount = totalOrderAmount;
                        _databaseContext.Orders.Update(order);

                        _databaseContext.SaveChanges();
                    }

                    return true;
                }
                else
                {
                    throw new Exception("Order not found.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
