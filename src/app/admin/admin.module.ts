import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { MatTableModule } from '@angular/material/table';

import { AdminShopsComponent } from './components/admin-shops/admin-shops.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';


@NgModule({
  declarations: [
    AdminUsersComponent,
    AdminShopsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule
  ]
})
export class AdminModule { }
