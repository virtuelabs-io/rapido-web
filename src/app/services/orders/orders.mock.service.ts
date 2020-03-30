import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { OrdersMockData } from './orders.mock.data';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersMockService extends OrdersService {
  public _productService: ProductsService;
  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService,
    productService?: ProductsService
  ) {
    super(_http, _profileService);
    this._productService = productService;
  }

  getOrders() {
    return new Promise(resolve => {
      resolve(OrdersMockData.orders);
    });
  }

  getOrder() {
    return new Promise(resolve => {
      resolve(OrdersMockData.orderDetail);
    });
  }

  cancelOrder(order_id: number) {
    return of(OrdersMockData.deleteOrder);
  }

  postCartItemList() {
    return new Promise(resolve => {
      resolve(OrdersMockData.postCartItemList);
    });
  }

  getFrequentlyBought() {
    return of(OrdersMockData.frequentlyBoughtSet);
  }

  getFrequentlyBoughtByMe() {
    return of(OrdersMockData.frequentlyBoughtByMeSet);
  }
}
