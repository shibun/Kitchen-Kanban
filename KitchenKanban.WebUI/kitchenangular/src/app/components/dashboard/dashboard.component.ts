import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
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
  selectedItems: any = [];
  selectedItemName: string = "";
  record = {
    order: {
      orderType: 2,
      customerName: null,
      customerContactNumber: null
    },
    orderLines: []
  };

  constructor(private messageService: MessageService, private itemService: ItemService) {
    setInterval(() => {
      this.clock = new Date();
    }, 1000)

  }

  ngOnInit(): void {

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
      this.selectedItems.push(existingRecord);
    }
    else {
      selectedRecord.itemQuantity = 1;
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
    this.selectedItems[index].itemQuantity++;
  }

  reduceQuantity(index: number) {
    if(this.selectedItems[index].itemQuantity > 1)
    {
      this.selectedItems[index].itemQuantity--;
    }
  }

  deleteItem(index: number)
  {
    this.selectedItems.splice(index, 1);
  }

  saveOrder(): void {
    this.record.orderLines = this.selectedItems;
    console.log("this.record : ", this.record);
  }

  closeForm(): void {
    this.showPopup = false;
    this.items = [];
    this.selectedItems = [];
    this.record = {
      order: {  
        orderType: 2,
        customerName: null,
        customerContactNumber: null
      },
      orderLines: []
    };
  }

}