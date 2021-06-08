import { TestBed } from '@angular/core/testing';

import { AdminPurchaseTypesService } from './admin-purchase-types.service';

describe('AdminPurchaseTypesService', () => {
  let service: AdminPurchaseTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPurchaseTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
