import { Injectable } from '@angular/core';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { GuestCartItem } from './guest-cart-item';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { Constants } from '../../utils/constants';
import { Query } from '../products/query.interface';
import { of } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { GuestCartItemDetails } from './guest-cart-item-details';
import { GuestCartMockData } from './guest-cart.mock.data';
import { GuestCartService } from './guest-cart.service';

@Injectable({
  providedIn: 'root'
})
export class GuestCartMockService extends GuestCartService {
  public _productService: ProductsService;

  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService,
    productService?: ProductsService
  ) {
    super(_http, _profileService);
    this._productService = productService;
  }

  getGuestCartItems() {
    return new Promise(resolve => {
      resolve(GuestCartMockData.getCartItems);
    });
  }

  getCountOfGuestCartItems() {
    return new Promise(resolve => {
      resolve(GuestCartMockData.cartCount);
    });
  }

  postGuestCartItem(guestCartItem: GuestCartItem) {
    return of(GuestCartMockData.postCartItem);
  }

  postGuestCartItemList(guestCartItems: GuestCartItem[]) {
    return of(GuestCartMockData.postCartItemList);
  }

  deleteGuestCartItem(guestCartItem: GuestCartItem) {
    return of(GuestCartMockData.deleteCartItem);
  }

  deleteGuestCartItems() {
    return this.delete(
      [
        Constants.GUESTS_APIS.api,
        localStorage.getItem(Constants.RAPIDO_SESSION_ID),
        'cart',
        'items'
      ].join('/')
    );
  }
}
