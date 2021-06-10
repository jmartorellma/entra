import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountState } from 'src/app/account/reducers';
import { AppState } from 'src/app/app.reducer';
import * as AccountActions from '../../../account/actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public accountState$: AccountState | undefined;
  public currentYear: string;
  
  constructor(private store: Store<AppState>,
    private router: Router) { 
    this.currentYear = '';
    this.store.select('account').subscribe(account => 
      this.accountState$ = account
    );
  }

  ngOnInit(): void {
    this.getCurrentYear();
  }

  getCurrentYear(): void {
    // Se actualiza en el footer el año actual
    this.currentYear = new Date().getFullYear().toString();
  }

  goHome(): void {
    this.router.navigate(['shop','home']);
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

