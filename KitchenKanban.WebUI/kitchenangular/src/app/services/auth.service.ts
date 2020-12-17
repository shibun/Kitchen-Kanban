import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationRequest } from '../models/authentication-request';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

const API_URL = 'http://localhost:64464/WebApi';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router : Router) { }

   // User related properties
   private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
   private User    = new BehaviorSubject<any>(localStorage.getItem('user'));
   
  login(credentials : AuthenticationRequest): Observable<any> {
    return this.http.post(API_URL + '/token', {
      userName: credentials.userName,
      password: credentials.password
    }, httpOptions);
  }

  newlogin(credentials : AuthenticationRequest):  Observable<any>
    {
        return this.http.post<any>(API_URL + '/token', {
          userName: credentials.userName,
          password: credentials.password
        }, httpOptions).pipe(
            map(result => {

                // login successful if there's a jwt token in the response
                if(result && result.token) 
                {
                    this.loginStatus.next(true);
                    localStorage.setItem('loginStatus', '1');
                    localStorage.setItem('userToken', result.token);
                    localStorage.setItem('user', result);
                    this.User.next(result);
                }
                 return result;
            })
              
            );
    }

    logout() 
    {
        this.loginStatus.next(false);
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        localStorage.setItem('loginStatus', '0');
        this.router.navigate(['/login']);
        console.log("Logged Out Successfully");
    }



    checkLoginStatus() : boolean 
    {      
      console.log("Inside checkLoginStatus");
        var loginCookie = localStorage.getItem("loginStatus");
        if(loginCookie == "1") 
        {
            if(localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === undefined) 
            {                
              this.router.navigate(['/login']);
            }  
            return true;        
        }        
        this.router.navigate(['/login']);
        return false;
    }

    get isLoggesIn() 
    {
        return this.loginStatus.asObservable();
    }

    get currentUser() 
    {
        return this.User.asObservable();
    }
}