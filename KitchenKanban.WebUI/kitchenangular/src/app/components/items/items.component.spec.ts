import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { ItemService } from '../../services/item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  }));

  
  it('should show add item popup on add click', fakeAsync(() => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.debugElement.componentInstance;
    component.showAddForm();
    tick(100);
    expect(component.showPopup).toBeTrue();
  }));
});
