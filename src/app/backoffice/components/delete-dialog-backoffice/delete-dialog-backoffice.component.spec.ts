import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogBackofficeComponent } from './delete-dialog-backoffice.component';

describe('DeleteDialogBackofficeComponent', () => {
  let component: DeleteDialogBackofficeComponent;
  let fixture: ComponentFixture<DeleteDialogBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogBackofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
