import { Component, OnInit, EventEmitter, Output, NgZone } from '@angular/core'
import { SessionService } from '../../services/authentication/session/session.service'
import { ProfileService } from '../../services/authentication/profile/profile.service'
import { CartService } from '../../services/cart/cart.service'
import { Constants } from '../../utils/constants'
import { Router } from '@angular/router'
import { LoginStateService } from '../../shared-services/login-state/login-state.service'
import { CartStateService } from '../../shared-services/cart-state/cart-state.service'
import { SearchItemService } from '../../shared-services/search-item/search-item.services'
import { MatSnackBar } from '@angular/material/snack-bar'
import { RouteService } from '../../shared-services/route/route.service'
import { ProductsService } from '../../services/products/products.service'
import { v4 as uuid } from 'uuid'
import { Common } from './../../utils/common'
import { GuestCartService } from '../../services/guests/guest-cart.service'

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>()
  isSignedIn: Boolean = false
  userName: string

  searchedText: string = ''
  bannerName: string = Constants.RAPIDO_BUILD
  durationInSeconds = 5
  cartCount: Number = 0
  private _productsService: ProductsService
  private _guestCartService: GuestCartService

  constructor(
    private _sessionService: SessionService,
    private _profileService: ProfileService,
    private _cartService: CartService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private _searchItemService: SearchItemService,
    private _cartStateService: CartStateService,
    private _loginStateService: LoginStateService,
    private RouteService: RouteService,
    productsService: ProductsService,
    guestCartService: GuestCartService,
    private ngZone: NgZone
  ) {
    this._productsService = productsService
    this._guestCartService = guestCartService
  }

  ngOnInit() {
    const promise = this._sessionService.retrieveSessionIfExists()
    if (!localStorage.getItem(Constants.RAPIDO_SESSION_ID)) {
      localStorage.setItem(Constants.RAPIDO_SESSION_ID, uuid())
    }
    promise
      .then((_) => {
        this._loginStateService.changeState(true)
        this.getCartCount()
      })
      .catch((error) => {
        //  this.openSnackBar(error.message);
        this.isSignedIn = false
        this.getCartCount()
      })
    this._loginStateService.isLoggedInState.subscribe((state) => {
      this.isSignedIn = state
      if (state) {
        this.userName = this._profileService.cognitoUser
          .getSignInUserSession()
          .getIdToken().payload.name
      }
      this.getCartCount()
    })
    this._cartStateService.cartCountState.subscribe((state) => {
      this.cartCount = state
    })
    // this.getCartCount()
  }

  closeMenu() {
    //this.dialog.close(this);
  }

  signOut() {
    var that = this
    this.signOutCall().then(function () {
      that._loginStateService.changeState(false)
      that._cartStateService.fetchAndUpdateCartCount(false)
      that.ngZone.run(() => that.router.navigate([''])).then()
    })
  }

  signOutCall(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._profileService.cognitoUser.signOut()
      resolve()
    })
  }

  onSearch(event) {
    if (this.searchedText) {
      let qObject = Common.searchProducts(this.searchedText)
      this.router.navigate(['/products'], { queryParams: qObject })
    }

    /* if(event.target[0] && event.target[0].value){
      // event.target[0].value = null  // Don't delete this line
      event.target[0].blur();
    } */
  }

  openSnackBar(message) {
    message &&
      this._snackBar.open(message, undefined, {
        duration: 4000,
      })
  }

  getCartCount() {
    if (this.isSignedIn) {
      this._cartService.getCountOfInCartItems().then((count: any) => {
        this.cartCount = count
        this._cartStateService.fetchAndUpdateCartCount(true)
      })
    } else {
      this._guestCartService.getCountOfGuestCartItems().then((count: any) => {
        this.cartCount = count

        this._cartStateService.fetchAndUpdateCartCount(false)
      })
    }
  }

  handleProfileNavigation() {
    this.RouteService.changeRoute('noQuestionnaire')
    this.ngZone.run(() => this.router.navigate(['profile'])).then()
  }
}
