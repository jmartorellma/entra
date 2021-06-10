import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { PaymentMethodDTO } from '../../models/paymentMethodDTO';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';
import { EditPaymentMethodModel } from '../../models/editPaymentMethodModel';
import { CreatePaymentMethodModel } from '../../models/createPaymentMethodModel';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  
  public code: FormControl;
  public name: FormControl;
  public value: FormControl;
  public backofficeState$: BackofficeState | undefined;
  public editForm: FormGroup;
  public paymentMethod: PaymentMethodDTO | undefined; 
  public isUpdate: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) { 

      this.isUpdate = false;
      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;  
        if(parseInt(this.route.snapshot.params.id, 10) != 0 && backoffice !== undefined) {
          const p = backoffice.paymentMethodList.find(p => p.id == parseInt(this.route.snapshot.params.id, 10))
          if(p){
            this.isUpdate = true;
            this.paymentMethod = p;
            this.loadPaymentMethod(p);
          }
        }             
      }); 

      this.code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
      this.value = new FormControl('', [Validators.required]);

      this.editForm = this.fb.group({
        code: this.code,
        name: this.name,
        value: this.value
      });
  }

  loadPaymentMethod(p: PaymentMethodDTO) {
    this.code = new FormControl(p.code, [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(p.name, [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.value = new FormControl('', [Validators.required]);

    this.editForm = this.fb.group({
      code: this.code,
      name: this.name,
      value: this.value
    });
  }

  ngOnInit(): void {
    if(parseInt(this.route.snapshot.params.id, 10) != 0) {
      this.store.dispatch(BackofficeActions.loadPaymentMethods());
    }
  }

  editPaymentMethod() {
    if(this.isUpdate && this.paymentMethod !== undefined) {
      const editModel: EditPaymentMethodModel = {
        Id: this.paymentMethod.id,
        Code: this.code.value,
        Name: this.name.value,
        Value: this.value.value
      };
      this.store.dispatch(BackofficeActions.updatePaymentMethod({paymentMethod: editModel}));
    } else { 
      const createModel: CreatePaymentMethodModel = {
        Code: this.code.value,
        Name: this.name.value,
        Value: this.value.value
      };
      this.store.dispatch(BackofficeActions.createPaymentMethod({paymentMethod: createModel}));
    }
  }

  goPaymentMethods() {
    this.router.navigate(['backoffice','backoffice-payment-methods']);
  }

}
