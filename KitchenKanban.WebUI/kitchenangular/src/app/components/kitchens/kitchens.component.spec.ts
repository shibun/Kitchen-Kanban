import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
