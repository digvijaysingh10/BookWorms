import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
import { LayoutComponent } from './authentication/layout/layout.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent as UserLayout } from './user/layout/layout.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayout,
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  {
    path: 'user',
    component: UserLayout,
    children: [],
  },

  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: 'signin', component: SigninComponent}
    ],
  },
  {
    path:'home',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
