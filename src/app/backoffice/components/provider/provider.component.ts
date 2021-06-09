import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProviderDTO } from '../../models/ProviderDTO';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';
import { EditProviderModel } from '../../models/editProviderModel';
import { CreateProviderModel } from '../../models/createProviderModel';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  public code: FormControl;
  public name: FormControl;
  public web: FormControl;
  public backofficeState$: BackofficeState | undefined;
  public editForm: FormGroup;
  public provider: ProviderDTO | undefined; 
  public isUpdate: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) { 

      this.isUpdate = false;
      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;  
        if(parseInt(this.route.snapshot.params.id, 10) != 0 && backoffice !== undefined) {
          const p = backoffice.providerList.find(p => p.id == parseInt(this.route.snapshot.params.id, 10))
          if(p){
            this.isUpdate = true;
            this.provider = p;
            this.loadProvider(p);
          }
        }             
      }); 

      this.code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
      this.web = new FormControl('');

      this.editForm = this.fb.group({
        code: this.code,
        name: this.name,
        web: this.web
      });
  }

  loadProvider(p: ProviderDTO) {
    this.code = new FormControl(p.code, [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(p.name, [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);
    this.web = new FormControl(p.web);

    this.editForm = this.fb.group({
      code: this.code,
      name: this.name,
      web: this.web
    });
  }

  ngOnInit(): void {
    if(parseInt(this.route.snapshot.params.id, 10) != 0) {
      this.store.dispatch(BackofficeActions.loadProviders());
    }
  }

  editCategory() {
    if(this.isUpdate && this.provider !== undefined) {
      const editModel: EditProviderModel = {
        Id: this.provider.id,
        Code: this.code.value,
        Name: this.name.value,
        Web: this.web.value
      };
      this.store.dispatch(BackofficeActions.updateProvider({provider: editModel}));
    } else { 
      const createModel: CreateProviderModel = {
        Code: this.code.value,
        Name: this.name.value,
        Web: this.web.value
      };
      this.store.dispatch(BackofficeActions.createProvider({provider: createModel}));
    }
  }

  goCategories() {
    this.router.navigate(['backoffice','backoffice-providers']);
  }


}
