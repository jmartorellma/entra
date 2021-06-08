import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseTypeComponent } from './create-purchase-type.component';

describe('CreatePurchaseTypeComponent', () => {
  let component: CreatePurchaseTypeComponent;
  let fixture: ComponentFixture<CreatePurchaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePurchaseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
