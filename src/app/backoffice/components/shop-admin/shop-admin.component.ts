import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ShopDTO } from '../../models/ShopDTO';
import * as BackofficeActions from '../../actions';
import { EditShopPictureModel } from '../../models/edtiShopPictureModel';
import { AppConfiguration } from 'read-appsettings-json';
import { ProductDTO } from '../../models/productDTO';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogBackofficeComponent } from '../delete-dialog-backoffice/delete-dialog-backoffice.component';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseDTO } from '../../models/purchaseDTO';

@Component({
  selector: 'app-shop-admin',
  templateUrl: './shop-admin.component.html',
  styleUrls: ['./shop-admin.component.css']
})
export class ShopAdminComponent implements OnInit {

  public backofficeState$: any;
  public shop$: ShopDTO | any;
  public productList: ProductDTO[] | any;
  public dataSourceProducts: any;
  public displayedProductColumns: string[];
  public dataSourcePurchases: any;
  public displayedPurchasesColumns: string[];
  public dataSourceUsers: any;
  public displayedUsersColumns: string[];
  public productsLoaded: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog) { 
      this.displayedProductColumns = ['code', 'name', 'pvp', 'creationDate', 'actions'];
      this.displayedPurchasesColumns = ['code', 'amount', 'userName', 'status', 'actions'];
      this.displayedUsersColumns = ['userName', 'email', 'phoneNumber', 'actions'];
      this.productsLoaded = false;

      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        if(backoffice !== undefined && backoffice !== null && backoffice.shop != null) {
          this.shop$ = backoffice.shop;
          if(!this.productsLoaded) {
            this.productsLoaded = true;
            this.store.dispatch(BackofficeActions.loadShopProducts({shopId: this.shop$.id})) 
          }
        }  
        if(backoffice !== undefined && backoffice !== null && backoffice.productList != null) {
          this.productList = backoffice.productList;
          this.dataSourceProducts = new MatTableDataSource(this.productList);
        }        
      });
  }

  ngOnInit(): void {
    this.store.select('account').subscribe(account => {
      if(account != undefined && account.userClaims !== undefined) {
        this.store.dispatch(BackofficeActions.loadShop({ ownerId: parseInt(account.userClaims.sub, 10) })); 
      }   
    });
    this.dataSourceProducts = new MatTableDataSource(this.productList);
  }

  // SHOP

  public getImgPath = (serverPath: string) => {
    return `${AppConfiguration.Setting().apiEndpoint}/${serverPath}`;
  }

  public uploadFile = (files: FileList | null) => {
    if (files === null || files.length === 0) {
      return;
    }
    const pictureModel: EditShopPictureModel = {
      id: this.shop$.id,             
      file: <File>files[0]      
    }
    this.store.dispatch(BackofficeActions.uploadShopPicture({ editShopPictureModel: pictureModel })); 
  }

  editShop() {
    this.router.navigate(['backoffice','shop', this.shop$.id,]);
  }

  // PRODUCTS TAB

  goCategories() {
    this.router.navigate(['backoffice', 'backoffice-categories']);
  }

  goProviders() {
    this.router.navigate(['backoffice', 'backoffice-providers']);
  }
  
  applyFilterProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();
  }

  addProduct() {
    this.router.navigate(['backoffice', 'product', this.shop$.id, 0]);
  }

  editProduct(prod: ProductDTO) {
    this.router.navigate(['backoffice', 'product', this.shop$.id, prod.id]);
  }

  deleteProduct(row: ProductDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogBackofficeComponent, {
      data: { model: row.name, text: 'producto' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(BackofficeActions.deleteProduct({ id: row.id }));    
      }     
    });
  }

  // PURCHASES TAB

  goPaymentMethods() {
    this.router.navigate(['backoffice', 'backoffice-payment-methods']);
  }

  goDeliveries() {
    // this.router.navigate(['backoffice', 'backoffice-deliveries']);
  }

  applyFilterPurchase(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePurchases.filter = filterValue.trim().toLowerCase();
  }

  editPurchase(row: PurchaseDTO) {
    // this.router.navigate(['backoffice', 'purchase']);
  }

  deletePurchase(row: PurchaseDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogBackofficeComponent, {
      data: { model: row.code, text: 'pedido' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(BackofficeActions.deleteProduct({ id: row.id }));    
      }     
    });
  }

  // LOCKED TAB

  applyFilterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePurchases.filter = filterValue.trim().toLowerCase();
  }

  lockUser(row: PurchaseDTO){
    // TODO
  }

  unLockUser(id: number){
    // TODO
  }
}
