import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:64464/WebApi/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log("Error in user service : ", errorMessage);
    return throwError(errorMessage);
  }

  getUsers(): Observable<any> {
    return this.http.get(API_URL + '/User', { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  getUserById(userId : string): Observable<any> {
    return this.http.get(API_URL + '/User/GetUserById?userId='+ userId, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  addUser(user : any): Observable<any>{
    return this.http.post<any>(API_URL + '/User', user);
  }

  updateUser(user : any): Observable<any>{
    return this.http.put<any>(API_URL + '/User', user);
  }
}