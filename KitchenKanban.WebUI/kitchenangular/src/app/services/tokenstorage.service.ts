import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  
  public isUserLoggedIn = new Subject<boolean>(); 
  public getLoggedInUserName = new Subject<string>(); 
  constructor() { }

  signOut(): void {    
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
    this.isUserLoggedIn.next(false);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.isUserLoggedIn.next(true);
  }

  public getToken(): string | null {
    const tokenJson = sessionStorage.getItem(TOKEN_KEY);
    return tokenJson;
  }

  public isLoggedIn(){
    return sessionStorage.getItem(TOKEN_KEY) !== null;
  }

  public saveUser(user : User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.getLoggedInUserName.next(user.userFullName);
  }

  public getUser(): any {
    const userJson = sessionStorage.getItem(USER_KEY);
    return userJson !== null ? JSON.parse(userJson) : userJson;
  }
}
