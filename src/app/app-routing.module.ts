import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: 'shop/home', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'accounts', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  { path: 'backoffice', loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule)},
  { path: 'profiles', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
  { path: '**', redirectTo: 'shop/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
