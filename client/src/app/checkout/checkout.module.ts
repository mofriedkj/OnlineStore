import { SharedModule } from './../shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccsesComponent } from './checkout-succses/checkout-succses.component';



@NgModule({
  declarations: [CheckoutComponent, CheckoutAddressComponent, CheckoutDeliveryComponent, CheckoutReviewComponent, CheckoutPaymentComponent, CheckoutSuccsesComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
