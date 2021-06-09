import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeProvidersComponent } from './backoffice-providers.component';

describe('BackofficeProvidersComponent', () => {
  let component: BackofficeProvidersComponent;
  let fixture: ComponentFixture<BackofficeProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackofficeProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
