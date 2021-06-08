import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routingModule';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShopAdminComponent } from './components/shop-admin/shop-admin.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { CategoriesAdminComponent } from './components/categories-admin/categories-admin.component';
import { ProvidersAdminComponent } from './components/providers-admin/providers-admin.component';
import { PurchasesAdminComponent } from './components/purchases-admin/purchases-admin.component';
import { DeliveriesAdminComponent } from './components/deliveries-admin/deliveries-admin.component';
import { EditShopComponent } from './components/edit-shop/edit-shop.component';
import { PaymentMethodsAdminComponent } from './components/payment-methods-admin/payment-methods-admin.component';


@NgModule({
  declarations: [
    ShopAdminComponent,
    ProductsAdminComponent,
    CategoriesAdminComponent,
    ProvidersAdminComponent,
    PurchasesAdminComponent,
    DeliveriesAdminComponent,
    EditShopComponent,
    PaymentMethodsAdminComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FlexLayoutModule
  ]
})
export class BackofficeModule { }
