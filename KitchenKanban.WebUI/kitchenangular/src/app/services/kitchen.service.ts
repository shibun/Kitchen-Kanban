import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else {
      errorMessage = error.message;
    }
    console.log("Error in kitchen service : ", errorMessage);
    return throwError(errorMessage);
  }

  addKitchen(kitchen: any): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + '/Kitchen', kitchen);
  }

  updateKitchen(kitchen: any): Observable<any> {
    return this.http.put<any>(environment.apiEndpoint + '/Kitchen', kitchen);
  }

  deleteKitchen(kitchenId: string): Observable<any> {
    return this.http.delete<any>(environment.apiEndpoint + '/Kitchen/'+ kitchenId);
  }

  getKitchens(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/Kitchen', { responseType: 'json' }).pipe
      (
        catchError(this.handleError)
      );
  }

  getKitchenById(kitchenId: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/Kitchen/' + kitchenId, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

}
