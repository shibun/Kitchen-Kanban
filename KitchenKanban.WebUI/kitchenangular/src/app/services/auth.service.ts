import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../models/authentication-request';

const API_URL = 'http://localhost:64464/WebApi';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(credentials : AuthenticationRequest): Observable<any> {
    return this.http.post(API_URL + '/token', {
      userName: credentials.userName,
      password: credentials.password
    }, httpOptions);
  }
}