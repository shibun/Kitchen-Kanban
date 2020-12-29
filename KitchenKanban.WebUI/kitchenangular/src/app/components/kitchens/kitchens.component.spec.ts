import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { KitchenService } from '../../services/kitchen.service';
import { MessageService } from '../../services/message.service';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';

import { KitchensComponent } from './kitchens.component';

describe('KitchensComponent', () => {
  let component: KitchensComponent;
  let fixture: ComponentFixture<KitchensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchensComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call kitchenService.getKitchens() on ngOnInit', fakeAsync(() => {
    const fixture = TestBed.createComponent(KitchensComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(KitchenService);
    let spy_getItems = spyOn(service,"getKitchens").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);
    expect(service.getKitchens).toHaveBeenCalled();
    flush();
  }));
  
  it('should show add kitchen popup on add click', fakeAsync(() => {
    const fixture = TestBed.createComponent(KitchensComponent);
    const component = fixture.debugElement.componentInstance;
    component.showAddForm();
    tick(100);
    expect(component.showPopup).toBeTrue();
    flush();
  }));
  
  it('should not call kitchenService.addKitchen() if mandatory fields are not entered', fakeAsync(() => {
    const fixture = TestBed.createComponent(KitchensComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(MessageService);
    let spy_getItems = spyOn(service,"showErrorMessage").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.saveKitchen();
    tick(100);
    expect(service.showErrorMessage).toHaveBeenCalled();
    flush();
  }));
  
  it('should call kitchenService.addKitchen() if mandatory fields are entered', fakeAsync(() => {
    const fixture = TestBed.createComponent(KitchensComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(KitchenService);
    let spy_getItems = spyOn(service,"addKitchen").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.record.counterNumber = "Test Counter";
    component.saveKitchen();
    tick(100);
    expect(service.addKitchen).toHaveBeenCalled();
    flush();
  }));
  
  it('should call kitchenService.updateKitchen() if mandatory fields are entered', fakeAsync(() => {
    const fixture = TestBed.createComponent(KitchensComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(KitchenService);
    let spy_getItems = spyOn(service,"updateKitchen").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.record.kitchenId = "04869ef4-4924-11eb-b378-0242ac130002";
    component.record.counterNumber = "Test Counter";
    component.saveKitchen();
    tick(100);
    expect(service.updateKitchen).toHaveBeenCalled();
    flush();
  }));
});
