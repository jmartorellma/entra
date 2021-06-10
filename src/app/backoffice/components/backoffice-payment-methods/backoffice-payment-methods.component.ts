import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { BackofficeState } from '../../reducers';
import * as BackofficeActions from '../../actions';
import { DeleteDialogBackofficeComponent } from '../delete-dialog-backoffice/delete-dialog-backoffice.component';
import { PaymentMethodDTO } from '../../models/paymentMethodDTO';

@Component({
  selector: 'app-backoffice-payment-methods',
  templateUrl: './backoffice-payment-methods.component.html',
  styleUrls: ['./backoffice-payment-methods.component.css']
})
export class BackofficePaymentMethodsComponent implements OnInit {

  public paymentMethodList: PaymentMethodDTO[];
  public dataSource: any;
  public displayedColumns: string[];
  public backofficeState$: BackofficeState | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog) { 

      this.paymentMethodList = [];
      this.displayedColumns = ['code', 'name', 'value', 'creationDate', 'actions']

      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        if(backoffice !== undefined && backoffice !== null && backoffice.paymentMethodList != null) {
          this.paymentMethodList = backoffice?.paymentMethodList;
          this.dataSource = new MatTableDataSource(this.paymentMethodList);
        }        
      });
  }

  ngOnInit(): void {
    this.store.dispatch(BackofficeActions.loadCategories());
    this.dataSource = new MatTableDataSource(this.paymentMethodList);
  }

  createPaymentMethod() {
    this.router.navigate(['backoffice','payment-method', 0]);
  }

  editPaymentMethod(row: PaymentMethodDTO) {
    this.router.navigate(['backoffice', 'payment-method', row.id]);
  }

  deletePaymentMethod(row: PaymentMethodDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogBackofficeComponent, {
      data: { model: row.name, text: 'método de pago' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(BackofficeActions.deletePaymentMethod({ id: row.id }));    
      }     
    });
  }

  goBackoffice() {
    this.router.navigate(['backoffice','shop-admin']);
  }

}
