import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as AdminAction from '../../actions';
import { PaymentStatusDTO } from '../../models/PaymentStatusDTO';
import { PurchaseTypeDTO } from '../../models/PurchaseTypeDTO';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.css', '../admin-users/admin-users.component.css']
})
export class AdminPaymentsComponent implements OnInit {
  public adminState$: any;
  public paymentStatusList: PaymentStatusDTO[] | any;
  public purchaseTypeList: PurchaseTypeDTO[] | any;
  public dataSourceStatus: any;
  public dataSourcePurchases: any;
  public displayedColumnsStatus: string[];
  public displayedColumnsPurchases: string[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog) { 
      this.displayedColumnsStatus = ['code', 'name', 'creationDate', 'actions']
      this.displayedColumnsPurchases = ['code', 'name', 'creationDate','actions']

      this.store.select('admin').subscribe(admin => {
        this.adminState$ = admin;
        if(admin !== undefined && admin !== null && admin.userList != null) {
          this.paymentStatusList = admin?.paymentStatusList;
          this.dataSourceStatus = new MatTableDataSource(this.paymentStatusList);
          this.purchaseTypeList = admin?.purchaseTypeList;
          this.dataSourcePurchases = new MatTableDataSource(this.purchaseTypeList);
        }        
      });
  }

  ngOnInit(): void {
    this.store.dispatch(AdminAction.loadPurchaseTypes());
    this.store.dispatch(AdminAction.loadPaymentStatus());
    this.dataSourceStatus = new MatTableDataSource(this.paymentStatusList);
    this.dataSourcePurchases = new MatTableDataSource(this.purchaseTypeList);
  }

  createPaymentStatus() {
    this.router.navigate(['admin','create-payment-status']);
  }

  editPaymentStatus(row: PaymentStatusDTO) {
    this.router.navigate(['admin', 'payment-status',`${row.id}`]);
  }

  deletePaymentStatus(row: PaymentStatusDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      data: { model: row.name, text: 'm??todo de pago' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(AdminAction.deletePaymentStatus({ paymentStatusId: row.id }));    
      }     
    });
  }

  createPurchaseType() {
    this.router.navigate(['admin','create-purchase-type']);
  }

  editPurchaseType(row: PurchaseTypeDTO) {
    this.router.navigate(['admin', 'purchase-type',`${row.id}`]);
  }

  deletePurchaseType(row: PurchaseTypeDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      data: { model: row.name, text: 'tipo de compra' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(AdminAction.deletePurchaseType({ purchaseTypeId: row.id }));    
      }     
    });
  }

  goUsers() {
    this.router.navigate(['admin','users']);
  }

}
