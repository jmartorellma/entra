import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminShopsComponent } from './components/admin-shops/admin-shops.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


const routes: Routes = [
  { path: 'users', component: AdminUsersComponent },
  { path: 'create', component: CreateUserComponent },
  { path: ':id', component: EditUserComponent },
  { path: 'shops', component: AdminShopsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
