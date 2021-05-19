import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public resetResult: string = 'No reset result';

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login() {
    this.oidcSecurityService.authorize({customParams: { username: 'jmartorellma', password: 'Jm123456'}});
  }

  resetPassword(){
    this.callReset()
      .subscribe((data: ApiResul) => this.resetResult = data.result);
  }

  callReset(): Observable<any> {
    // let headers = new HttpHeaders(); 
    // headers.set('Content-Type', 'application/json');
    const configReset = 'https://localhost:44381/Auth/ResetPasswordRequest';
    const body: ResetPasswordRequestModel = { Email: "jmartorellma@uoc.edu"};
    return this.http.post<ResetPasswordRequestModel>(configReset, body) //, JSON.stringify(body), {headers: headers}
      .pipe(
        tap(
          data => data,
          error => error
        )
      );
  }
}

export interface ResetPasswordRequestModel{
  Email: string
}

export interface ApiResul{
  result: string
}