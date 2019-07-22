import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Constants } from '../utils/constants';
import { CartItem } from '../services/cart/cart-item';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  _imageUrl: string = Constants.environment.staticAssets
  cartItems = []
  cartAmount: any = 0
  inCartItems: number = 0
  saveforLater = []
  inCart: Boolean
  laterUse: Boolean = false
  _snackBarMsg: string = ""
  private _cartService: CartService
  constructor(
    cartService: CartService,
    private _snackBar: MatSnackBar,
    private router: Router
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
          this.cartAmount += (parseFloat(data[i].itemDetails.price) * data[i].cartItem.quantity)
          this.cartItems.push({
            id: data[i].cartItem.product_id,
            icon: this._imageUrl+data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: data[i].itemDetails.price,
            quantity: data[i].cartItem.quantity
          })
        }
        else {
          this.laterUse = true
          this.saveforLater.push({
            id: data[i].cartItem.product_id,
            icon: this._imageUrl+data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: data[i].itemDetails.price,
            quantity: data[i].cartItem.quantity
          })
        }
      }
      this.cartAmount = this.cartAmount.toFixed(2)
      if(!this.saveforLater.length) {
        this.laterUse = false
      }
      if(!this.cartItems.length) {
        this.inCart = false
      }
      this.inCartItems = this.cartItems.length
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

  updateCartItem(product_id: number, quant: number, in_cart: boolean): CartItem {
    let cartItem: CartItem = new CartItem()
    cartItem.product_id = product_id
    cartItem.quantity = quant
    cartItem.in_cart = in_cart
    console.log("Updated product with id:", cartItem.product_id)
    return cartItem
  }

  postCartItems() {
    let items = [];
    for(var i = 0; i < this.cartItems.length; i++) {
      items.push(this.updateCartItem(this.cartItems[i].id, this.cartItems[i].quantity, true))
    }
    this._cartService.postCartItemList(items)
      .subscribe(data2 => {
        console.log("Cart confirmed data", data2)
        this.router.navigate(['cart/checkout']);
      })
  }

  quantityChange(id, quantity) {
    console.log(id,quantity)
    this.cartAmount = 0
    for(var i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].id === id) {
        if(quantity == 0) {
          this.cartItems[i].quantity = 1
          this._snackBar.open('Minimun one quantity selected', "", {
            duration: 5000
          });
        }
        else {
          this.cartItems[i].quantity = quantity
        }
      }
      this.cartAmount += (parseFloat(this.cartItems[i].amount) * this.cartItems[i].quantity)
    }
    this.cartAmount = this.cartAmount.toFixed(2)
  }
}
