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

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog) { 
      this.displayedProductColumns = ['code', 'name', 'pvp', 'creationDate', 'actions']

      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        if(backoffice !== undefined && backoffice !== null && backoffice.shop != null) {
          this.shop$ = backoffice.shop;
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
    this.router.navigate(['backoffice', this.shop$.id,]);
  }

  // PRODUCTS

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

  // PURCHASES

  // LOCKED

}
