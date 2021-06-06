import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { UserDTO } from 'src/app/profile/models/userDTO';
import * as AdminAction from '../../actions';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  
  public adminState$: any;
  public userlist: UserDTO | any;
  public dataSource: any;
  public displayedColumns: string[];

  constructor(
    private store: Store<AppState>,
    private router: Router) { 
      this.userlist = [];
      this.displayedColumns = ['userName', 'email', 'role', 'creationDate', 'actions']
      this.store.select('admin').subscribe(admin => {
        this.adminState$ = admin;
        if(admin !== undefined && admin !== null && admin.userList != null) {
          this.userlist = admin?.userList;
          this.dataSource = new MatTableDataSource(this.userlist);
        }        
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AdminAction.loadUsers());
    this.dataSource = new MatTableDataSource(this.userlist);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createUser() {
    this.router.navigate(['admin','edituser']);
  }

  editUser() {}

  deleteUser() {}
}
