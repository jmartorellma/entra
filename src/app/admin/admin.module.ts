import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ]
})
export class AdminModule { }
