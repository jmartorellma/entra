import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { CategoryDTO } from '../../models/CategoryDTO';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';
import { DeleteDialogBackofficeComponent } from '../delete-dialog-backoffice/delete-dialog-backoffice.component';

@Component({
  selector: 'app-backoffice-categories',
  templateUrl: './backoffice-categories.component.html',
  styleUrls: ['./backoffice-categories.component.css']
})
export class BackofficeCategoriesComponent implements OnInit {

  public adminState$: any;
  public categoryList: CategoryDTO[];
  public dataSource: any;
  public displayedColumns: string[];
  public backofficeState$: BackofficeState | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog) { 

      this.categoryList = [];
      this.displayedColumns = ['code', 'name', 'creationDate', 'actions']

      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        if(backoffice !== undefined && backoffice !== null && backoffice.categoryList != null) {
          this.categoryList = backoffice?.categoryList;
          this.dataSource = new MatTableDataSource(this.categoryList);
        }        
      });
  }

  ngOnInit(): void {
    this.store.dispatch(BackofficeActions.loadCategories());
    this.dataSource = new MatTableDataSource(this.categoryList);
  }

  createCategory() {
    this.router.navigate(['backoffice','category', 0]);
  }

  editCategory(row: CategoryDTO) {
    this.router.navigate(['backoffice', 'category', row.id]);
  }

  deleteCategory(row: CategoryDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogBackofficeComponent, {
      data: { model: row.name, text: 'categoría' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(BackofficeActions.deleteCategory({ id: row.id }));    
      }     
    });
  }

  goBackoffice() {
    this.router.navigate(['backoffice','shop-admin']);
  }

}
