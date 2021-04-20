import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
