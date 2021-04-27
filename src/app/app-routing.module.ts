import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
import { LayoutComponent as AppLayoutComponent } from './authentication/layout/layout.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { AddNovelComponent } from './user/add-novel/add-novel.component';
import { LayoutComponent as UserLayout } from './user/layout/layout.component';

const routes: Routes = [ { path: '', redirectTo: '/app/signin', pathMatch: 'full' },
{
  path: 'app',
  component: AppLayoutComponent,
  children: [

    { path: 'signin', component: SigninComponent },
    { path: 'reset', component: ResetPasswordComponent },
  ],
},

{
  path: 'admin',
  component: AdminLayout,
  canActivate: [AdminGuard],
  children: [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    // { path: 'manageuser', component: ManageUsersComponent },
    // { path: 'profile', component: ProfileComponent },
  ],
},
{
  path: 'user',
  component: UserLayout,
  // canActivate: [LoginGuard],
  children: [
    { path: '', component: AddNovelComponent },
    { path: 'addnovel', component: AddNovelComponent },
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
