import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Constants } from '../utils/constants';
import { CartItem } from '../services/cart/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  _imageUrl: string = Constants.environment.staticAssets
  cartItems = []
  saveforLater = []
  private _cartService: CartService
  constructor(
    cartService: CartService
  ) { 
    this._cartService = cartService
  }

  ngOnInit() {
    this.getCartItems()
  }

  getCartItems() {
    this.cartItems = []
    this._cartService.getCartItems()
    .then((data: any) => {
      for(var i = 0; i < data.length; i++) {
        if(data[i].cartItem.in_cart) {
          this.cartItems.push({
            id: data[i].cartItem.product_id,
            icon: this._imageUrl+data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: data[i].itemDetails.price,
            qunatity: data[i].cartItem.quantity
          })
        }
        else {
          this.saveforLater.push({
            id: data[i].cartItem.product_id,
            icon: this._imageUrl+data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: data[i].itemDetails.price,
            qunatity: data[i].cartItem.quantity
          })
        }
      }
    })
  }

  deleteCartItem(id) {
    this._cartService.deleteCartItem(id)
    .subscribe(data => {
      this.getCartItems()
    })
  } 

  saveForLater(id, quantity) {
    let cartItem: CartItem = new CartItem()
    cartItem.product_id = id
    cartItem.quantity = quantity
    cartItem.in_cart = false
    this._cartService.postCartItem(cartItem)
    .subscribe(data => {
      this.getCartItems()
    })
  }
}
