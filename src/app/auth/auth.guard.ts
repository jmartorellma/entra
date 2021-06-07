import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private oidcSecurityService: OidcSecurityService, 
    private router: Router,
    private snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map((isAuthorized: boolean) => {
        console.log('AuthGuard, canActivate isAuthorized: ' + isAuthorized);
        if (!isAuthorized) {
          this.snakBarMessage();
          this.router.navigate(['accounts','login']);
          return false;
        }
        return true;
      })
    );
  }

  snakBarMessage() {
    this.snackBar.open("Debes identificarte para acceder a esta ruta", undefined, {
        duration: AppConfiguration.Setting().snackBarDuration,
        panelClass: ['custom-snackbar'],
        horizontalPosition: 'end',
        verticalPosition: 'top',
    });
}
}
 