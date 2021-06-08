import { TestBed } from '@angular/core/testing';

import { AdminShopService } from './admin-shop.service';

describe('AdminShopService', () => {
  let service: AdminShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
