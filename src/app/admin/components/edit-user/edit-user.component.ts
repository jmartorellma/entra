import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { UserDTO } from 'src/app/profile/models/userDTO';
import { CustomValidator } from 'src/app/shared/validators/customValidator';
import { AdminState } from '../../reducers';
import * as AdminAction from '../../actions';
import { EditUserModel, EditUserPasswordModel } from '../../models/editUserModel';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public userName: FormControl = new FormControl;
  public name: FormControl = new FormControl;
  public surname: FormControl = new FormControl;
  public phoneNumber: FormControl = new FormControl;
  public email: FormControl = new FormControl;
  public isActive: FormControl = new FormControl;
  public oldPassword: FormControl = new FormControl;
  public password: FormControl = new FormControl;
  public confirmPassword: FormControl = new FormControl;
  
  public param: number | undefined;
  public user$: UserDTO;
  public editModel: EditUserModel | undefined;
  public dataForm: FormGroup;
  public passwordForm: FormGroup;
  public adminState$: AdminState | undefined;
  public hide: boolean;
  public hideOld: boolean;
  public hideConfirm: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute) { 
      this.user$ = {
        id: 0,
        name: '',
        surname: '',
        isActive: false,
        userName: '',
        email: '',
        role: '',
        phoneNumber: '',
        creationDate: ''
      }  
      this.hide = true;
      this.hideOld = true;
      this.hideConfirm = true;
      let reload = false;   
      this.store.select('admin').subscribe(account => {
        this.adminState$ = account;
        if(!reload && (this.adminState$.userList === null || this.adminState$.userList.length === 0)) {
          reload = true;
          this.store.dispatch(AdminAction.loadUsers());
        }
        else {
          const u = this.adminState$.userList?.find(u => u.id === parseInt(this.route.snapshot.params.id, 10));
          if(u) {
            this.user$ = u;
            this.loadUser();
          } 
        }         
      });
      
      this.loadUser();  
      this.dataForm = this.fb.group({
        userName: this.userName,
        name: this.name,
        surname: this.surname,
        phoneNumber: this.phoneNumber,
        email: this.email,
        isActive: this.isActive
      });    

      this.oldPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
      this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
      this.confirmPassword = new FormControl('', [Validators.required]);
      
      const optionsPassword: AbstractControlOptions = { validators: CustomValidator.passwordMatchValidator(this.password, this.confirmPassword) };
      this.passwordForm = this.fb.group({
        oldPassword: this.oldPassword,
        password: this.password,
        confirmPassword: this.confirmPassword
      }, optionsPassword);      
  }

  ngOnInit(): void {}

  loadUser() {
    this.userName = new FormControl(this.user$.userName, [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(this.user$.name, [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.surname= new FormControl(this.user$.surname, [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.phoneNumber = new FormControl(this.user$.phoneNumber, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]);
    this.email = new FormControl(this.user$.email, [Validators.required, Validators.email]);
    this.isActive = new FormControl(this.user$.isActive);
    this.dataForm = this.fb.group({
      userName: this.userName,
      name: this.name,
      surname: this.surname,
      phoneNumber: this.phoneNumber,
      email: this.email,
      isActive: this.isActive
    });
  }

  updateUser() {
    const up: EditUserModel = {
      Id: this.user$.id,
      Username: this.userName.value,
      Name: this.name.value,
      Surname: this.surname.value,
      PhoneNumber: this.phoneNumber.value,
      Email: this.email.value,
      IsActive: this.isActive.value,
      IsProfile: false
    }

    this.store.dispatch(AdminAction.updateUser({user: up}));
  }

  updatePassword() {
    const upPass: EditUserPasswordModel = {
      Id: this.user$.id,
      OldPassword: this.oldPassword.value,
      Password: this.password.value,
      ConfirmPassword: this.confirmPassword.value
    }

    this.store.dispatch(AdminAction.updateUserPassword({passModel: upPass}));
  }

  // loadUser() {
  //   this.route.paramMap.subscribe(params => {
      
  //     if(param != null) {
  //       const id: number = parseInt(param, 10);
  //       if (id !== undefined && id !== null && id !== 0) {
  //         this.store.select('admin').subscribe(admin => {
  //           const user = admin.userList?.find(u => u.id === id);
  //           if(user) {
  //             this.createForm(user);
  //           }
  //         });
  //       }
  //     }
  //   });
  // }

}
