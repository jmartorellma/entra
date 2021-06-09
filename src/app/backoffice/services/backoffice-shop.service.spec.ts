import { TestBed } from '@angular/core/testing';

import { BackofficeShopService } from './backoffice-shop.service';

describe('BackofficeService', () => {
  let service: BackofficeShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackofficeShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
