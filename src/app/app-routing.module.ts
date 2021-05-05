import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { LayoutComponent as AppLayoutComponent } from './authentication/layout/layout.component';
import { ListExchangeComponent } from './authentication/list-exchange/list-exchange.component';
import { ListRentComponent } from './authentication/list-rent/list-rent.component';
import { ListSellComponent } from './authentication/list-sell/list-sell.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddNovelComponent } from './user/add-novel/add-novel.component';
import { LayoutComponent as UserLayout } from './user/layout/layout.component';
import { ManageNovelsComponent } from './user/manage-novels/manage-novels.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/signin', pathMatch: 'full' },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'reset', component: ResetPasswordComponent },
      { path: 'rentnovel', component: ListRentComponent },
      { path: 'exchangenovel', component: ListExchangeComponent },
      { path: 'buynovel', component: ListSellComponent },
      { path: 'contactus', component: ContactUsComponent },
    ],
  },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manageuser', component: ManageUserComponent },

    ],
  },
  {
    path: 'user',
    component: UserLayout,
    canActivate: [LoginGuard],
    children: [
      { path: '', component: AddNovelComponent },
      { path: 'addnovel', component: AddNovelComponent },
      { path: 'managenovel', component: ManageNovelsComponent },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile', component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
