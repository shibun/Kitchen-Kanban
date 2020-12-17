import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }
  loginInput: AuthenticationRequest = { userName: '', password: '' }
  isLoginFailed = false;
  errorMessage = '';
  ngOnInit() {
  }

  signIn(): void {
    this.authService.newlogin(this.loginInput).subscribe(
      data => {
        this.isLoginFailed = false;
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.errorMessage = err.error.message;
        console.log("Login Error : ", this.errorMessage)
        this.isLoginFailed = true;
      }
    );
  }
}
