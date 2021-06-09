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
    private router: Router) { 
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

  goCategories() {
    this.router.navigate(['backoffice', 'backoffice-categories']);
  }

  goProviders() {
    this.router.navigate(['backoffice', 'providers-admin']);
  }


  
  applyFilterProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();
  }

  addProduct() {
    this.router.navigate(['backoffice', 'product', this.shop$.id, 0]);
  }

  editProduct(prod: ProductDTO) {
    this.router.navigate(['backoffice', 'product', this.shop$.id, prod.Id]);
  }

  deleteProduct(prod: ProductDTO) {
    // const deleteDialog = this.dialog.open(DeleteDialogComponent, {
    //   data: { model: row.userName, text: 'usuario' }
    // });

    // deleteDialog.afterClosed().subscribe(result => {
    //   if(result) {
    //     this.store.dispatch(AdminAction.deleteUser({ userId: row.id }));    
    //   }     
    // });
  }
}
