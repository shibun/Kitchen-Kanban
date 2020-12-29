import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MessageService } from '../../services/message.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call userService.getUsers() on ngOnInit', fakeAsync(() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(UserService);
    let spy_getItems = spyOn(service,"getUsers").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);
    expect(service.getUsers).toHaveBeenCalled();
    flush();
  }));
  
  it('should show add user popup on add click', fakeAsync(() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.debugElement.componentInstance;
    component.showAddUserForm();
    tick(100);
    expect(component.isNewUser).toBeTrue();
    flush();
  }));
  
  it('should not call userService.addUser() if mandatory fields are not entered', fakeAsync(() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(MessageService);
    let spy_getItems = spyOn(service,"showErrorMessage").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.saveUser();
    tick(100);
    expect(service.showErrorMessage).toHaveBeenCalled();
    flush();
  }));
  
  it('should call userService.addUser() if mandatory fields are entered', fakeAsync(() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(UserService);
    let spy_getItems = spyOn(service,"addUser").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.user.firstName = "Admin";
    component.user.lastName = "User";
    component.user.userName = "useradmin";
    component.user.password = "123456";
    component.user.userType = 1;
    component.saveUser();
    tick(100);
    expect(service.addUser).toHaveBeenCalled();
    flush();
  }));
  
  it('should call userService.updateUser() if mandatory fields are entered', fakeAsync(() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(UserService);
    let spy_getItems = spyOn(service,"updateUser").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.user.userId = "04869ef4-4924-11eb-b378-0242ac130002";
    component.user.firstName = "Admin";
    component.user.lastName = "User";
    component.user.userName = "useradmin";
    component.user.password = "123456";
    component.user.userType = 1;
    component.saveUser();
    tick(100);
    expect(service.updateUser).toHaveBeenCalled();
    flush();
  }));
});
