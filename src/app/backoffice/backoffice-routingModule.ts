import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ShopGuard } from '../auth/shop-guard';
import { BackofficeCategoriesComponent } from './components/backoffice-categories/backoffice-categories.component';
import { BackofficeProvidersComponent } from './components/backoffice-providers/backoffice-providers.component';
import { CategoryComponent } from './components/category/category.component';
import { EditShopComponent } from './components/edit-shop/edit-shop.component';
import { ProductComponent } from './components/product/product.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ShopAdminComponent } from './components/shop-admin/shop-admin.component';


const routes: Routes = [
  { path: 'shop-admin', component: ShopAdminComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'shop/:id', component: EditShopComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'product/:shopId/:id', component: ProductComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'backoffice-categories', component: BackofficeCategoriesComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'backoffice-providers', component: BackofficeProvidersComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'category/:id', component: CategoryComponent, canActivate: [AuthGuard, ShopGuard] },
  { path: 'provider/:id', component: ProviderComponent, canActivate: [AuthGuard, ShopGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }