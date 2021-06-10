import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficePaymentMethodsComponent } from './backoffice-payment-methods.component';

describe('BackofficePaymentMethodsComponent', () => {
  let component: BackofficePaymentMethodsComponent;
  let fixture: ComponentFixture<BackofficePaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackofficePaymentMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficePaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
