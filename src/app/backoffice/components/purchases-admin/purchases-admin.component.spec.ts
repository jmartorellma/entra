import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesAdminComponent } from './purchases-admin.component';

describe('PurchasesAdminComponent', () => {
  let component: PurchasesAdminComponent;
  let fixture: ComponentFixture<PurchasesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
