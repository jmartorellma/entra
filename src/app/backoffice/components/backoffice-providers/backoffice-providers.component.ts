import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProviderDTO } from '../../models/ProviderDTO';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';
import { DeleteDialogBackofficeComponent } from '../delete-dialog-backoffice/delete-dialog-backoffice.component';


@Component({
  selector: 'app-backoffice-providers',
  templateUrl: './backoffice-providers.component.html',
  styleUrls: ['./backoffice-providers.component.css']
})
export class BackofficeProvidersComponent implements OnInit {

  public providerList: ProviderDTO[];
  public dataSource: any;
  public displayedColumns: string[];
  public backofficeState$: BackofficeState | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog) { 

      this.providerList = [];
      this.displayedColumns = ['code', 'name', 'web', 'creationDate', 'actions']

      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        if(backoffice !== undefined && backoffice !== null && backoffice.categoryList != null) {
          this.providerList = backoffice?.providerList;
          this.dataSource = new MatTableDataSource(this.providerList);
        }        
      });
  }

  ngOnInit(): void {
    this.store.dispatch(BackofficeActions.loadProviders());
    this.dataSource = new MatTableDataSource(this.providerList);
  }

  createProvider() {
    this.router.navigate(['backoffice','provider', 0]);
  }

  editProvider(row: ProviderDTO) {
    this.router.navigate(['backoffice', 'provider', row.id]);
  }

  deleteProvider(row: ProviderDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogBackofficeComponent, {
      data: { model: row.name, text: 'proveedor' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(BackofficeActions.deleteProvider({ id: row.id }));    
      }     
    });
  }

  goBackoffice() {
    this.router.navigate(['backoffice','shop-admin']);
  }
}
