import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RegisterModel } from '../../models/registerModel';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/validators/customValidator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as AccountActions from '../../actions';
import { AccountState } from '../../reducers';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0.2
      })),
      transition('void <=> *', animate(1500))
    ])
  ]
})

export class RegisterComponent implements OnInit {

  public registerModel: RegisterModel | undefined;
  public username: FormControl;
  public name: FormControl;
  public surname: FormControl;
  public phoneNumber: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public registerForm: FormGroup;
  public isSubmit: boolean;
  public hide: boolean;
  public hideConfirm: boolean;
  public accountState$: AccountState | undefined;
  
  constructor(
    private store: Store<AppState>, 
    private formBuilder: FormBuilder,
    public router: Router)
  {  
    this.store.select('account').subscribe(account => 
      this.accountState$ = account
    );

    this.isSubmit = false;
    this.hide = true;
    this.hideConfirm = true;
    this.username = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl('', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.surname= new FormControl('', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.phoneNumber = new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPassword = new FormControl('', [Validators.required]);

    const options: AbstractControlOptions = { validators: CustomValidator.passwordMatchValidator(this.password, this.confirmPassword) };
    this.registerForm = this.formBuilder.group({
      userName: this.username,
      name: this.name,
      surname: this.surname,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
      }, options);
  }

  ngOnInit(): void {    
  }

  goLogin() {
    this.router.navigate(['accounts','login']);
  }

  public userRegister()
  {
    this.isSubmit = true;
    this.registerModel = {
      Username: this.username.value,
      Name: this.name.value,
      Surname: this.surname.value,
      PhoneNumber: this.phoneNumber.value,
      Email: this.email.value,
      Password: this.password.value,
      ConfirmPassword: this.confirmPassword.value,
    };

    this.store.dispatch(AccountActions.registerUser({registerModel: this.registerModel}));
  }
}

