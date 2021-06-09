import { TestBed } from '@angular/core/testing';

import { BackofficeCategoryService } from './backoffice-category.service';

describe('BackofficeCategoryService', () => {
  let service: BackofficeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackofficeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
