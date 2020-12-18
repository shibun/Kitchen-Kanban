import { Component, OnInit } from '@angular/core';
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
  items: any = [];
  kanbanBuckets: any = [];
  selectedItems: any = [];
  selectedItemName: string = "";
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
      },
      err => {
        console.log("Dashboard getKanbanboard : ", err)
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