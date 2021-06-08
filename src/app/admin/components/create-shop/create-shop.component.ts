import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { UserDTO } from 'src/app/profile/models/userDTO';
import { CreateShopModel } from '../../models/createShopModel';
import { AdminState } from '../../reducers';
import * as AdminActions from '../../actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css', '../edit-user/edit-user.component.css']
})
export class CreateShopComponent implements OnInit {

  public adminState$: AdminState | undefined;
  public userShopList$: UserDTO[];

    public nif: FormControl;
    public isActive: FormControl;      
    public code: FormControl;          
    public name: FormControl;          
    public phone: FormControl;         
    public email: FormControl;         
    public taxes: FormControl;         
    public minAmountTaxes: FormControl;
    public address: FormControl;       
    public city: FormControl;          
    public web: FormControl;    
    public owner: FormControl; 
    public createForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>) { 
      this.userShopList$ = [];
      let reload = false;
      this.store.select('admin').subscribe(account => {
        this.adminState$ = account;
        if(!reload && (this.adminState$.userList === null || this.adminState$.userList.length === 0)) {
          reload = true;
          this.store.dispatch(AdminActions.loadUsers());          
        }
        else {
          this.userShopList$ = account.userList.filter(u => u.role === 'Shop')
        }       
      });

      this.nif = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
      this.isActive = new FormControl(true);
      this.code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('[a-zA-Z0-9 áéíóúÁÉÍÓÚÑñÇç]*')]);
      this.phone = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]);
      this.email = new FormControl('', [Validators.required, Validators.email]);
      this.taxes = new FormControl(0, [Validators.required, Validators.min(0)]);
      this.minAmountTaxes = new FormControl(0, [Validators.required, Validators.min(0)]);
      this.address = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
      this.city = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9 áéíóúÁÉÍÓÚÑñÇç]*')]);
      this.web = new FormControl('');
      this.owner = new FormControl('');

      this.createForm = this.fb.group({
        nif: this.nif,
        isActive: this.isActive,
        code: this.code,
        name: this.name,
        phone: this.phone,
        email: this.email,
        taxes: this.taxes,
        minAmountTaxes: this.minAmountTaxes,
        address: this.address,
        city: this.city,
        web: this.web,
        owner: this.owner
      });
    }

  ngOnInit(): void {
  }

  createShop() {
    const createModel: CreateShopModel = {
      Nif: this.nif.value,
      IsActive: this.isActive.value,
      Code: this.code.value,
      Name: this.name.value,
      Phone: this.phone.value,
      Email: this.email.value,
      Taxes: this.taxes.value,
      MinAmountTaxes: this.minAmountTaxes.value,
      Address: this.address.value,
      City: this.city.value,
      Web: this.web.value,
      Picture: '',
      OwnerId: this.owner.value.id
    };

    this.store.dispatch(AdminActions.createShop({shop: createModel}));
  }

  goShops() {
    this.router.navigate(['admin','shops']);
  }

}
