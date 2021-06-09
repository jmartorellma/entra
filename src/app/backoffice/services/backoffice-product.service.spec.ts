import { TestBed } from '@angular/core/testing';

import { BackofficeProductService } from './backoffice-product.service';

describe('BackofficeProductService', () => {
  let service: BackofficeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackofficeProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
