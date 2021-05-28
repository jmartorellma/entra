import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import * as AccountActions from '../../actions';
import { CredentialsModel } from '../../models/credentialsModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AccountState } from '../../reducers';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';


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
    private router: Router,
    private dialog: MatDialog)
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
    const resetDialog = this.dialog.open(ResetPasswordDialogComponent);

    resetDialog.afterClosed().subscribe(result => {
      const email = result;
      if(email !== undefined && email !== null && email.trim() !== '' ) {
        this.store.dispatch(AccountActions.resetPassword({ resetModel: { Email: email } }));      
      }      
    });
  }
}
