import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of, throwError } from 'rxjs';
import { CredentialsModel } from '../models/credentialsModel';
import { RegisterModel } from '../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private authUrl = 'https://localhost:44381/Auth';

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

  resetPassword(email: string) {
    const url = `${this.authUrl}/ResetPasswordRequest`;
    return this.http.post<RegisterModel>(url, {Email: email}, this.httpOptions);
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}
