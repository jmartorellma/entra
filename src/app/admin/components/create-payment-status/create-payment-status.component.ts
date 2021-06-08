import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as AdminActions from '../../actions';
import { CreatePaymentStatusModel } from '../../models/createPaymentStatusModel';
import { AdminState } from '../../reducers';

@Component({
  selector: 'app-create-payment-status',
  templateUrl: './create-payment-status.component.html',
  styleUrls: ['./create-payment-status.component.css', '../admin-users/admin-users.component.css']
})
export class CreatePaymentStatusComponent implements OnInit {

  public createModel: CreatePaymentStatusModel | undefined;
  public code: FormControl;
  public name: FormControl;
  public adminState$: AdminState | undefined;
  public createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>) { 

      this.store.select('admin').subscribe(admin => {
        this.adminState$ = admin;               
      }); 

      this.code = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);

      this.createForm = this.fb.group({
        code: this.code,
        name: this.name,
      });
  }

  ngOnInit(): void {
  }

  createPaymentStatus() {
    this.createModel = {
      Code: this.code.value,
      Name: this.name.value,
    };

    this.store.dispatch(AdminActions.createPaymentStatus({paymentStatus: this.createModel}));
  }

  goPayments() {
    this.router.navigate(['admin','payments']);
  }

}
