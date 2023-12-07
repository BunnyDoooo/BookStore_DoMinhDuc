import { TestBed } from '@angular/core/testing';

import { CartdataService } from './cartdata.service';

describe('CartdataService', () => {
  let service: CartdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
