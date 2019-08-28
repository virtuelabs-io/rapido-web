import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { TopnavComponent } from '../topnav/topnav.component';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { ProfileService } from '../../services/authentication/profile/profile.service';
import { CartStateService } from '../../shared-services/cart-state/cart-state.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  providers: [TopnavComponent],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild('commandbarSidenav') public sidenav: MatSidenav;
  isSignedIn: Boolean = false
  name: string
  cartCount:Number = 0
  userLoggedIn: Boolean
  constructor(
    private commandBarSidenavService: TopnavComponent,
    private _loginStateService: LoginStateService,
    private _profileService: ProfileService,
    private _cartStateService: CartStateService
  ) { }

  ngOnInit() {
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
    this.userLoggedIn = false
  }
}
