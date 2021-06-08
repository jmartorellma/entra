import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { EditPaymentStatusModel } from '../../models/editPaymentStatusModel';
import { PaymentStatusDTO } from '../../models/PaymentStatusDTO';
import { AdminState } from '../../reducers';
import * as AdminAction from '../../actions';

@Component({
  selector: 'app-edit-payment-status',
  templateUrl: './edit-payment-status.component.html',
  styleUrls: ['./edit-payment-status.component.css']
})
export class EditPaymentStatusComponent implements OnInit {

  public updateModel: EditPaymentStatusModel | undefined;
  public code: FormControl;
  public name: FormControl;
  public adminState$: AdminState | undefined;
  public updateForm: FormGroup;
  public paymentStatus$: PaymentStatusDTO;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) { 

      this.paymentStatus$ = {
        id: 0,
        code: '',
        name: '',
        creationDate: ''
      };

      this.store.select('admin').subscribe(admin => {
        this.adminState$ = admin;   
        if(this.adminState$ !== undefined && this.adminState$.paymentStatusList.length > 0) {
          const p = this.adminState$.paymentStatusList.find(p => p.id === parseInt(this.route.snapshot.params.id, 10));
          if(p) {
            this.paymentStatus$ = p;
            this.loadPaymentStatus();
          } 
        }              
      }); 

      this.code = new FormControl(this.paymentStatus$.code, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl(this.paymentStatus$.name, [Validators.required, Validators.minLength(2), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
      this.updateForm = this.fb.group({
        code: this.code,
        name: this.name
      });
  }

  ngOnInit(): void {
    this.store.dispatch(AdminAction.loadPaymentStatus());
  }

  loadPaymentStatus() {
    this.code = new FormControl(this.paymentStatus$.code, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(this.paymentStatus$.name, [Validators.required, Validators.minLength(2), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.updateForm = this.fb.group({
      code: this.code,
      name: this.name
    });
  }

  updatePaymentStatus() {
    this.updateModel = {
      Id: this.paymentStatus$.id,
      Code: this.code.value,
      Name: this.name.value,
    };

    this.store.dispatch(AdminAction.updatePaymentStatus({paymentStatus: this.updateModel}));
  }

  goPayments() {
    this.router.navigate(['admin','payments']);
  }

}
