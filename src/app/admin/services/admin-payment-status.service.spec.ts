import { TestBed } from '@angular/core/testing';

import { AdminPaymentStatusService } from './admin-payment-status.service';

describe('AdminPaymentStatusService', () => {
  let service: AdminPaymentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPaymentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
