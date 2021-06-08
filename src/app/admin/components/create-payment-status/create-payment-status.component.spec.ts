import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentStatusComponent } from './create-payment-status.component';

describe('CreatePaymentStatusComponent', () => {
  let component: CreatePaymentStatusComponent;
  let fixture: ComponentFixture<CreatePaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaymentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
