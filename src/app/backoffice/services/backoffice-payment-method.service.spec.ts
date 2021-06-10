import { TestBed } from '@angular/core/testing';

import { BackofficePaymentMethodService } from './backoffice-payment-method.service';

describe('BackofficePaymentMethodService', () => {
  let service: BackofficePaymentMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackofficePaymentMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
