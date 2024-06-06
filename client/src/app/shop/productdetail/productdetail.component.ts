import { IBasket, IBasketItem } from './../../shared/Models/IBasket';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from './../../basket/basket.service';
import { IProduct } from './../../shared/Models/Iproducts';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
product:IProduct
quantity:number = 1;
isupdate:boolean = false; 
isupdated : boolean = false;

  constructor(private shopservice : ShopService, 
    private activateroute : ActivatedRoute,
    private basketservice: BasketService,
    private bsService : BreadcrumbService
   ) 
    { }
  ngOnInit() {
    this.loadProduct();
    this.checkQuantity();
  }
loadProduct(){
  return this.shopservice.getProduct(+this.activateroute.snapshot.paramMap.get('id')).
  subscribe(product => {
    this.product = product
  this.bsService.set('@productDetails',product.name)
  },error => {
    console.log(error)
  })}
  checkQuantity(){
  const basket = this.basketservice.getCurrentBasketValue();
  if(basket){
     const basketitem = basket.basketItems.find(p => p.id === this.product.id);
  if(basketitem){
 this.quantity = basketitem.quantity;
 this.isupdate = true;
  }
    }
  
  }
  addItemToBasket(item : IProduct){
     this.basketservice.addItemToBasket(item,this.quantity);
  }

  incrmentQuantity(){
    this.isupdated  = true;
this.quantity++;
  } 

  decermentQuantity(){
    this.isupdated = true;
    if(this.quantity > 1){
      this.quantity--;
    }
   }
}
