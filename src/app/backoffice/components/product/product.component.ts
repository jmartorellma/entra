import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProductDTO } from '../../models/productDTO';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public code: FormControl = new FormControl;          
  public name: FormControl = new FormControl;          
  public description: FormControl = new FormControl;         
  public isActive: FormControl = new FormControl;         
  public price: FormControl = new FormControl;         
  public minAmountTaxes: FormControl = new FormControl;
  public tax: FormControl = new FormControl;       
  public pvp: FormControl = new FormControl;  
  public stock: FormControl = new FormControl;          
  public picture: FormControl = new FormControl;  
  public provider: FormControl = new FormControl; 
  public categories: FormControl = new FormControl; 

  public product$: ProductDTO;
  public editForm: FormGroup;
  public backofficeState$: BackofficeState | undefined;
  public isEdit: boolean;
  public shopId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) {
      
      this.product$ = {
        id:  0, 
        code: '', 
        name: '', 
        description:'',      
        isActive: false,
        price: 0,       
        tax: 0,      
        pvp: 0,         
        picture: '',     
        creationDate: '',     
        shopId: 0,       
        shopName: '',  
        providerId: 0,  
        categories: [],     
        stock: 0
      }  

      this.shopId = parseInt(this.route.snapshot.params.shopId, 10);
      this.isEdit = false;     

      if(parseInt(this.route.snapshot.params.id, 10) != 0) {
        this.isEdit = true;

        this.store.select('backoffice').subscribe(backoffice => {
          this.backofficeState$ = backoffice;
          if(backoffice !== undefined && backoffice !== null && backoffice.productList != null) {
            const p = backoffice.productList.find(p => p.id === parseInt(this.route.snapshot.params.id, 10));
            if(p) {
              this.product$ = p;
              this.loadProduct();
            }
          }        
        });
      }
      
      this.loadProduct();
        this.editForm = this.fb.group({
          code: this.code,
          name: this.name,
          description: this.description,
          isActive: this.isActive,
          price: this.price,
          tax: this.tax,
          pvp: this.pvp,
          provider: this.provider,
          categories: this.categories,
          stock: this.stock
        });
   }

   loadProduct() {
    this.code = new FormControl(this.product$.code, [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(this.product$.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern('[a-zA-Z0-9 áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.description = new FormControl(this.product$.description, [Validators.required, Validators.minLength(9), Validators.maxLength(255), Validators.pattern('[a-zA-Z0-9 áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.isActive = new FormControl(this.product$.isActive);
    this.price = new FormControl(this.product$.price, [Validators.required, Validators.min(0)]);
    this.tax = new FormControl(this.product$.tax, [Validators.required, Validators.min(0)]);
    this.pvp = new FormControl(this.product$.pvp, [Validators.required, Validators.min(0)]);
    this.provider = new FormControl(this.product$.providerId, [Validators.required]);
    this.categories = new FormControl(this.product$.categories, [Validators.required]);
    this.stock = new FormControl(this.product$.stock, [Validators.required, Validators.min(0)]);

    this.editForm = this.fb.group({
      code: this.code,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      price: this.price,
      tax: this.tax,
      pvp: this.pvp,
      provider: this.provider,
      categories: this.categories,
      stock: this.stock
    });
  }

  ngOnInit(): void {
    // Dispatch categories
    // Dispatch providers
    if(parseInt(this.route.snapshot.params.id, 10) != 0) {
      this.store.dispatch(BackofficeActions.loadProduct({id: parseInt(this.route.snapshot.params.id, 10)}));
    }
  }

  goShop() {
    this.router.navigate(['backoffice','shop-admin']);
  }

}
