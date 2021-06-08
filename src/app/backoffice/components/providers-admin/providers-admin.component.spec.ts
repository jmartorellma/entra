import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersAdminComponent } from './providers-admin.component';

describe('ProvidersAdminComponent', () => {
  let component: ProvidersAdminComponent;
  let fixture: ComponentFixture<ProvidersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
