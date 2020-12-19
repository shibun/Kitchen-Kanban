import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { ItemService } from '../../services/item.service';
import { OrderService } from '../../services/order.service';
import { DashboardService } from '../../services/dashboard.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  orderTypes: Array<{ id: number, text: string }> = [
    { id: 1, text: 'Dine In' },
    { id: 2, text: 'Take Away' }
  ];
  clock = new Date();
  showPopup = false;
  showOrderCancelPopup = false;
  orderIdForCancellation = '';
  orderNumberForCancellation = '';
  items: any = [];
  kanbanBuckets: any = [];
  newOrderBucket: any = {
    bucketName: '',
    flowOrder: 0,
    orderCount: 0,
    orders: []
  };
  beingPreparedBucket: any = {
    bucketName: '',
    flowOrder: 0,
    orderCount: 0,
    orders: []
  };
  preparedBucket: any = {
    bucketName: '',
    flowOrder: 0,
    orderCount: 0,
    orders: []
  };
  packingBucket: any = {
    bucketName: '',
    flowOrder: 0,
    orderCount: 0,
    orders: []
  };
  readyOrderBucket: any = {
    bucketName: '',
    flowOrder: 0,
    orderCount: 0,
    orders: []
  };
  selectedItems: any = [];
  selectedItemName: string = "";
  selectedOrder: any = {};
  record = {
    order: {
      orderId: null,
      orderType: 2,
      customerName: null,
      customerContactNumber: null
    },
    orderLines: []
  };

  constructor(private messageService: MessageService, private itemService: ItemService, 
              private orderService: OrderService, private dashboardService: DashboardService) {
    setInterval(() => {
      this.clock = new Date();
    }, 1000)

  }

  ngOnInit(): void {
    this.getKanbanboard();
  }

  showAddForm(): void {
    this.getItems();
    this.showPopup = true;
  }

  saveDash(): void {
    this.messageService.showSuccessMessage();
  }

  getItems(): void {
    this.itemService.getItems().subscribe(
      data => {
        this.items = data;
      },
      err => {
        console.log("Create Order getItems : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  onItemChanged(itemName: string) {
    let selectedRecord = this.items.find((x: { itemName: string; }) => x.itemName == itemName);

    let existingRecord = this.selectedItems.find((x: { itemId: string; }) => x.itemId == selectedRecord.itemId);
    if (existingRecord) {
      const index: number = this.selectedItems.indexOf(existingRecord);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
      existingRecord.itemQuantity = existingRecord.itemQuantity + 1;
      existingRecord.orderQuantity = existingRecord.orderQuantity + 1;
      this.selectedItems.push(existingRecord);
    }
    else {
      selectedRecord.itemQuantity = 1;
      selectedRecord.orderQuantity = 1;
      this.selectedItems.push(selectedRecord);
    }

    this.selectedItemName = '';
  }

  getTotalItems() {
    if (this.selectedItems) {
      return this.selectedItems.map((t: { itemQuantity: any; }) => t).reduce((a: any, value: any) => a + value.itemQuantity, 0);
    }
    return 0;
  }

  getTotalAmount() {
    if (this.selectedItems) {
      return this.selectedItems.map((t: { itemQuantity: any; }) => t).reduce((a: any, value: any) => a + (value.itemQuantity * value.itemCharge), 0);
    }
    return 0;
  }

  getItemTotalAmount(quantity: number, price: number) {
    return (quantity * price);
  }

  increaseQuantity(index: number) {
    this.selectedItems[index].orderQuantity++;
    this.selectedItems[index].itemQuantity++;
  }

  reduceQuantity(index: number) {
    if(this.selectedItems[index].itemQuantity > 1)
    {
      this.selectedItems[index].orderQuantity--;
      this.selectedItems[index].itemQuantity--;
    }
  }

  deleteItem(index: number)
  {
    this.selectedItems.splice(index, 1);
  }

  saveOrder(): void {
    if(this.selectedItems == null || this.selectedItems.length == 0)
    {
      this.messageService.showErrorMessage("Please add items to order.");
      return;
    }
    this.record.orderLines = this.selectedItems;
    if (this.record.order.orderId != null && this.record.order.orderId != '') {
      
    }
    else
    {
      this.orderService.newOrder(this.record).subscribe(
        data => {
          this.messageService.showSuccessMessage();
          this.getKanbanboard();
          this.closeForm();
        },
        err => {
          console.log("Dashboard saveOrder : ", err.error)
        }
      );
    }
  }

  getKanbanboard(): void {
    this.dashboardService.getKanbanboard().subscribe(
      data => {
        this.kanbanBuckets = data;   
        if(this.kanbanBuckets.length > 0)
        {
          this.newOrderBucket = this.kanbanBuckets.find((x: { flowOrder: number; }) => x.flowOrder == 1);
          this.beingPreparedBucket = this.kanbanBuckets.find((x: { flowOrder: number; }) => x.flowOrder == 2);
          this.preparedBucket = this.kanbanBuckets.find((x: { flowOrder: number; }) => x.flowOrder == 3);
          this.packingBucket = this.kanbanBuckets.find((x: { flowOrder: number; }) => x.flowOrder == 4);
          this.readyOrderBucket = this.kanbanBuckets.find((x: { flowOrder: number; }) => x.flowOrder == 5);
        } 
        else
        {
          this.newOrderBucket = [];
          this.beingPreparedBucket = [];
          this.preparedBucket = [];
          this.packingBucket = [];
          this.readyOrderBucket = [];
        }    
      },
      err => {
        console.log("Dashboard getKanbanboard : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  getOrderAging(order: any) {
    let currentTime: any = new Date();
    let orderDate: any = new Date(order.orderDate);
    let diffMs = ((currentTime || 0) - (orderDate || 0));
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffHrs && diffHrs > 0) {
      return (diffHrs == 1 ? diffHrs + "hr" : diffHrs + "hrs");
    }
    else if(diffMins > 0) {
      return (diffMins == 1 ? diffMins + "min" : diffMins + "mins");
    }
    else
    {
      return "Just Now";
    }
  }

  toggleOrderDetails(order: any, index: number, divIdentifier: string) {
    if (order.orderStatus == 6) {
      return;
    }
    else {
      this.selectedOrder = {};
      this.getOrderDetails(order);       
      $("#orderdetailsdiv" + divIdentifier + index).slideToggle();
    }
  }

  showCancelOrderPopup(order: any)
  {
    this.orderIdForCancellation = order.orderId;
    this.orderNumberForCancellation = order.orderNumber;
    this.showOrderCancelPopup = true;
  }

  closeOrderCancelPopup()
  {
    this.orderIdForCancellation = '';
    this.orderNumberForCancellation = '';
    this.showOrderCancelPopup = false;
  }

  cancelOrder()
  {
    let input = {
      orderId: this.orderIdForCancellation,
      orderStatus: 7,
      cancellationReason: "Wrong order."
    }
    this.orderService.changeOrderStatus(input).subscribe(
      data => {
        this.messageService.showSuccessMessage();
        this.getKanbanboard();
        this.closeOrderCancelPopup();
      },
      err => {
        console.log("Dashboard cancelOrder : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  getOrderLineTotal(item : any)
  {
    return (item.orderQuantity * item.itemCharge);
  }

  getOrderDetails(order: any)
  {
    this.orderService.getOrderById(order.orderId).subscribe(
      data => {
        this.selectedOrder = data;
      },
      err => {
        console.log("Dashboard getOrderDetails : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  closeForm(): void {
    this.showPopup = false;
    this.items = [];
    this.selectedItems = [];
    this.record = {
      order: {  
        orderId: null,
        orderType: 2,
        customerName: null,
        customerContactNumber: null
      },
      orderLines: []
    };
  }

}