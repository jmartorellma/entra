import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CreateShopComponent } from './components/create-shop/create-shop.component';
import { EditShopComponent } from './components/edit-shop/edit-shop.component';
import { AdminShopsComponent } from './components/admin-shops/admin-shops.component';
import { AdminPaymentsComponent } from './components/admin-payments/admin-payments.component';
import { CreatePaymentStatusComponent } from './components/create-payment-status/create-payment-status.component';
import { EditPaymentStatusComponent } from './components/edit-payment-status/edit-payment-status.component';
import { CreatePurchaseTypeComponent } from './components/create-purchase-type/create-purchase-type.component';
import { EditPurchaseTypeComponent } from './components/edit-purchase-type/edit-purchase-type.component';


@NgModule({
  declarations: [
    AdminUsersComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteDialogComponent,
    CreateShopComponent,
    EditShopComponent,
    AdminShopsComponent,
    AdminPaymentsComponent,
    CreatePaymentStatusComponent,
    EditPaymentStatusComponent,
    CreatePurchaseTypeComponent,
    EditPurchaseTypeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatSlideToggleModule,
    FlexLayoutModule,
  ]
})
export class AdminModule { }
