import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {

  private cartCount = new BehaviorSubject<Number>(0);
  
  cartCountState = this.cartCount.asObservable();

  constructor() {}
  updateCartCount(count: Number) {
    this.cartCount.next(count)
  }
  
}
