import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DetailComponent } from './component/detail/detail.component';
import { PaymentComponent } from './component/payment/payment.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { AdminComponent } from './component/admin/admin.component';
import { UserComponent } from './component/user/user.component'
import { CheckoutComponent } from './component/checkout/checkout.component';
const routes: Routes = [
  { path:'', component:HomeComponent},
  { path: 'login', component:LoginComponent},
  { path: 'detail/:id', component:DetailComponent},
   { path: 'detail/:bookId', component: DetailComponent },
  { path: 'payment', component:PaymentComponent},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent},
  { path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
