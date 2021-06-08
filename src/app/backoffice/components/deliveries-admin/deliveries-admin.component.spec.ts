import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesAdminComponent } from './deliveries-admin.component';

describe('DeliveriesAdminComponent', () => {
  let component: DeliveriesAdminComponent;
  let fixture: ComponentFixture<DeliveriesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
