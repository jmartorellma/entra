import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CategoriesAdminComponent } from './components/categories-admin/categories-admin.component';
import { DeliveriesAdminComponent } from './components/deliveries-admin/deliveries-admin.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { ProvidersAdminComponent } from './components/providers-admin/providers-admin.component';
import { PurchasesAdminComponent } from './components/purchases-admin/purchases-admin.component';
import { ShopAdminComponent } from './components/shop-admin/shop-admin.component';


const routes: Routes = [
  { path: 'shop-admin', component: ShopAdminComponent, canActivate: [AuthGuard] },
  { path: 'products-admin', component: ProductsAdminComponent, canActivate: [AuthGuard] },
  { path: 'categories-admin', component: CategoriesAdminComponent, canActivate: [AuthGuard] },
  { path: 'providers-admin', component: ProvidersAdminComponent, canActivate: [AuthGuard] },
  { path: 'purchases-admin', component: PurchasesAdminComponent, canActivate: [AuthGuard] },
  { path: 'deliveries-admin', component: DeliveriesAdminComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }