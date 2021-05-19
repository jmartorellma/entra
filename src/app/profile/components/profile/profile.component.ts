import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiResul } from 'src/app/shared/components/login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public secretResult: string = 'No secret result';
  public openResult: string = 'No open result';

  constructor(private oidcSecurityService: OidcSecurityService, 
    private http: HttpClient) {}

  ngOnInit() {
    this.oidcSecurityService.userData$.subscribe((data) => {
      console.log(data)
    });
  }

  getUserData() {
    return this.oidcSecurityService.userData$.pipe(
      map((isAuthorized: boolean) => {
        console.log('AuthGuard, canActivate isAuthorized: ' + isAuthorized);
        
      })
    );
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  showSecretResult(){
    this.callApiSecert()
      .subscribe((data: ApiResul) => this.secretResult = data.result);
  }

  callApiSecert(): Observable<ApiResul> {
    const configSecert = 'https://localhost:44367/secret';
    return this.http.get<ApiResul>(configSecert)
      .pipe(
        tap(
          data => data,
          error => error
        )
      );
  }

  showOpenResult(){
    this.callApiOpen()
      .subscribe((data: ApiResul) => this.openResult = data.result);
  }

  callApiOpen(): Observable<ApiResul> {
    const configOpen = 'https://localhost:44367/opened';
    return this.http.get<ApiResul>(configOpen)
      .pipe(
        tap(
          data => data,
          error => error
        )
      );
  }

}