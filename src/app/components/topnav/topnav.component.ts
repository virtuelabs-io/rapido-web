import { Component, OnInit, NgModule, EventEmitter, Output  } from '@angular/core';
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
              productsService: ProductsService) {
                this._productsService = productsService
              }

  ngOnInit() {
    const promise = this._sessionService.retrieveSessionIfExists()
    if (!localStorage.getItem(Constants.RAPIDO_SESSION_ID)){
      console.log("New session created!")
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
    this.router.navigateByUrl('')
  }

  onSearch(event){
    /* if(this.searchedText){
      let fieldsQuery = {
        price: {
          q: null,
          text: null
        },
        rating: {
          q: null,
          text: null
        }
      }
      let qObject = {
        q: this.searchedText,
        searchedText: this.searchedText,
        releatedSearch: null,
        fieldsQuery: JSON.stringify(fieldsQuery),
        size: 15,
        cursor: null,
        return: null,
        start: 0,
        sort: null,
        parser:'structured',
        qdotparser:null
      }
      this.router.navigate(['/products'], { queryParams: { search: JSON.stringify(qObject) } })
    } */
    let qObject = Common.searchProducts(this.searchedText)
    if(qObject){
      this.router.navigate(['/products'], { queryParams: { search: JSON.stringify(qObject) } })
    }
    event.target.blur();
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
    this.router.navigateByUrl('/profile')
  }
}
