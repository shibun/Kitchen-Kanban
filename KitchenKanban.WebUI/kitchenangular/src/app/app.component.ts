import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Kitchen';
  loggedInUserName = '';
  isLoggedIn = false;
  loggedUser = {};

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.tokenStorage.isUserLoggedIn.subscribe(result => this.isLoggedIn = result);
    this.tokenStorage.getLoggedInUserName.subscribe(result => this.loggedInUserName = result);
    if (this.isLoggedIn) {
      this.loggedUser = this.tokenStorage.getUser();
    }
  }

  signOut(){
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/login');
  }
}
