import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AccountActions from './account/actions';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs/operators';
import { AppState } from './app.reducer';
import { AccountState } from './account/reducers';
import { UserModel } from './profile/models/userModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   private userData: UserModel | undefined; 

  constructor(
    private store: Store<AppState>,
    private oidcSecurityService: OidcSecurityService,
    private router: Router) {
      this.oidcSecurityService.userData$.subscribe((data) =>
        this.userData = data 
      );
    }

  ngOnInit() {
    this.oidcSecurityService
    .checkAuth()
    .subscribe((isAuthenticated) => {
      console.log('app authenticated', isAuthenticated);
      if(isAuthenticated && localStorage.getItem('loggedCurrentSession') !== null) {
        localStorage.removeItem('loggedCurrentSession');
        this.store.dispatch(AccountActions.loginSuccess({username: this.userData?.userName})); 
      }
      else
      {
        if(isAuthenticated) {
          this.store.dispatch(AccountActions.loginSuccess({username: undefined})); 
        }        
      }      
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
          if (localStorage.getItem('angular-client-entra-app_storageCustomRequestParams')){
            localStorage.removeItem('angular-client-entra-app_storageCustomRequestParams');
          }          
      }
    );
  }
}

