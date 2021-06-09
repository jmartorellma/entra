import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { CategoryDTO } from '../../models/CategoryDTO';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public code: FormControl;
  public name: FormControl;
  public backofficeState$: BackofficeState | undefined;
  public editForm: FormGroup;
  public catregory: CategoryDTO | undefined; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) { 

      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;  
        if(parseInt(this.route.snapshot.params.id, 10) != 0 && backoffice !== undefined) {
          const c = backoffice.categoryList.find(c => c.id == parseInt(this.route.snapshot.params.id, 10))
          if(c){
            this.catregory = c;
            this.loadCategory(c);
          }
        }             
      }); 

      this.code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
      this.name = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);

      this.editForm = this.fb.group({
        code: this.code,
        name: this.name,
      });
  }

  loadCategory(c: CategoryDTO) {
    this.code = new FormControl(c.code, [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]);
    this.name = new FormControl(c.name, [Validators.required, Validators.minLength(6), Validators.maxLength(55), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚÑñÇç]*')]);

    this.editForm = this.fb.group({
      code: this.code,
      name: this.name,
    });
  }

  ngOnInit(): void {
    if(parseInt(this.route.snapshot.params.id, 10) != 0) {
      this.store.dispatch(BackofficeActions.loadCategories());
    }
  }

  editCategory() {
    if(this.catregory !== undefined) {
      const editModel = {
        Id: this.catregory.id,
        Code: this.code.value,
        Name: this.name.value,
      };
      this.store.dispatch(BackofficeActions.createCategory({category: editModel}));
    } else { 
      const createModel = {
        Code: this.code.value,
        Name: this.name.value,
      };
      this.store.dispatch(BackofficeActions.createCategory({category: createModel}));
    }
  }

  goCategories() {
    this.router.navigate(['backoffice','backoffice-categories']);
  }

}
