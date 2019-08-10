import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../../app/services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {

  private cartCount = new BehaviorSubject<Number>(0);
  private _cartService: CartService
  
  cartCountState = this.cartCount.asObservable();

  constructor(cartService: CartService) {
    this._cartService = cartService
  }
  updateCartCount(count: Number) {
    this.cartCount.next(count)
  }

  async fetchAndUpdateCartCount(){
    await this._cartService.getCountOfInCartItems().
    then(count => this.updateCartCount(Number(count)))
 }
  
}
