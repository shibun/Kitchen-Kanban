import { async, ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{ path: 'login', component: LoginComponent }]
        ),
        ReactiveFormsModule, FormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('login service to be called', 
    waitForAsync(() => {
    inject([AuthService], ((authService: AuthService) => {
      spyOn(authService, 'login');
      let component = fixture.componentInstance;
      component.loginInput.userName = "admin";
      component.loginInput.password = "123456";
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
      // component.signIn();
      expect(authService.login).toHaveBeenCalled();
    }))
  }));

  // it('should call the login method when the component does something', 
  //       inject([AuthService], ((authService: AuthService) => {
  //         spyOn(authService, 'login');
  //         let component = fixture.componentInstance;
  //         component.signIn();
  //         expect(authService.login).toHaveBeenCalled();
  //         })));
});
