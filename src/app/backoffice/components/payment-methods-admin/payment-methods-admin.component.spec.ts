import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsAdminComponent } from './payment-methods-admin.component';

describe('PaymentMethodsAdminComponent', () => {
  let component: PaymentMethodsAdminComponent;
  let fixture: ComponentFixture<PaymentMethodsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
