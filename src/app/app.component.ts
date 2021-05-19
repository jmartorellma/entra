import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-client-entra-app';

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router) {}

  ngOnInit(){
    this.oidcSecurityService
    .checkAuth()
    .subscribe((isAuthenticated) => {
      console.log('app authenticated', isAuthenticated)
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((value: any) => {
          if (localStorage.getItem('angular-client-entra-app_storageCustomRequestParams')){
            localStorage.removeItem('angular-client-entra-app_storageCustomRequestParams');
          }          
      }
    );
  }
}
