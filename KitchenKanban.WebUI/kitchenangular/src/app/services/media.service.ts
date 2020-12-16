import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:64464/WebApi/api';

@Injectable({
  providedIn: 'root'
})

export class MediaService {

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

  postFile(fileToUpload: any, referenceId: string, fileType: number): Observable<any> {
    const endpoint = '/Image?referenceId=' + referenceId + '&fileType=' + fileType;
    return this.http.post<any>(API_URL + endpoint, fileToUpload);
  }

  updateFile(fileToUpload: any, imageId: any): Observable<any> {
    const endpoint = '/Image?imageId=' + imageId;
    return this.http.put<any>(API_URL + endpoint, fileToUpload);
  }
}
