import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { UserDTO } from 'src/app/profile/models/userDTO';
import * as AdminAction from '../../actions';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, AfterViewInit  {  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  public adminState$: any;
  public userlist: UserDTO[] | any;
  public dataSource: any;
  public displayedColumns: string[];
  public currentRole$: any;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog) { 
      this.displayedColumns = ['userName', 'email', 'role', 'creationDate', 'actions']
      this.store.select('admin').subscribe(admin => {
        this.adminState$ = admin;
        if(admin !== undefined && admin !== null && admin.userList != null) {
          this.userlist = admin?.userList;
          this.dataSource = new MatTableDataSource(this.userlist);
        }        
      });
      this.store.select('account').subscribe(account => {
        this.currentRole$ = account?.userClaims.role;       
      });
  }

  ngOnInit(): void {
    this.store.dispatch(AdminAction.loadUsers());
    this.dataSource = new MatTableDataSource(this.userlist);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createUser() {
    this.router.navigate(['admin','create']);
  }

  editUser(row: UserDTO) {
    this.router.navigate(['admin',`${row.id}`]);
  }

  deleteUser(row: UserDTO) {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      data: { UserName: row.userName }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(AdminAction.deleteUser({ userId: row.id }));    
      }     
    });
  }
}
