import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { LayoutComponent as AppLayoutComponent } from './authentication/layout/layout.component';
import { ListExchangeComponent } from './authentication/list-exchange/list-exchange.component';
import { ListRentComponent } from './authentication/list-rent/list-rent.component';
import { ListSellComponent } from './authentication/list-sell/list-sell.component';
import { NovelDetailsComponent } from './authentication/novel-details/novel-details.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { ChatComponent } from './chat/chat.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestNovelsComponent } from './user/request-novels/request-novels.component';
import { AddNovelComponent } from './user/add-novel/add-novel.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { LayoutComponent as UserLayout } from './user/layout/layout.component';
import { ManageNovelsComponent } from './user/manage-novels/manage-novels.component';
import { ListRequestComponent } from './list-request/list-request.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ManageNovelsComponent as novelManagement } from './admin/manage-novels/manage-novels.component';
import { ManageUserOrdersComponent } from './user/manage-user-orders/manage-user-orders.component';

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
      { path: 'noveldetails/:id', component: NovelDetailsComponent },
      { path: 'listrequest', component: ListRequestComponent },
      { path: 'aboutus', component: AboutUsComponent },
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
      { path: 'profile', component: ProfileComponent },
      { path: 'managenovels', component: novelManagement },
    ],
  },
  {
    path: 'user',
    component: UserLayout,
    canActivate: [LoginGuard],
    children: [
      { path: '', component: RequestNovelsComponent },
      { path: 'addnovel', component: AddNovelComponent },
      { path: 'managenovel', component: ManageNovelsComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'requestnovels', component: RequestNovelsComponent },
      { path: 'manageorder', component: ManageUserOrdersComponent },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
