import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from './../../basket/basket.service';
import { Observable } from 'rxjs';
import { Iorder, OrderItem } from './../../shared/Models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { IBasketTotals } from 'src/app/shared/Models/IBasket';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order:OrderItem[];
  total:number;
  shipping:number;
  subtotal:number;
  constructor(private orderservice: OrdersService,private activatedRoute:ActivatedRoute,private breadcrumbservice :BreadcrumbService) { }

  ngOnInit(): void {
    this.loadOrder()
  }
  loadOrder(){
   return this.orderservice.loadorderdetail(+this.activatedRoute.snapshot.paramMap.get('id')).
   subscribe((order:Iorder) => {
     this.order = order.orderItems;
     this.total = order.total;
     this.shipping = order.shippingPrice;
     this.subtotal = order.subtotal;
     this.breadcrumbservice.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
   },error => {
     console.log(error)
   });
  }
}
