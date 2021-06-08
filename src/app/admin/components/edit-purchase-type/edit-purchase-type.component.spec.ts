import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseTypeComponent } from './edit-purchase-type.component';

describe('EditPurchaseTypeComponent', () => {
  let component: EditPurchaseTypeComponent;
  let fixture: ComponentFixture<EditPurchaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPurchaseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPurchaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
