import { Injectable } from '@angular/core';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { OrdersMockData } from './orders.mock.data';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersMockService extends OrdersService{

    public _productService: ProductsService
    
    constructor(protected _http?: HttpClient, protected _profileService?: ProfileService, productService?: ProductsService) {
        super(_http, _profileService)
        this._productService = productService
      }

      getOrders() {
        return new Promise(resolve=>{
            resolve(OrdersMockData.orders)
        })
      }
}
