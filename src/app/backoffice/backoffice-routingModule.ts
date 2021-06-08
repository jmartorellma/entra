import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ShopGuard } from '../auth/shop-guard';
import { CategoriesAdminComponent } from './components/categories-admin/categories-admin.component';
import { DeliveriesAdminComponent } from './components/deliveries-admin/deliveries-admin.component';
import { EditShopComponent } from './components/edit-shop/edit-shop.component';
import { PaymentMethodsAdminComponent } from './components/payment-methods-admin/payment-methods-admin.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { ProvidersAdminComponent } from './components/providers-admin/providers-admin.component';
import { PurchasesAdminComponent } from './components/purchases-admin/purchases-admin.component';
import { ShopAdminComponent } from './components/shop-admin/shop-admin.component';


const routes: Routes = [
  { path: 'shop-admin', component: ShopAdminComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: ':id', component: EditShopComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'products-admin', component: ProductsAdminComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'categories-admin', component: CategoriesAdminComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'providers-admin', component: ProvidersAdminComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'payment-methods-admin', component: PaymentMethodsAdminComponent, canActivate: [AuthGuard, ShopGuard] },  
  { path: 'purchases-admin', component: PurchasesAdminComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'deliveries-admin', component: DeliveriesAdminComponent, canActivate: [AuthGuard, ShopGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }