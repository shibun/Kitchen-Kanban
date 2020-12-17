import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private authService : AuthService) { }
  
  LoginStatus$!: Observable<boolean>;
  User$!: Observable<any>;

  ngOnInit(): void {
    this.LoginStatus$ = this.authService.isLoggesIn;
    this.User$ = this.authService.currentUser;
  }

  signOut(){    
    this.authService.logout();
  }

}
