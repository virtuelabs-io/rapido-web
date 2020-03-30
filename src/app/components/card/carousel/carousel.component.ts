import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Directive
} from '@angular/core'
import { CartItem } from '../../../services/cart/cart-item'
import { CartService } from '../../../services/cart/cart.service'
import { CartStateService } from '../../../shared-services/cart-state/cart-state.service'
import { LoginStateService } from '../../../shared-services/login-state/login-state.service'
import { Router } from '@angular/router'
import { RouteService } from '../../../shared-services/route/route.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Constants } from '../../../../../src/app/utils/constants'
import { GuestCartService } from '../../../services/guests/guest-cart.service'
import { GuestCartItem } from '../../../services/guests/guest-cart-item'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() carouselCard = []
  @Input() carouselConfig = {}
  @Input() carouselTitle = ''
  carouselData: any
  config: any
  isLoggedIn: Boolean
  private _cartService: CartService
  private _guestCartService: GuestCartService

  constructor(
    private cartService: CartService,
    private _cartStateService: CartStateService,
    private _loginStateService: LoginStateService,
    public router: Router,
    private RouteService: RouteService,
    private _snackBar: MatSnackBar,
    guestCartService: GuestCartService
  ) {
    this._cartService = cartService
    this._guestCartService = guestCartService
  }

  ngOnInit() {
    this.config = this.carouselConfig
    this.carouselData = this.formatData(
      this.carouselCard,
      this.config.itemsInTemplate
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    this.config = this.carouselConfig
    this.carouselData = this.formatData(
      this.carouselCard,
      this.config.itemsInTemplate
    )
  }

  formatData(data: any[], itemsInTemplate: number) {
    let formatedData = []
    let tmpItems = []
    if (data) {
      data.forEach((item) => {
        item.mrpPrice = (item.price * (1 + parseFloat(item.offer))).toFixed(2)
        item.discountedPrice = (item.mrpPrice - item.price).toFixed(2)
        item.price = Number(item.price).toFixed(2)

        tmpItems.push(item)
        if (tmpItems.length === itemsInTemplate) {
          formatedData.push(tmpItems)

          tmpItems = []
        }
      })
      if (tmpItems.length > 0) {
        formatedData.push(tmpItems)
        tmpItems = []
      }
    }
    return formatedData
  }

  async handleCart(id) {
    await this.loginSessinExists().then((_) => this.postCartItem(id))
  }

  async loginSessinExists() {
    await this._loginStateService.isLoggedInState.subscribe(
      (state) => (this.isLoggedIn = state)
    )
  }

  async postCartItem(id) {
    this._loginStateService.loaderEnable()
    if (this.isLoggedIn) {
      let cartItem: CartItem = new CartItem()
      cartItem.product_id = parseInt(id)
      cartItem.quantity = 1
      cartItem.in_cart = true
      await this._cartService.postCartItem(cartItem).subscribe((_) => {
        this._cartStateService.fetchAndUpdateCartCount(this.isLoggedIn)
        this._loginStateService.loaderDisable()
        this._snackBar.open(Constants.ITEM_MOVED_TO_CART, undefined, {
          duration: 4000
        })
      })
    } else {
      let guestCartItem: GuestCartItem = new GuestCartItem()
      guestCartItem.product_id = parseInt(id)
      guestCartItem.quantity = 1
      this._guestCartService.postGuestCartItem(guestCartItem).subscribe((_) => {
        this._cartStateService.fetchAndUpdateCartCount(this.isLoggedIn)
        this._loginStateService.loaderDisable()
        this._snackBar.open(Constants.ITEM_MOVED_TO_CART, undefined, {
          duration: 4000,
          horizontalPosition: 'center'
        })
      })
    }
  }

  async handleError(err) {
    this.RouteService.changeRoute('')
    this.router.navigateByUrl('/login')
  }
}
