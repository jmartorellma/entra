import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ShopDTO } from 'src/app/backoffice/models/ShopDTO';
import * as AdminAction from '../../actions';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-shops',
  templateUrl: './admin-shops.component.html',
  styleUrls: ['./admin-shops.component.css', '../admin-users/admin-users.component.css']
})
export class AdminShopsComponent implements OnInit {
  public adminState$: any;
  public shopList: ShopDTO[] | any;
  public dataSource: any;
  public displayedColumns: string[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog) { 
      this.displayedColumns = ['name', 'email', 'city', 'owner', 'creationDate', 'actions']
      this.store.select('admin').subscribe(admin => {
        this.adminState$ = admin;
        if(admin !== undefined && admin !== null && admin.shopList != null) {
          this.shopList = admin?.shopList;
          this.dataSource = new MatTableDataSource(this.shopList);
        }        
      });
  }

  ngOnInit(): void {
    this.store.dispatch(AdminAction.loadShops());
    this.dataSource = new MatTableDataSource(this.shopList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createShop() {
    this.router.navigate(['admin','create-shop']);
  }

  goUsers() {
    this.router.navigate(['admin','users']);
  }

  editShop(row: ShopDTO) {
    this.router.navigate(['admin', 'shop',`${row.id}`]);
  }

  deleteShop(row: ShopDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      data: { model: row.name, text: 'tienda' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(AdminAction.deleteShop({ shopId: row.id }));    
      }     
    });
  }
}
