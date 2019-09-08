import { Component, OnInit, NgModule, EventEmitter, Output, NgZone  } from '@angular/core';
import { SessionService } from '../../services/authentication/session/session.service';
import { ProfileService } from '../../services/authentication/profile/profile.service';
import { CartService } from '../../services/cart/cart.service';
import { Constants } from '../../utils/constants';
import { Router } from '@angular/router';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { CartStateService } from '../../shared-services/cart-state/cart-state.service';
import { SearchItemService } from '../../shared-services/search-item/search-item.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteService } from '../../shared-services/route/route.service';
import { ProductsService } from '../../services/products/products.service';
import { v4 as uuid } from 'uuid';
import { Common } from './../../utils/common'

@NgModule({})
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  isSignedIn: Boolean = false
  name: String
  searchedText: string = ''
  bannerName: String = Constants.RAPIDO_BUILD
  durationInSeconds = 5
  cartCount:Number = 0
  private _productsService: ProductsService
  constructor(private _sessionService: SessionService,
              private _profileService: ProfileService,
              private _cartService: CartService,
              public router: Router,
              private _snackBar: MatSnackBar,
              private _searchItemService: SearchItemService,
              private _cartStateService: CartStateService,
              private _loginStateService: LoginStateService,
              private RouteService : RouteService,
              productsService: ProductsService,
              private ngZone: NgZone) {
                this._productsService = productsService
              }

  ngOnInit() {
    const promise = this._sessionService.retrieveSessionIfExists()
    if (!localStorage.getItem(Constants.RAPIDO_SESSION_ID)){
      localStorage.setItem(Constants.RAPIDO_SESSION_ID, uuid())
    }
    promise.then( _ => {
      this._loginStateService.changeState(true);
      this.getCartCount()
    }).catch(error => {
    //  this.openSnackBar(error.message);
      this.isSignedIn = false
    })
    this._loginStateService.isLoggedInState.subscribe(state => {
      this.isSignedIn = state
      if (state) {
        this.name =  this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
      }
    })
    this._cartStateService.cartCountState.subscribe(state => {
      this.cartCount = state;
    })
  }

  signOut() {
    this._profileService.cognitoUser.signOut()
    this._loginStateService.changeState(false)
    this._cartStateService.updateCartCount(0)
    this.ngZone.run(() =>this.router.navigate([''])).then()
  }

  onSearch(event){
    let qObject = Common.searchProducts(this.searchedText)
    if(qObject){
      this.router.navigate(['/products'], { queryParams: qObject })
    }
    if(event.target[0] && event.target[0].value){
      // event.target[0].value = null  // Don't delete this line
      event.target[0].blur();
    }
  }

  openSnackBar(message) {
    message && this._snackBar.open(message,  undefined , {
      duration: 4000,
   });
  }

  getCartCount(){
    this._cartService.getCountOfInCartItems()
        .then((count: any) => {
          this.cartCount = count
        })
  }

  handleProfileNavigation() {
    this.RouteService.changeRoute('noQuestionnaire');
    this.ngZone.run(() =>this.router.navigate(['profile'])).then()
  }
}
