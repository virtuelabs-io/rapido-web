import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Constants } from '../utils/constants';
import { CartItem } from '../services/cart/cart-item';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  _imageUrl: string = Constants.environment.staticAssets
  cartItems = []
  saveforLater = []
  inCart: Boolean
  laterUse: Boolean = false
  _snackBarMsg: string = ""
  private _cartService: CartService
  constructor(
    cartService: CartService,
    private _snackBar: MatSnackBar
  ) { 
    this._cartService = cartService
  }

  ngOnInit() {
    this.getCartItems()
  }

  getCartItems() {
    this.cartItems = []
    this.saveforLater = []
    this._cartService.getCartItems()
    .then((data: any) => {
      for(var i = 0; i < data.length; i++) {
        if(data[i].cartItem.in_cart) {
          this.inCart = true
          this.cartItems.push({
            id: data[i].cartItem.product_id,
            icon: this._imageUrl+data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: data[i].itemDetails.price,
            qunatity: data[i].cartItem.quantity
          })
        }
        else {
          this.laterUse = true
          this.saveforLater.push({
            id: data[i].cartItem.product_id,
            icon: this._imageUrl+data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: data[i].itemDetails.price,
            qunatity: data[i].cartItem.quantity
          })
        }
      }
      if(!this.saveforLater.length) {
        this.laterUse = false
      }
      if(!this.cartItems.length) {
        this.inCart = false
      }
    })
  }

  deleteCartItem(id) {
    this._snackBarMsg = "Item has been deleted !"
    this._cartService.deleteCartItem(id)
    .subscribe(data => {
      this._snackBar.open(this._snackBarMsg, "", {
        duration: 5000
      });
      this.getCartItems()
    })
  }

// true - save for later , false - move to cart
  saveForLater(id, quantity, bol) {
    let cartItem: CartItem = new CartItem()
    cartItem.product_id = id
    cartItem.quantity = quantity
    cartItem.in_cart = bol
    if(bol) {
      this._snackBarMsg = "Item has been moved to cart"
    }
    else {
      this._snackBarMsg = "Item has been saved for later"
    }
    this._cartService.postCartItem(cartItem)
    .subscribe(_ => {
      this._snackBar.open(this._snackBarMsg, "", {
        duration: 5000
      });
      this.getCartItems()
    })
  }
}
