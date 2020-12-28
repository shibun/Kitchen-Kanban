import { TestBed } from '@angular/core/testing';

import { KitchenService } from './kitchen.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KitchenService', () => {
  let service: KitchenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(KitchenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
