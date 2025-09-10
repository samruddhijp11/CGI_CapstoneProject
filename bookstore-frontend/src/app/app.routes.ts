import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { MyOrdersComponent } from './pages/myorders/myorders.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BookComponent } from './pages/book/book.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AuthGuard } from './gaurds/auth.gaurd';
import { AdminGuard } from './gaurds/admin.gaurd';

export const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'cart', component: CartComponent ,canActivate: [AuthGuard]},
  { path: 'wishlist', component: WishlistComponent , canActivate: [AuthGuard]},
  { path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'book/:id', component: BookComponent },
  { path: 'admin-orders', component: AdminOrdersComponent,canActivate: [AdminGuard] }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
