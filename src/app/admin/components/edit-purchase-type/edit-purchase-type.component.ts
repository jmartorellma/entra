import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { EditPurchaseTypeModel } from '../../models/editPurchaseTypeModel';
import { PurchaseTypeDTO } from '../../models/PurchaseTypeDTO';
import { AdminState } from '../../reducers';
import * as AdminAction from '../../actions';

@Component({
  selector: 'app-edit-purchase-type',
  templateUrl: './edit-purchase-type.component.html',
  styleUrls: ['./edit-purchase-type.component.css']
})
export class EditPurchaseTypeComponent implements OnInit {

  public updateModel: EditPurchaseTypeModel | undefined;
  public code: FormControl;
  public name: FormControl;
  public adminState$: AdminState | undefined;
  public updateForm: FormGroup;
  public purchaseType$: PurchaseTypeDTO;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) { 

      this.purchaseType$ = {
        id: 0,
        code: '',
        name: '',
        creationDate: ''
      };

      this.store.select('admin').subscribe(admin => {
        this.adminState$ = admin;   
        if(this.adminState$ !== undefined && this.adminState$.purchaseTypeList.length > 0) {
          const p = this.adminState$.purchaseTypeList.find(p => p.id === parseInt(this.route.snapshot.params.id, 10));
          if(p) {
            this.purchaseType$ = p;
            this.loadPurchaseType();
          } 
        }              
      }); 

      this.code = new FormControl(this.purchaseType$.code, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl(this.purchaseType$.name, [Validators.required, Validators.minLength(2), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
      this.updateForm = this.fb.group({
        code: this.code,
        name: this.name
      });
  }

  ngOnInit(): void {
    this.store.dispatch(AdminAction.loadPurchaseTypes());
  }

  loadPurchaseType() {
    this.code = new FormControl(this.purchaseType$.code, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(this.purchaseType$.name, [Validators.required, Validators.minLength(2), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.updateForm = this.fb.group({
      code: this.code,
      name: this.name
    });
  }

  updatePurchaseType() {
    this.updateModel = {
      Id: this.purchaseType$.id,
      Code: this.code.value,
      Name: this.name.value,
    };

    this.store.dispatch(AdminAction.updatePurchaseType({purchaseType: this.updateModel}));
  }

  goPayments() {
    this.router.navigate(['admin','payments']);
  }

}
