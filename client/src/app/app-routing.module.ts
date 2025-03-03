import { ContactComponent } from './shared/components/contact/contact.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: ''  , component: HomeComponent},
       {path: 'home'  , component: HomeComponent},
    ], data: {breadcrumb: 'Home'}
  },
  {path: 'contact', component: ContactComponent, data: {breadcrumb: 'Contact'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'Shop'}},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), data: {breadcrumb: 'basket'}},
  {path: 'checkout',canActivate : [AuthGuard], loadChildren: () => import('./checkout/checkout.module')
  .  then(mod => mod.CheckoutModule), data: {breadcrumb: 'checkout'}},
  {path: 'account', loadChildren: () => import('./account/account.module')
  .then(mod => mod.AccountModule), data: {breadcrumb: {skip: true}}},
  {path: 'orders', canActivate : [AuthGuard], loadChildren: () => import('./orders/orders.module')
  .then(mod => mod.OrdersModule), data: {breadcrumb:'Orders'}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full', data: {breadcrumb: 'Not Found'}}
];      

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
