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
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShopAdminComponent } from './components/shop-admin/shop-admin.component';
import { EditShopComponent } from './components/edit-shop/edit-shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { BackofficeCategoriesComponent } from './components/backoffice-categories/backoffice-categories.component';
import { DeleteDialogBackofficeComponent } from './components/delete-dialog-backoffice/delete-dialog-backoffice.component';
import { CategoryComponent } from './components/category/category.component';
import { BackofficeProvidersComponent } from './components/backoffice-providers/backoffice-providers.component';
import { ProviderComponent } from './components/provider/provider.component';
import { BackofficePaymentMethodsComponent } from './components/backoffice-payment-methods/backoffice-payment-methods.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';


@NgModule({
  declarations: [
    ShopAdminComponent,
    EditShopComponent,
    ProductComponent,
    BackofficeCategoriesComponent,
    DeleteDialogBackofficeComponent,
    CategoryComponent,
    BackofficeProvidersComponent,
    ProviderComponent,
    BackofficePaymentMethodsComponent,
    PaymentMethodComponent,
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    FlexLayoutModule
  ]
})
export class BackofficeModule { }
