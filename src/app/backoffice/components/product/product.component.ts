import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProductDTO } from '../../models/productDTO';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';
import { CategoryDTO } from '../../models/CategoryDTO';
import { ProviderDTO } from '../../models/ProviderDTO';
import { EditProductModel } from '../../models/editProductModel';
import { CreateProductModel } from '../../models/createProductModel';
import { AppConfiguration } from 'read-appsettings-json';
import { EditProductPictureModel } from '../../models/editProductPictureModel';

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

  public categoryList$: CategoryDTO[];
  public providerList$: ProviderDTO[];
  public filteredCategoryList: CategoryDTO[];
  public filteredProviderList: ProviderDTO[];
  public product$: ProductDTO;
  public editForm: FormGroup;
  public backofficeState$: BackofficeState | undefined;
  public isUpdate: boolean;
  public shopId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) {
      this.categoryList$ = [];
      this.providerList$ = [];
      this.filteredCategoryList = [];
      this.filteredProviderList = [];
      this.product$ = {
        id:  0, 
        code: '', 
        name: '', 
        description:'',      
        isActive: true,
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
      this.isUpdate = false;     

      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        this.categoryList$ = backoffice.categoryList;
        this.filteredCategoryList = this.categoryList$;
        this.providerList$ = backoffice.providerList;
        this.filteredProviderList = this.providerList$;
        if(parseInt(this.route.snapshot.params.id, 10) != 0) {          
          if(!this.isUpdate) {
            this.isUpdate = true;
            this.store.dispatch(BackofficeActions.loadShopProducts({shopId: this.route.snapshot.params.shopId})) 
          }
          if(backoffice !== undefined && backoffice !== null && backoffice.productList != null) {
            const p = backoffice.productList.find(p => p.id === parseInt(this.route.snapshot.params.id, 10));
            if(p) {
              const prov = backoffice.providerList.find(pr => pr.id === p.providerId);
              if(prov) {
                this.product$ = p;
                const selectedCategories = backoffice.categoryList.filter(c => this.product$.categories.includes(c.id));
                this.loadProduct(prov, selectedCategories);
              }              
            }
          }           
        }               
      });

      this.loadProduct(null, [])
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

   loadProduct(provider: ProviderDTO | null, selectedCategories: CategoryDTO[]) {
    this.code = new FormControl(this.product$.code, [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(this.product$.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern('[a-zA-Z0-9 ????????????????????????????]*')]);
    this.description = new FormControl(this.product$.description, [Validators.required, Validators.minLength(9), Validators.maxLength(255), Validators.pattern('[a-zA-Z0-9 ????????????????????????????]*')]);
    this.isActive = new FormControl(this.product$.isActive);
    this.price = new FormControl(this.product$.price, [Validators.required, Validators.min(0)]);
    this.tax = new FormControl(this.product$.tax, [Validators.required, Validators.min(0)]);
    this.pvp = new FormControl(this.product$.pvp, [Validators.required, Validators.min(0)]);
    this.provider = new FormControl(provider, [Validators.required]);
    this.categories = new FormControl(selectedCategories, [Validators.required]);
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
    this.store.dispatch(BackofficeActions.loadCategories());
    this.store.dispatch(BackofficeActions.loadProviders());
    if(parseInt(this.route.snapshot.params.id, 10) != 0) {
      this.store.dispatch(BackofficeActions.loadProduct({id: parseInt(this.route.snapshot.params.id, 10)}));
    }
  }

  onKeyCategory(event: any) { 
    if(event !== undefined && event.target !== undefined && event.target.value !== undefined )
    this.filteredCategoryList = this.searchCategory(event.target.value);
    }
    
  searchCategory(value: string) { 
    return this.categoryList$.filter(c => c.name.toLowerCase().startsWith(value.toLowerCase()));
  }

  onKeyProvider(event: any) { 
    if(event !== undefined && event.target !== undefined && event.target.value !== undefined )
    this.filteredProviderList = this.searchProvider(event.target.value);
    }
    
  searchProvider(value: string) { 
    return this.providerList$.filter(p => p.name.toLowerCase().startsWith(value.toLowerCase()));
  }

  public getImgPath = (serverPath: string) => {
    return `${AppConfiguration.Setting().apiEndpoint}/${serverPath}`;
  }

  public uploadFile = (files: FileList | null) => {
    if (files === null || files.length === 0) {
      return;
    }
    const pictureModel: EditProductPictureModel = {
      id: this.product$.id,             
      file: <File>files[0]      
    }
    this.store.dispatch(BackofficeActions.uploadProductPicture({ editProductPictureModel: pictureModel })); 
  }

  editProduct() {
    if(this.isUpdate && this.product$ !== undefined) {
      const editModel: EditProductModel = {
        Id: this.product$.id,
        Code: this.code.value,
        Name: this.name.value,
        Description: this.description.value,
        IsActive: this.isActive.value,
        Price: this.price.value,
        Tax: this.tax.value,
        Pvp: this.pvp.value,
        CategoryIdList: this.categories.value.map((c: CategoryDTO) => c.id),
        Stock: this.stock.value
      };
      this.store.dispatch(BackofficeActions.updateProduct({product: editModel}));
    } else { 
      const createModel: CreateProductModel = {
        Code: this.code.value,
        Name: this.name.value,
        Description: this.description.value,
        IsActive: this.isActive.value,
        Price: this.price.value,
        Tax: this.tax.value,
        Pvp: this.pvp.value,
        ShopId: this.shopId,
        ProviderId: this.provider.value.id,
        CategoryIdList: this.categories.value.map((c: CategoryDTO) => c.id),
        Stock: this.stock.value
      };
      this.store.dispatch(BackofficeActions.createProduct({product: createModel}));
    }
  }

  goShop() {
    this.router.navigate(['backoffice','shop-admin']);
  }

}
