import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Constants } from '../../utils/constants';
import { CartItem } from '../../services/cart/cart-item';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { CartStateService } from '../../shared-services/cart-state/cart-state.service';
import { SessionService } from '../../services/authentication/session/session.service';
import { RouteService } from '../../shared-services/route/route.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';

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
  inCart: Boolean = true
  laterUse: Boolean = false
  _snackBarMsg: string = ""
  isLoggedIn: Boolean
  imageUrl: string =  Constants.environment.staticAssets+'/images/empty-cart.jpg'
  private _cartService: CartService
  constructor(
    cartService: CartService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _cartStateService: CartStateService,
    private _sessionService: SessionService,
    private RouteService : RouteService,
    private _loginStateService: LoginStateService
  ) { 
    this._cartService = cartService
  }

   ngOnInit() {
    this._loginStateService.loaderEnable()
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists().
		then( _ => this.getCartItems()).
		catch(err => this.handleError(err))
  }

  async loginSessinExists() {
    await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
  }

 async handleError(err) {
  this.RouteService.changeRoute('cart')
  this.router.navigateByUrl('/login')
 }

 async getCartItems() {
  this.cartItems = []
  this.saveforLater = []
  this.cartAmount = 0
  if(this.isLoggedIn){
    await  this._cartService.getCartItems()
    .then((data: any) => {
      for(var i = 0; i < data.length; i++) {
        if(data[i].cartItem.in_cart) {
          this.inCart = true
          this.cartAmount += (parseFloat(data[i].itemDetails.price) * data[i].cartItem.quantity)
          this.cartItems.push({
            id: data[i].cartItem.product_id,
            icon: this._imageUrl+data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: parseFloat(data[i].itemDetails.price).toFixed(2),
            quantity: data[i].cartItem.quantity
          })
        }
        else {
          this.laterUse = true
          this.saveforLater.push({
            id: data[i].cartItem.product_id,
            icon: this._imageUrl+data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: parseFloat(data[i].itemDetails.price).toFixed(2),
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
      this._cartStateService.updateCartCount(this.inCartItems)
      this._loginStateService.loaderDisable()
    })
    } 
    else {
      await Promise.reject("Login Session doesn't exist!")
      this._loginStateService.loaderDisable()
    }
  }

  async deleteCartItem(id){
    this._snackBarMsg = Constants.ITWM_DELETE_CART
    await this._cartService.deleteCartItem(id)
    .subscribe( _ => {
      this._snackBar.open(this._snackBarMsg, "", {
        duration: 5000
      });
      this.getCartItems()
    })
  }

// true - save for later , false - move to cart
  saveForLaterFn(id, quantity, bol) {
    let cartItem: CartItem = new CartItem()
    cartItem.product_id = id
    cartItem.quantity = quantity
    cartItem.in_cart = bol
    if(bol) {
      this._snackBarMsg = Constants.ITEM_MOVED_TO_CART
    }
    else {
      this._snackBarMsg = Constants.ITWM_SAVE_LATER
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
    return cartItem
  }

  postCartItems() {
    let items = [];
    for(var i = 0; i < this.cartItems.length; i++) {
      items.push(this.updateCartItem(this.cartItems[i].id, this.cartItems[i].quantity, true))
    }
    this._cartService.postCartItemList(items)
      .subscribe(data2 => {
        this.router.navigate(['cart/checkout']);
      })
  }

  quantityChange(id, quantity) {
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
