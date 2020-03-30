import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { CartService } from '../../../app/services/cart/cart.service'
import { GuestCartService } from '../../services/guests/guest-cart.service'

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private cartCount = new BehaviorSubject<Number>(0)
  private _cartService: CartService
  private _guestCartService: GuestCartService

  cartCountState = this.cartCount.asObservable()

  constructor(cartService: CartService, guestCartService: GuestCartService) {
    this._cartService = cartService
    this._guestCartService = guestCartService
  }
  updateCartCount(count: Number) {
    this.cartCount.next(count)
  }

  async fetchAndUpdateCartCount(state: Boolean) {
    if (state) {
      await this._cartService
        .getCountOfInCartItems()
        .then((count) => this.updateCartCount(Number(count)))
    } else {
      await this._guestCartService
        .getCountOfGuestCartItems()
        .then((count) => this.updateCartCount(Number(count)))
    }
  }
}
