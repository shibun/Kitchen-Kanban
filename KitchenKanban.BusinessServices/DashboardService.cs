using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.ViewModels.Dashboard;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using static KitchenKanban.Models.Enums.OrderEnum;

namespace KitchenKanban.BusinessServices
{
    public class DashboardService : IDashboardService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;
        private IUserInfo _userInfo;

        public DashboardService(IServiceProvider services, IUserInfo userInfo)
        {
            _userInfo = userInfo;
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
        }

        public List<KanbanBucket> GetKanbanBoard()
        {
            List<KanbanBucket> bucketList = new List<KanbanBucket>();
            var flowOrder = 0;

            var newOrders = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderStatus == OrderStatus.NewOrder).ToList();
            if(newOrders.Count() > 0)
            {
                flowOrder = flowOrder + 1;
                var bucket = new KanbanBucket()
                {
                    BucketName = "New Order",
                    FlowOrder = flowOrder,
                    OrderCount = newOrders.Count(),
                    Orders = newOrders.Select(order => new KanbanOrder()
                    {
                        CustomerContactNumber = order.CustomerContactNumber,
                        CustomerName = order.CustomerName,
                        OrderAmount = order.OrderAmount,
                        OrderDate = order.OrderDate,
                        OrderId = order.OrderId,
                        OrderLineCount = order.OrderLines.Count(),
                        OrderNumber = order.OrderNumber,
                        OrderStatus = order.OrderStatus,
                        OrderType = order.OrderType
                    }).ToList()
                };

                bucketList.Add(bucket);
            }

            //BeingPrepared
            var beingPreparedOrders = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderStatus == OrderStatus.BeingPrepared).ToList();
            if (beingPreparedOrders.Count() > 0)
            {
                flowOrder = flowOrder + 1;
                var bucket = new KanbanBucket()
                {
                    BucketName = "Being Prepared",
                    FlowOrder = flowOrder,
                    OrderCount = beingPreparedOrders.Count(),
                    Orders = beingPreparedOrders.Select(order => new KanbanOrder()
                    {
                        CustomerContactNumber = order.CustomerContactNumber,
                        CustomerName = order.CustomerName,
                        OrderAmount = order.OrderAmount,
                        OrderDate = order.OrderDate,
                        OrderId = order.OrderId,
                        OrderLineCount = order.OrderLines.Count(),
                        OrderNumber = order.OrderNumber,
                        OrderStatus = order.OrderStatus,
                        OrderType = order.OrderType
                    }).ToList()
                };

                bucketList.Add(bucket);
            }

            //Prepared
            var preparedOrders = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderStatus == OrderStatus.Prepared).ToList();
            if (preparedOrders.Count() > 0)
            {
                flowOrder = flowOrder + 1;
                var bucket = new KanbanBucket()
                {
                    BucketName = "Prepared",
                    FlowOrder = flowOrder,
                    OrderCount = preparedOrders.Count(),
                    Orders = preparedOrders.Select(order => new KanbanOrder()
                    {
                        CustomerContactNumber = order.CustomerContactNumber,
                        CustomerName = order.CustomerName,
                        OrderAmount = order.OrderAmount,
                        OrderDate = order.OrderDate,
                        OrderId = order.OrderId,
                        OrderLineCount = order.OrderLines.Count(),
                        OrderNumber = order.OrderNumber,
                        OrderStatus = order.OrderStatus,
                        OrderType = order.OrderType
                    }).ToList()
                };

                bucketList.Add(bucket);
            }

            //BeingPacked
            var packingOrders = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderStatus == OrderStatus.Packing).ToList();
            if (packingOrders.Count() > 0)
            {
                flowOrder = flowOrder + 1;
                var bucket = new KanbanBucket()
                {
                    BucketName = "Packing",
                    FlowOrder = flowOrder,
                    OrderCount = packingOrders.Count(),
                    Orders = packingOrders.Select(order => new KanbanOrder()
                    {
                        CustomerContactNumber = order.CustomerContactNumber,
                        CustomerName = order.CustomerName,
                        OrderAmount = order.OrderAmount,
                        OrderDate = order.OrderDate,
                        OrderId = order.OrderId,
                        OrderLineCount = order.OrderLines.Count(),
                        OrderNumber = order.OrderNumber,
                        OrderStatus = order.OrderStatus,
                        OrderType = order.OrderType
                    }).ToList()
                };

                bucketList.Add(bucket);
            }

            //ReadyToBeDelivered
            var readyToBeDeliveredOrders = _databaseContext.Orders.Include(x => x.OrderLines).Where(x => x.OrderStatus == OrderStatus.ReadyToBeDelivered).ToList();
            if (readyToBeDeliveredOrders.Count() > 0)
            {
                flowOrder = flowOrder + 1;
                var bucket = new KanbanBucket()
                {
                    BucketName = "Ready To Be Delivered",
                    FlowOrder = flowOrder,
                    OrderCount = readyToBeDeliveredOrders.Count(),
                    Orders = readyToBeDeliveredOrders.Select(order => new KanbanOrder()
                    {
                        CustomerContactNumber = order.CustomerContactNumber,
                        CustomerName = order.CustomerName,
                        OrderAmount = order.OrderAmount,
                        OrderDate = order.OrderDate,
                        OrderId = order.OrderId,
                        OrderLineCount = order.OrderLines.Count(),
                        OrderNumber = order.OrderNumber,
                        OrderStatus = order.OrderStatus,
                        OrderType = order.OrderType
                    }).ToList()
                };

                bucketList.Add(bucket);
            }

            return bucketList;
        }
    }
}
