import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { MessageService } from '../../services/message.service';
import { OrderService } from '../../services/order.service';

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
    { id: 6, text: 'Delivered' },
    { id: 7, text: 'Cancelled' }
  ];
  orders: any = [];
  showPopup = false;
  recordNotFound = false;
  record = {
    order: {
      orderId: null,
      orderType: 2,
      customerName: '',
      customerContactNumber: ''
    },
    orderLines: []
  };

  currentDate = new Date();
  constructor(private reportService: ReportService, private messageService: MessageService,
    private orderService: OrderService) { }

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

  showReportDetail(orderId: string)
  {
    this.orderService.getOrderById(orderId).subscribe(
      data => {
        this.record = data;
        if(this.record.order.customerName != null)
        {
          var regex =/\b(\w{2})(\w+)(\w)\b/g;
          this.record.order.customerName =  (this.record.order.customerName.replace(regex,(_, first, middle, last) => `${first}${'x'.repeat(middle.length)}${last}`));        }
          this.showPopup = true;
      },
      err => {
        console.log("Report showReportDetail : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  getItemTotalAmount(quantity: any, price: any) {
    return (quantity * price);
  }

  getTotalItems() {
    if (this.record.orderLines) {
      return this.record.orderLines.map((t: { orderQuantity: any; }) => t).reduce((a: any, value: any) => a + value.orderQuantity, 0);
    }
    return 0;
  }

  getTotalLineAmount() {
    if (this.record.orderLines) {
      return this.record.orderLines.map((t: { orderQuantity: any; }) => t).reduce((a: any, value: any) => a + (value.orderQuantity * value.itemCharge), 0);
    }
    return 0;
  }

  closeForm(): void {
    this.showPopup = false;
    this.record = {
      order: {
        orderId: null,
        orderType: 0,
        customerName: '',
        customerContactNumber: ''
      },
      orderLines: []
    };
  }

}
