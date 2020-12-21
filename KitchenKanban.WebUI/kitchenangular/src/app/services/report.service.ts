import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

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

  getOrderReport(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/Order/OrderReport', { responseType: 'json' }).pipe
      (
        catchError(this.handleError)
      );
  }

}
