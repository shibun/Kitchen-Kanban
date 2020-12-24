import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private messageService: MessageService) { }
  loginInput: AuthenticationRequest = { userName: '', password: '' }
  isLoginFailed = false;
  isFormValid = true;
  errorMessage = '';
  ngOnInit() {
  }

  signIn(): void {
    if(this.loginInput.userName ==  null || this.loginInput.userName == '' || this.loginInput.password ==  null || this.loginInput.password == '' )
    {
      this.isFormValid = false;
      return;
    }
    this.authService.login(this.loginInput).subscribe(
      data => {
        this.isLoginFailed = false;
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        console.log("Login Error : ", err)
        if(err.error.message)
        {          
          this.messageService.showErrorMessage(err.error.message);
        }
        else
        {
          this.messageService.showErrorMessage("Error while connecting server.");
        }
        
        this.isLoginFailed = true;
      }
    );
  }
}
