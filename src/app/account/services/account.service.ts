import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { AppConfiguration } from "read-appsettings-json";
import { CredentialsModel } from '../models/credentialsModel';
import { RegisterModel } from '../models/registerModel';
import { ResetPasswordRequestModel } from '../models/resetPasswordRequestModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private authUrl = `${AppConfiguration.Setting().identityEndpoint}/Auth`;

  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(credentials: CredentialsModel) {
    this.oidcSecurityService.authorize({customParams: { username: credentials.Username, password: credentials.Password }});
  }

  registerUser(registerModel: RegisterModel): Observable<any> {
    const url = `${this.authUrl}/Register`;
    return this.http.post<RegisterModel>(url, registerModel, this.httpOptions);
  }

  resetPassword(model: ResetPasswordRequestModel) {
    const url = `${this.authUrl}/ResetPasswordRequest`;
    return this.http.post<ResetPasswordRequestModel>(url, model, this.httpOptions);
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}
