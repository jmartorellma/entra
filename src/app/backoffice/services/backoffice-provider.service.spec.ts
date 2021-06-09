import { TestBed } from '@angular/core/testing';

import { BackofficeProviderService } from './backoffice-provider.service';

describe('BackofficeProviderService', () => {
  let service: BackofficeProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackofficeProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
