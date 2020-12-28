import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { ItemService } from '../../services/item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../../services/message.service';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call itemService.getItems() on ngOnInit', fakeAsync(() => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ItemService);
    let spy_getItems = spyOn(service,"getItems").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);
    expect(service.getItems).toHaveBeenCalled();
    flush();
  }));
  
  it('should show add item popup on add click', fakeAsync(() => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.debugElement.componentInstance;
    component.showAddForm();
    tick(100);
    expect(component.showPopup).toBeTrue();
    flush();
  }));
  
  it('should not call itemService.addItem() if mandatory fields are not entered', fakeAsync(() => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(MessageService);
    let spy_getItems = spyOn(service,"showErrorMessage").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.saveItem();
    tick(100);
    expect(service.showErrorMessage).toHaveBeenCalled();
    flush();
  }));
  
  it('should call itemService.addItem() if mandatory fields are entered', fakeAsync(() => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ItemService);
    let spy_getItems = spyOn(service,"addItem").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.record.itemName = "Test Item";
    component.record.itemCharge = 125;
    component.saveItem();
    tick(100);
    expect(service.addItem).toHaveBeenCalled();
    flush();
  }));
  
  it('should call itemService.updateItem() on edit', fakeAsync(() => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ItemService);
    let spy_getItems = spyOn(service,"updateItem").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.record.itemId = "04869ef4-4924-11eb-b378-0242ac130002";
    component.record.itemName = "Test Item";
    component.record.itemCharge = 125;
    component.saveItem();
    tick(100);
    expect(service.updateItem).toHaveBeenCalled();
    flush();
  }));
});
