import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RegisterModel } from '../../models/registerModel';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/validators/customValidator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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

  // loginState$: LoginState;
  // userState$: UserState;

  public registerModel: RegisterModel | undefined;
  public userName: FormControl;
  public name: FormControl;
  public surname: FormControl;
  public phoneNumber: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public registerForm: FormGroup;
  public isSubmit: boolean;
  
  constructor(
    //private store: Store<AppState>, 
    private formBuilder: FormBuilder,
    public router: Router)
  {  

    // this.store.select('login').subscribe(login => this.loginState$ = login);
    // this.store.select('user').subscribe(userState => {
    //   this.userState$ = userState;
    //   if ((userState.user !== null) && (!this.loginState$.loggedIn))
    //   {
    //     const credentials = {
    //       email: userState.user?.profile.email,
    //       password: userState.user?.profile.password,
    //     };
    //     this.store.dispatch(LoginAction.login({credentials}));
    //   }
    // });

    this.isSubmit = false;

    this.userName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.surname= new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.phoneNumber = new FormControl(null, [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl('', [Validators.required]);

    const options: AbstractControlOptions = { validators: CustomValidator.passwordMatchValidator(this.password, this.confirmPassword) };
    this.registerForm = this.formBuilder.group({
      userName: this.userName,
      name: this.name,
      surname: this.surname,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    // }, { validator: CustomValidator.passwordMatchValidator('password', 'confirmPassword') });
      }, options);
  }

  ngOnInit(): void {
    
  }

  public userRegister()
  {
    this.isSubmit = true;
    // Se inicializa la clase User
    this.registerModel = {
      Username: this.userName.value,
      Name: this.name.value,
      Surname: this.surname.value,
      PhoneNumber: this.phoneNumber.value,
      Email: this.email.value,
      Password: this.password.value,
      ConfirmPassword: this.confirmPassword.value,
    };

    // this.store.dispatch(UserAction.createUser({user: this.user}));
  }
}

