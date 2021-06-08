import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountState } from 'src/app/account/reducers';
import { AppState } from 'src/app/app.reducer';
import * as AccountActions from '../../../account/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public accountState$: AccountState | undefined;
  //public profileState$: ProfileState | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router) 
    { 
      this.store.select('account').subscribe(account => 
        this.accountState$ = account
      );
    }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['shop','home']);
  }

  goAdmin() {
    this.router.navigate(['admin','users']);
  }

  goShopAdmin() {
    this.router.navigate(['backoffice','shop-admin']);
  }

  goProducts() {

  }

  goShops() {
    
  }

  goSearch() {
    
  }

  goCart() {
    
  }

  goProfile() {
    if(this.accountState$ !== undefined && this.accountState$.loggedIn) {
      this.router.navigate(['profiles','profile']);
    }
    else {
      this.router.navigate(['accounts','login']);
    }    
  }

  logout() {
    if(this.accountState$ !== undefined && this.accountState$.loggedIn) {
      this.store.dispatch(AccountActions.logout());  
    }    
  }

}
