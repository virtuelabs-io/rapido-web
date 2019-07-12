import { Injectable } from '@angular/core';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { CartItem } from './cart-item';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService extends RapidoHttpService<CartItem> {

  constructor(protected _http: HttpClient, protected _profileService: ProfileService) {
    super(_http, _profileService)
  }

  getCartItems(){
    return this.getList([Constants.CART_APIS.api, 'items'].join("/"),this.addAuthHeader(this.initializeHeaders()))
  }

  getInCartItems(){
    return this.getList([Constants.CART_APIS.api, 'in-cart-items'].join("/"),this.addAuthHeader(this.initializeHeaders()))
  }

  getSavedForLaterCartItems(){
    return this.getList([Constants.CART_APIS.api, 'saved-for-later-items'].join("/"),this.addAuthHeader(this.initializeHeaders()))
  }

  postCartItem(cartItem: CartItem){
    return this.post([Constants.CART_APIS.api, 'item'].join("/"), cartItem, this.addAuthHeader(this.initializeHeaders()))
  }

  postCartItemList(cartItems: CartItem[]){
    return this.postList([Constants.CART_APIS.api, 'items'].join("/"), cartItems , this.addAuthHeader(this.initializeHeaders()))
  }

  deleteCartItem(product_id: number){
    return this.delete([Constants.CART_APIS.api, 'item',String(product_id)].join("/"),this.addAuthHeader(this.initializeHeaders()))
  }

  deleteInCartItems(){
    return this.delete([Constants.CART_APIS.api, 'in-items'].join("/"),this.addAuthHeader(this.initializeHeaders()))
  }
}
