import { async, ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';

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
          [{ path: 'login', component: LoginComponent },
          { path: 'dashboard', component: DashboardComponent }]
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form validation', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;    
    // component.loginInput.userName = "admin";
    // component.loginInput.password = "123456";
    component.signIn();
    tick(100);
    expect(component.isFormValid).toBeFalse();
  }));

  it('signIn() to be called along with authService.login()', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(AuthService);
    component.loginInput.userName = "admin";
    component.loginInput.password = "123456";
    let spy_login = spyOn(service,"login").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.signIn();
    tick(100);
    expect(service.login).toHaveBeenCalled();
  }));
});
