import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as AdminActions from '../../actions';
import { CreatePurchaseTypeModel } from '../../models/createPurchaseTypeModel';
import { AdminState } from '../../reducers';

@Component({
  selector: 'app-create-purchase-type',
  templateUrl: './create-purchase-type.component.html',
  styleUrls: ['./create-purchase-type.component.css', '../admin-users/admin-users.component.css']
})
export class CreatePurchaseTypeComponent implements OnInit {

  public createModel: CreatePurchaseTypeModel | undefined;
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

      this.code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);

      this.createForm = this.fb.group({
        code: this.code,
        name: this.name,
      });
  }

  ngOnInit(): void {
  }

  createPurchaseType() {
    this.createModel = {
      Code: this.code.value,
      Name: this.name.value,
    };

    this.store.dispatch(AdminActions.createPurchaseType({purchaseType: this.createModel}));
  }

  goPayments() {
    this.router.navigate(['admin','payments']);
  }

}
