import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else {
      errorMessage = error.message;
    }
    console.log("Error in Item service : ", errorMessage);
    return throwError(errorMessage);
  }

  newOrder(order: any): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + '/Order', order);
  }

  updateOrder(order: any): Observable<any> {
    return this.http.put<any>(environment.apiEndpoint + '/Order', order);
  }

  changeOrderStatus(input: any): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + '/Order/OrderStatus', input);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/Order/GetOrderById?orderId=' + orderId, { responseType: 'json' }).pipe(catchError(this.handleError));
  }
}
