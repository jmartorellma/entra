import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ShopDTO } from 'src/app/backoffice/models/ShopDTO';
import { UserDTO } from 'src/app/profile/models/userDTO';
import * as AdminAction from '../../actions';
import { EditShopModel } from '../../models/editShopModel';
import { AdminState } from '../../reducers';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css', '../edit-user/edit-user.component.css']
})
export class EditShopComponent implements OnInit {

  public isActive: FormControl = new FormControl;      
  public code: FormControl = new FormControl;          
  public name: FormControl = new FormControl;          
  public phone: FormControl = new FormControl;         
  public email: FormControl = new FormControl;         
  public taxes: FormControl = new FormControl;         
  public minAmountTaxes: FormControl = new FormControl;
  public address: FormControl = new FormControl;       
  public city: FormControl = new FormControl;          
  public web: FormControl = new FormControl;    
  public owner: FormControl = new FormControl; 

  public shop$: ShopDTO;
  public userOwner$: UserDTO | undefined;
  public editForm: FormGroup;
  public adminState$: AdminState | undefined;
  public userShopList$: UserDTO[];
  public filteredUserShopList: UserDTO[];

  constructor(private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) {
      this.userShopList$ = [];
      this.filteredUserShopList = [];
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
       
      this.store.select('admin').subscribe(admin => {
        this.adminState$ = admin;
        if(this.adminState$ !== undefined && this.adminState$.shopList.length > 0) {
          const s = this.adminState$.shopList.find(s => s.id === parseInt(this.route.snapshot.params.id, 10));
          if(s) {
            this.shop$ = s;
            this.userShopList$ = this.adminState$.userList.filter(u => u.role === 'Shop'); 
            this.filteredUserShopList = this.userShopList$;
            this.userOwner$ = this.adminState$.userList.find(u => u.id === s.ownerId);
            // if(this.userOwner$ !== undefined) {
            //   this.owner.setValue(this.userOwner$);
            // }
            this.loadShop();
          } 
        }            
      });
      
      this.loadShop();
      this.editForm = this.fb.group({
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
    this.store.dispatch(AdminAction.loadUsers());
    this.store.dispatch(AdminAction.loadShops());
  }

  loadShop() {
    this.isActive = new FormControl(this.shop$.isActive);
    this.code = new FormControl(this.shop$.code, [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(this.shop$.name, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('[a-zA-Z0-9 áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.phone = new FormControl(this.shop$.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]);
    this.email = new FormControl(this.shop$.email, [Validators.required, Validators.email]);
    this.taxes = new FormControl(this.shop$.taxes, [Validators.required, Validators.min(0)]);
    this.minAmountTaxes = new FormControl(this.shop$.minAmountTaxes, [Validators.required, Validators.min(0)]);
    this.address = new FormControl(this.shop$.address, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
    this.city = new FormControl(this.shop$.city, [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9 áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.web = new FormControl(this.shop$.web);
    this.owner = new FormControl(this.userOwner$);
    this.editForm = this.fb.group({
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

  onKey(event: any) { 
    if(event !== undefined && event.target !== undefined && event.target.value !== undefined )
    this.filteredUserShopList = this.search(event.target.value);
    }
    
  search(value: string) { 
    return this.userShopList$.filter(u => u.userName.toLowerCase().startsWith(value.toLowerCase()));
  }


  editShop() {
    const up: EditShopModel = {
      Id: this.shop$.id,
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
      OwnerId: this.owner.value.id
    }

    this.store.dispatch(AdminAction.updateShop({shop: up}));
  }

  goShops() {
    this.router.navigate(['admin','shops']);
  }

}
