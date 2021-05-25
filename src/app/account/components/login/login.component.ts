import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import * as AccountActions from '../../actions';
import { CredentialsModel } from '../../models/credentialsModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AccountState } from '../../reducers';


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
  public hide: boolean;
  public accountState$: AccountState | undefined;

  constructor( 
    private store: Store<AppState>, 
    private formBuilder: FormBuilder,
    private router: Router)
  {
    this.store.select('account').subscribe(account => 
      this.accountState$ = account
    );

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
    const query = window.location.search.substring(1);
    if(query) {
      const param = query.split('=');
      if(param) {
        const errorMessage = decodeURIComponent(param[1]);
        if(errorMessage) {
          this.store.dispatch(AccountActions.loginError({payload: {error: errorMessage}}));  
          window.history.replaceState({}, document.title, "/accounts/login");
        }
      }      
    }  
  }

  login() {    
    const credentials: CredentialsModel = {
      Username: this.username.value,
      Password: this.password.value,
    };
    
    this.store.dispatch(AccountActions.login({credentials}));    
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