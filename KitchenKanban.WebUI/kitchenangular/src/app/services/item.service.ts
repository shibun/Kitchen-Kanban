import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
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

  addItem(item: any): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + '/Item', item);
  }

  updateItem(item: any): Observable<any> {
    return this.http.put<any>(environment.apiEndpoint + '/Item', item);
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete<any>(environment.apiEndpoint + '/Item/'+ itemId);
  }

  getItems(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/Item', { responseType: 'json' }).pipe
      (
        catchError(this.handleError)
      );
  }

  getItemById(itemId: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/Item/' + itemId, { responseType: 'json' }).pipe(catchError(this.handleError));
  }
}
