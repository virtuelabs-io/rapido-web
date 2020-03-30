import { Component, OnInit, NgZone } from "@angular/core"
import { CartService } from "../../services/cart/cart.service"
import { Constants } from "../../utils/constants"
import { Common } from "../../utils/common"
import { CartItem } from "../../services/cart/cart-item"
import { MatSnackBar } from "@angular/material"
import { Router } from "@angular/router"
import { CartStateService } from "../../shared-services/cart-state/cart-state.service"
import { SessionService } from "../../services/authentication/session/session.service"
import { RouteService } from "../../shared-services/route/route.service"
import { LoginStateService } from "../../shared-services/login-state/login-state.service"
import { GuestCartService } from "../../services/guests/guest-cart.service"
import { GuestCartItem } from "src/app/services/guests/guest-cart-item"

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  freeDeliveryMinOrder: Number = Constants.MIN_ORDER_PRICE_FOR_FREE_DELIVERY
  freeDeliveryMessage: String = Constants.FREE_DELIVERY_MESSAGE
  freeDeliveryAtCheckout: String = Constants.SELECT_FREE_DELIVERY_AT_CHECKOUT
  CartDisclaimer: String = Constants.CART_DISCLAIMER
  _imageUrl: string = Constants.environment.staticAssets
  cartItems = []
  fetchRes: any
  cartAmount: any = 0
  freeDelivery: Boolean = false
  inCartItems: number = 0
  saveforLater = []
  inCart: Boolean = true
  laterUse: Boolean = false
  _snackBarMsg: string = ""
  isLoggedIn: Boolean
  deleteRes: any
  postCartItemsRes: any
  saveForLaterRes: any
  currency: any
  guestCartItem: GuestCartItem = new GuestCartItem()
  imageUrl: string =
    Constants.environment.staticAssets + "/images/empty-cart.jpg"
  public _cartService: CartService
  public _guestCartService: GuestCartService

  constructor(
    cartService: CartService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _cartStateService: CartStateService,
    private _sessionService: SessionService,
    private RouteService: RouteService,
    private _loginStateService: LoginStateService,
    private ngZone: NgZone,
    guestCartService: GuestCartService
  ) {
    this._cartService = cartService
    this._guestCartService = guestCartService
  }

  ngOnInit() {
    this._loginStateService.loaderEnable()
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists().then((_) => this.getCartItems())
  }

  async loginSessinExists() {
    await this._loginStateService.isLoggedInState.subscribe(
      (state) => (this.isLoggedIn = state)
    )
  }

  async handleError(err) {
    this.RouteService.changeRoute("cart")
    this.ngZone.run(() => this.router.navigate(["login"])).then()
  }

  async getCartItems() {
    this._loginStateService.loaderEnable()
    this.cartItems = []
    this.saveforLater = []
    this.cartAmount = 0
    if (this.isLoggedIn) {
      await this._cartService.getCartItems().then((data: any) => {
        this.fetchRes = data
        if (data.length) {
          this.currency = data[0].itemDetails.currency
        }
        for (var i = 0; i < data.length; i++) {
          if (data[i].cartItem.in_cart) {
            this.inCart = true
            this.cartAmount +=
              parseFloat(data[i].itemDetails.price) * data[i].cartItem.quantity
            this.cartItems.push({
              id: data[i].cartItem.product_id,
              icon: this._imageUrl + data[i].itemDetails.images[0],
              title: data[i].itemDetails.name,
              amount: parseFloat(data[i].itemDetails.price).toFixed(2),
              quantity: data[i].cartItem.quantity,
            })
          } else {
            this.laterUse = true
            this.saveforLater.push({
              id: data[i].cartItem.product_id,
              icon: this._imageUrl + data[i].itemDetails.images[0],
              title: data[i].itemDetails.name,
              amount: parseFloat(data[i].itemDetails.price).toFixed(2),
              quantity: data[i].cartItem.quantity,
            })
          }
        }
        this.cartAmount = +Number(this.cartAmount).toFixed(2)
        this.freeDeliveryCheck()
        if (!this.saveforLater.length) {
          this.laterUse = false
        }
        if (!this.cartItems.length) {
          this.inCart = false
        }
        this.inCartItems = this.cartItems.length
        this._cartStateService.updateCartCount(this.inCartItems)
        this._loginStateService.loaderDisable()
      })
    } else {
      await this._guestCartService.getGuestCartItems().then((data: any) => {
        this.fetchRes = data
        if (data.length) {
          this.currency = data[0].itemDetails.currency
        }
        for (var i = 0; i < data.length; i++) {
          this.inCart = true
          this.cartAmount +=
            parseFloat(data[i].itemDetails.price) *
            data[i].guestCartItem.quantity
          this.cartItems.push({
            id: data[i].guestCartItem.product_id,
            icon: this._imageUrl + data[i].itemDetails.images[0],
            title: data[i].itemDetails.name,
            amount: parseFloat(data[i].itemDetails.price).toFixed(2),
            quantity: data[i].guestCartItem.quantity,
          })
        }
        if (!this.cartItems.length) {
          this.inCart = false
        }
        this.cartAmount = +Number(this.cartAmount).toFixed(2)
        this.freeDeliveryCheck()
        this.inCartItems = this.cartItems.length
        this._cartStateService.updateCartCount(this.inCartItems)
        //  this._cartStateService.fetchAndUpdateCartCount(this.isLoggedIn)
        this._loginStateService.loaderDisable()
      })
    }
  }

  async deleteCartItem(id) {
    this._loginStateService.loaderEnable()
    if (this.isLoggedIn) {
      this._snackBarMsg = Constants.ITWM_DELETE_CART
      await this._cartService.deleteCartItem(id).subscribe((data) => {
        this.deleteRes = data
        this._snackBar.open(this._snackBarMsg, "", {
          duration: 5000,
        })
        this.getCartItems()
      })
    } else {
      this._snackBarMsg = Constants.ITWM_DELETE_CART
      this.guestCartItem.product_id = id
      this.guestCartItem.quantity = 1
      await this._guestCartService
        .deleteGuestCartItem(this.guestCartItem)
        .subscribe((data) => {
          this.deleteRes = data
          this._snackBar.open(this._snackBarMsg, "", {
            duration: 5000,
          })
          this.getCartItems()
        })
    }
  }

  // true - save for later , false - move to cart
  saveForLaterFn(id, quantity, bol) {
    if (this.isLoggedIn) {
      this._loginStateService.loaderEnable()
      let cartItem: CartItem = new CartItem()
      cartItem.product_id = id
      cartItem.quantity = quantity
      cartItem.in_cart = bol
      if (bol) {
        this._snackBarMsg = Constants.ITEM_MOVED_TO_CART
      } else {
        this._snackBarMsg = Constants.ITWM_SAVE_LATER
      }
      this._cartService.postCartItem(cartItem).subscribe((data) => {
        this.saveForLaterRes = data
        this._snackBar.open(this._snackBarMsg, "", {
          duration: 5000,
        })
        this.getCartItems()
      })
    } else {
      this.handleError("e")
    }
  }

  updateCartItem(
    product_id: number,
    quant: number,
    in_cart: boolean
  ): CartItem {
    let cartItem: CartItem = new CartItem()
    cartItem.product_id = product_id
    cartItem.quantity = quant
    cartItem.in_cart = in_cart
    return cartItem
  }

  postCartItems() {
    this._loginStateService.loaderEnable()
    let items = []
    if (this.isLoggedIn) {
      for (var i = 0; i < this.cartItems.length; i++) {
        items.push(
          this.updateCartItem(
            this.cartItems[i].id,
            this.cartItems[i].quantity,
            true
          )
        )
      }
      this._cartService.postCartItemList(items).subscribe((data) => {
        this.postCartItemsRes = data
        this._loginStateService.loaderDisable()
        this.ngZone.run(() => this.router.navigate(["cart/checkout"])).then()
      })
    } else {
      for (var i = 0; i < this.cartItems.length; i++) {
        items.push(
          this.updateCartItem(
            this.cartItems[i].id,
            this.cartItems[i].quantity,
            true
          )
        )
      }
      this._guestCartService.postGuestCartItemList(items).subscribe((data) => {
        this.postCartItemsRes = data
        this._loginStateService.loaderDisable()
        this.RouteService.changeRoute("cart/guest-checkout")
        this.ngZone.run(() => this.router.navigate(["login"])).then()
      })
    }
  }

  quantityChange(id, quantity) {
    this.cartAmount = 0
    for (var i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id === id) {
        if (!quantity) {
          this.cartItems[i].quantity = 1
          this._snackBar.open("Minimun one quantity selected", "", {
            duration: 5000,
          })
        } else {
          this.cartItems[i].quantity = quantity
        }
      }
      this.cartAmount +=
        parseFloat(this.cartItems[i].amount) * this.cartItems[i].quantity
    }
    this.cartAmount = +Number(this.cartAmount).toFixed(2)
    this.freeDeliveryCheck()
  }

  keyPress(event: any) {
    Common.allowPositiveNum(event)
  }

  freeDeliveryCheck() {
    if (this.cartAmount > this.freeDeliveryMinOrder) {
      this.freeDelivery = true
    } else {
      this.freeDelivery = false
    }
  }
}
