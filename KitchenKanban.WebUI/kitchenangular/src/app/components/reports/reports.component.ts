import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  orderStatues: Array<{ id: number, text: string }> = [
    { id: 1, text: 'New Order' },
    { id: 2, text: 'Being Prepared' },
    { id: 3, text: 'Prepared' },
    { id: 4, text: 'Packing' },
    { id: 5, text: 'Ready To Be Delivered' },
    { id: 6, text: 'Delevered' },
    { id: 7, text: 'Cancelled' }
  ];

  orders: any = [];
  showPopup = false;
  recordNotFound = false;
  record = {
    kitchenId: '',
    counterNumber: ''
  };

  currentDate = new Date();
  constructor(private reportService: ReportService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getOrderReport();
  }

  getOrderReport(): void {
    this.reportService.getOrderReport().subscribe(
      data => {
        this.orders = data;
        if(this.orders.length > 0)
        {
          this.recordNotFound = false;
        }
        else
        {
          this.recordNotFound = true;
        }
      },
      err => {
        console.log("Report getOrderReport : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  getTotalDishesCount()
  {
    if (this.orders) {
      return this.orders.map((t: { noOfItemsInOrder: any; }) => t).reduce((a: any, value: any) => a + value.noOfItemsInOrder, 0);
    }
    return 0;
  }

  getTotalAmount() {
    if (this.orders) {
      return this.orders.map((t: { orderAmount: any; }) => t).reduce((a: any, value: any) => a + value.orderAmount, 0);
    }
    return 0;
  }

  getOrderStatus(orderStatus: number): string {
    let selectedorderStatus = this.orderStatues.find(x => x.id == orderStatus);
    return selectedorderStatus == null ? "" : selectedorderStatus.text;
  }

}
