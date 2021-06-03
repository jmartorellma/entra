import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminShopsComponent } from './components/admin-shops/admin-shops.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';


const routes: Routes = [
  { path: 'users', component: AdminUsersComponent },
  { path: 'shops', component: AdminShopsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
