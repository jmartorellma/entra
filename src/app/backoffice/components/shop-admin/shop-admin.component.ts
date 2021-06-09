import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ShopDTO } from '../../models/ShopDTO';
import * as BackofficeActions from '../../actions';

@Component({
  selector: 'app-shop-admin',
  templateUrl: './shop-admin.component.html',
  styleUrls: ['./shop-admin.component.css']
})
export class ShopAdminComponent implements OnInit {

  public backofficeState$: any;
  public shop$: ShopDTO | any;

  constructor(
    private store: Store<AppState>,
    private router: Router) { 
      let firstLoad = true;
      this.store.select('account').subscribe(account => {
        if(firstLoad && account != undefined && account.userClaims !== undefined) {
          firstLoad = false;
          this.store.dispatch(BackofficeActions.loadShop({ ownerId: parseInt(account.userClaims.sub, 10) })); 
        }   
      });
      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        if(backoffice !== undefined && backoffice !== null && backoffice.shop != null) {
          this.shop$ = backoffice.shop;
        }        
      });
  }

  ngOnInit(): void {
    
  }

  changePicture() {

  }

}
