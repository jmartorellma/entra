import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard } from '../auth/auth.guard';
import { AdminShopsComponent } from './components/admin-shops/admin-shops.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { CreateShopComponent } from './components/create-shop/create-shop.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditShopComponent } from './components/edit-shop/edit-shop.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


const routes: Routes = [
  { path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'shops', component: AdminShopsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'create-shop', component: CreateShopComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'shop/:id', component: EditShopComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'user/:id', component: EditUserComponent, canActivate: [AuthGuard, AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
