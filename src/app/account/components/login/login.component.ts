import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CredentialsModel } from '../../models/credentialsModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0.2
      })),
      transition('void <=> *', animate(1500))
    ])
  ]
})
export class LoginComponent implements OnInit {

  public username: FormControl;
  public password: FormControl;
  public loginForm: FormGroup;
  public errorLogin: any;
  public isSubmit: boolean;
  public hide: boolean;

  //loginState$: LoginState;

  constructor( 
    //private store: Store<AppState>, 
    private formBuilder: FormBuilder,
    private oidcSecurityService: OidcSecurityService,
    private router: Router)
  {
    //this.store.select('login').subscribe(login => this.loginState$ = login);

    this.isSubmit = false;
    this.hide = true;
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.errorLogin = '';
    this.loginForm = this.formBuilder.group({
      email: this.username,
      password: this.password,
    });
  }

  ngOnInit(): void { 
  }

  public login(){
    this.isSubmit = true;
    
    const credentials: CredentialsModel = {
      Username: this.username.value,
      Password: this.password.value,
    };
    // this.store.dispatch(LoginAction.login({credentials}));
    this.oidcSecurityService.authorize({customParams: { username: credentials.Username, password: credentials.Password }});
  }

  goRegister() {
    this.router.navigate(['accounts','register']);
  }

  goReset() {

  }
}


// export class LoginComponent implements OnInit {

//   public resetResult: string = 'No reset result';

//   constructor(
//     private oidcSecurityService: OidcSecurityService,
//     private http: HttpClient) { }

//   ngOnInit(): void {
    
//   }

//   login() {
//     this.oidcSecurityService.authorize({customParams: { username: 'jmartorellma', password: 'Jm123456'}});
//   }

//   resetPassword(){
//     this.callReset()
//       .subscribe((data: ApiResul) => this.resetResult = data.result);
//   }

//   callReset(): Observable<any> {
//     // let headers = new HttpHeaders(); 
//     // headers.set('Content-Type', 'application/json');
//     const configReset = 'https://localhost:44381/Auth/ResetPasswordRequest';
//     const body: ResetPasswordRequestModel = { Email: "jmartorellma@uoc.edu"};
//     return this.http.post<ResetPasswordRequestModel>(configReset, body) //, JSON.stringify(body), {headers: headers}
//       .pipe(
//         tap(
//           data => data,
//           error => error
//         )
//       );
//   }
// }

export interface ResetPasswordRequestModel{
  Email: string
}

export interface ApiResul{
  result: string
}