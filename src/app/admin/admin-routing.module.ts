import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard } from '../auth/auth.guard';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


const routes: Routes = [
  { path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'create', component: CreateUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: ':id', component: EditUserComponent, canActivate: [AuthGuard, AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
