import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ShopDTO } from '../../models/ShopDTO';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';
import { EditShopBackofficeModel } from '../../models/editShopBackofficeModel';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css']
})
export class EditShopComponent implements OnInit {
    
  public code: FormControl = new FormControl;          
  public name: FormControl = new FormControl;          
  public phone: FormControl = new FormControl;         
  public email: FormControl = new FormControl;         
  public taxes: FormControl = new FormControl;         
  public minAmountTaxes: FormControl = new FormControl;
  public address: FormControl = new FormControl;       
  public city: FormControl = new FormControl;          
  public web: FormControl = new FormControl;    

  public shop$: ShopDTO;
  public editForm: FormGroup;
  public backofficeState$: BackofficeState | undefined;

  constructor(private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) {
      this.shop$ = {
        id:  0, 
        nif: '', 
        name: '', 
        isActive: false,    
        code: '',  
        phone: '',       
        email: '',      
        taxes: 0,         
        minAmountTaxes: 0,     
        address: '',     
        city: '',       
        picture: '',    
        web: '',     
        owner: '',  
        ownerId: 0,     
        creationDate: '' 
      }  

      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        if(backoffice !== undefined && backoffice !== null && backoffice.shop != null) {
          this.shop$ = backoffice.shop;
          this.loadShop();
        }        
      });
            
      this.loadShop();
      this.editForm = this.fb.group({
        code: this.code,
        name: this.name,
        phone: this.phone,
        email: this.email,
        taxes: this.taxes,
        minAmountTaxes: this.minAmountTaxes,
        address: this.address,
        city: this.city,
        web: this.web
    });
   }

  ngOnInit(): void {
    this.store.dispatch(BackofficeActions.loadShopById({id: parseInt(this.route.snapshot.params.id, 10)}));
  }

  loadShop() {
    this.code = new FormControl(this.shop$.code, [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(this.shop$.name, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('[a-zA-Z0-9 áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.phone = new FormControl(this.shop$.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]);
    this.email = new FormControl(this.shop$.email, [Validators.required, Validators.email]);
    this.taxes = new FormControl(this.shop$.taxes, [Validators.required, Validators.min(0)]);
    this.minAmountTaxes = new FormControl(this.shop$.minAmountTaxes, [Validators.required, Validators.min(0)]);
    this.address = new FormControl(this.shop$.address, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
    this.city = new FormControl(this.shop$.city, [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9 áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.web = new FormControl(this.shop$.web);
    this.editForm = this.fb.group({
      code: this.code,
      name: this.name,
      phone: this.phone,
      email: this.email,
      taxes: this.taxes,
      minAmountTaxes: this.minAmountTaxes,
      address: this.address,
      city: this.city,
      web: this.web,
    });
  }

  editShop() {
    const up: EditShopBackofficeModel = {
      Id: this.shop$.id,
      IsActive: this.shop$.isActive,
      Code: this.code.value,
      Name: this.name.value,
      Phone: this.phone.value,
      Email: this.email.value,
      Taxes: this.taxes.value,
      MinAmountTaxes: this.minAmountTaxes.value,
      Address: this.address.value,
      City: this.city.value,
      Web: this.web.value,
      OwnerId: this.shop$.ownerId,
    }

    this.store.dispatch(BackofficeActions.updateShop({shop: up}));
  }

  goShop() {
    this.router.navigate(['backoffice','shop-admin']);
  }

}
