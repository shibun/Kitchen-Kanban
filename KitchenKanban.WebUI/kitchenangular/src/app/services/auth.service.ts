import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationRequest } from '../models/authentication-request';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  // User related properties
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserFullName = new BehaviorSubject<string>(this.getUserFullName());

  login(credentials: AuthenticationRequest): Observable<any> {
    return this.http.post<any>(environment.tokenEndpoint, {
      userName: credentials.userName,
      password: credentials.password
    }, httpOptions).pipe(
      map(result => {
        // login successful if there's a jwt token in the response
        if (result && result.token) {
          this.loginStatus.next(true);
          sessionStorage.setItem('loginStatus', '1');
          sessionStorage.setItem('userToken', result.token);
          sessionStorage.setItem('user', JSON.stringify(result));
          this.UserFullName.next(result.firstName + " " + result.lastName);
        }
        return result;
      })
    );
  }

  logout() {
    this.loginStatus.next(false);
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('user');
    sessionStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log("Logged Out Successfully");
  }



  checkLoginStatus(): boolean {
    var loginCookie = sessionStorage.getItem("loginStatus");
    if (loginCookie == "1") {
      if (sessionStorage.getItem('userToken') === null || sessionStorage.getItem('userToken') === undefined) {
        this.router.navigate(['/login']);
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  getUserFullName(): string {
    var user = sessionStorage.getItem("user");
    if (user != null) {
      var json = JSON.parse(user);
      return json.firstName + " " + json.lastName
    }
    return '';
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserFullName() {
    return this.UserFullName.asObservable();
  }
}