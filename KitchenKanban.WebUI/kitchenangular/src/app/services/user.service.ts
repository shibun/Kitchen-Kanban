import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else {
      errorMessage = error.message;
    }
    console.log("Error in user service : ", errorMessage);
    return throwError(errorMessage);
  }

  getUsers(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/User', { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/User/GetUserById?userId=' + userId, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + '/User', user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(environment.apiEndpoint + '/User', user);
  }
}