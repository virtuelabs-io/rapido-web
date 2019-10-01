import { Component, OnInit, NgZone } from '@angular/core';
import { SignInService } from '../../services/authentication/sign-in/sign-in.service';
import { ProfileService } from '../../services/authentication/profile/profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../utils/constants';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { CartStateService } from '../../shared-services/cart-state/cart-state.service';
import { ResendOtpService } from '../../shared-services/resend-otp/resend-otp.services';
import { RouteService } from '../../shared-services/route/route.service';
import { CartService } from '../../services/cart/cart.service';
import { GuestCartService } from '../../services/guests/guest-cart.service';
import { CartItem } from '../../services/cart/cart-item';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  alertBox: boolean = false
  alertMsg: string = ""
  _signInResponse: Boolean = false
  cartCount:Number = 0
  _previousRoute: any
  countryCode: string = Constants.DEFAULT_PHONE_CODE; //Constants.DEFAULT_PHONE_CODE;
  mobileNumber: string;
  password: string;
  isLoggedIn: Boolean
  guestCartItems:  any
  gotoRoute: any
  _profileService: ProfileService;
  private _guestCartService: GuestCartService
  private _signInService: SignInService
  constructor(
    signInService: SignInService,
    profileService: ProfileService,
    private router: Router,
    private loginStateService: LoginStateService,
    private cartStateService: CartStateService,
    private resendOtpService : ResendOtpService,
		private route: ActivatedRoute,
    public RouteService : RouteService,
    private ngZone: NgZone,
    private _cartStateService: CartStateService,
    private _cartService: CartService,
    guestCartService: GuestCartService
    ) {
    this._signInService = signInService
    this._profileService = profileService
    this._guestCartService = guestCartService
  }

  ngOnInit() {
    this.loginStateService.loaderDisable()
    this._previousRoute = this.RouteService.getRoute()
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists().
		then( _ => this.moveToPreviousRoute()).
		catch(err => this.handleError(err))
  }

  async loginSessinExists() {
    await (this.loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
  }

  async handleError(err) {
    this.RouteService.changeRoute('cart')
    this.router.navigateByUrl('/login')
  }

  async moveToPreviousRoute() {
    if(this.isLoggedIn) {
      this.router.navigateByUrl('')
    }  
    else {
      this.loginStateService.changeState(false)
    }
  }

  closeAlert() {
    this.alertBox = false;
  }

  navigateToForgotPassword() {
    this.ngZone.run(() =>this.router.navigate(['forgotpassword'])).then()
  }
  
  async handleUserlogin() {
   // this.loginStateService.loaderEnable()
    await this.fetchGuestCart().
    then( _ => this.login()).
    then(_=> this.postGuestCart())
  }

  async postGuestCart() {
    this.loginStateService.loaderEnable()
    let items = [];
    for(var i = 0; i < this.guestCartItems.length; i++) {
      items.push(this.updateCartItem(this.guestCartItems[i].guestCartItem.product_id, this.guestCartItems[i].guestCartItem.quantity, true))
    }
    if(items.length) {
      this._cartService.postCartItemList(items)
      .subscribe( data => {
        this.loginStateService.loaderDisable()
      })
    }
    else {
      this.loginStateService.loaderDisable()
    }
  }

  updateCartItem(product_id: number, quant: number, in_cart: boolean): CartItem {
    let cartItem: CartItem = new CartItem()
    cartItem.product_id = product_id
    cartItem.quantity = quant
    cartItem.in_cart = in_cart
    return cartItem
  }

  async fetchGuestCart() {
    // fetching the guest cart items if any....
    await this._guestCartService.getGuestCartItems()
    .then((data: any) => {
      this.guestCartItems = data
    })
  }

  async login() {
    this.loginStateService.loaderEnable()
    if(this.mobileNumber && this.password && this.mobileNumber.length === 10) {
      this._signInService.signInData = {
        Username: [ this.countryCode,this.mobileNumber ].join(""),
        Password: this.password
      }
      await this._signInService.login().
      then(value => {
        this._signInResponse = true;
        this.loginStateService.changeState(true);
        this.cartStateService.fetchAndUpdateCartCount(true)
        this.loginStateService.loaderDisable()
        if(this._previousRoute.value && this._previousRoute.value !== 'cart/guest-checkout'){
          this.gotoRoute = this._previousRoute.value
          this.RouteService.changeRoute('')
          this.ngZone.run(() =>this.router.navigate(['/'+this.gotoRoute])).then()
        }
        else if(this._previousRoute.value && this._previousRoute.value == 'cart/guest-checkout') {
          this.RouteService.changeRoute('')
          this.ngZone.run(() =>this.router.navigate(['/cart'])).then()
        }
        else{
          this.ngZone.run(() =>this.router.navigate([''])).then()
        }
        
      }).catch(error => {
        this.loginStateService.loaderDisable()
        this._signInResponse = false
        this.alertBox = true;
        this.alertMsg = error.data.message
        this.password = ""
        if(error.data.code === "UserNotConfirmedException") {
          this.resendOtpService.changeNumber(this.mobileNumber)
          this.ngZone.run(() =>this.router.navigate(['resendotp'])).then()
        }
      })
    }
    else {
      this.alertBox = true;
      if(!this.mobileNumber) {
        this.alertMsg = Constants.NO_MOBILE_NUMBER;
      }
      else if(this.mobileNumber.length !== 10) {
        this.alertMsg = Constants.INVALID_MOBILE_NUMBER;
      }
      else if(!this.password) {
        this.alertMsg = Constants.NO_PASSWORD;
      }
    }
  }

  async handleGuest() {
    if(this._previousRoute.value){
      this.ngZone.run(() =>this.router.navigate(['/'+this._previousRoute.value])).then()
    }
    else {
      this.ngZone.run(() =>this.router.navigate([''])).then()
    }
  }
}