import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentStatusComponent } from './edit-payment-status.component';

describe('EditPaymentStatusComponent', () => {
  let component: EditPaymentStatusComponent;
  let fixture: ComponentFixture<EditPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaymentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
