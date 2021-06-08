import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as AdminActions from '../../actions';
import { CustomValidator } from 'src/app/shared/validators/customValidator';
import { CreateUserModel } from '../../models/createUserModel';
import { AdminState } from '../../reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css', '../edit-user/edit-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public createModel: CreateUserModel | undefined;
  public userName: FormControl;
  public name: FormControl;
  public surname: FormControl;
  public phoneNumber: FormControl;
  public email: FormControl;
  public isActive: FormControl;
  public role: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public createForm: FormGroup;
  public roleList$: string[];
  public hide: boolean;
  public hideConfirm: boolean;
  public adminState$: AdminState | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>) { 
      this.store.dispatch(AdminActions.loadRoles());

      this.store.select('admin').subscribe(account => {
        this.adminState$ = account;
        this.roleList$ = this.adminState$.roleList;        
      }); 

      this.roleList$ = [];
      this.hide = true;
      this.hideConfirm = true; 

      this.userName = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl('', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
      this.surname= new FormControl('', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
      this.phoneNumber = new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]);
      this.email = new FormControl('', [Validators.required, Validators.email]);
      this.isActive = new FormControl(true);
      this.role = new FormControl('', [Validators.required]);
      this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
      this.confirmPassword = new FormControl('', [Validators.required]);

      const options: AbstractControlOptions = { validators: CustomValidator.passwordMatchValidator(this.password, this.confirmPassword) };
      this.createForm = this.fb.group({
        userName: this.userName,
        name: this.name,
        surname: this.surname,
        phoneNumber: this.phoneNumber,
        email: this.email,
        isActive: this.isActive,
        role: this.role,
        password: this.password,
        confirmPassword: this.confirmPassword
      }, options);
  }

  ngOnInit(): void {}

  createUser() {
    this.createModel = {
      Username: this.userName.value,
      Name: this.name.value,
      Surname: this.surname.value,
      PhoneNumber: this.phoneNumber.value,
      Email: this.email.value,
      IsActive: this.isActive.value,
      Role: this.role.value,
      Password: this.password.value,
      ConfirmPassword: this.confirmPassword.value,
    };

    this.store.dispatch(AdminActions.createUser({user: this.createModel}));
  }

  goUsers() {
    this.router.navigate(['admin','users']);
  }

}
