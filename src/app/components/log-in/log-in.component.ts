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

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  alertBox: boolean = false
  alertMsg: string = ""
  _signInResponse: Boolean = false
  _previousRoute: any
  countryCode: string = Constants.DEFAULT_PHONE_CODE; //Constants.DEFAULT_PHONE_CODE;
  mobileNumber: string;
  password: string;
  isLoggedIn: Boolean
  progressSpinner: Boolean = false
  _profileService: ProfileService;

  private _signInService: SignInService
  constructor(
    signInService: SignInService,
    profileService: ProfileService,
    private router: Router,
    private loginStateService: LoginStateService,
    private cartStateService: CartStateService,
    private resendOtpService : ResendOtpService,
		private route: ActivatedRoute,
    private RouteService : RouteService,
    private ngZone: NgZone
    ) {
    this._signInService = signInService
    this._profileService = profileService
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

  login() {
    this.progressSpinner = true
    if(this.mobileNumber && this.password && this.mobileNumber.length === 10) {
      this._signInService.signInData = {
        Username: [ this.countryCode,this.mobileNumber ].join(""),
        Password: this.password
      }
      this._signInService.login().
      then(value => {
        this.progressSpinner = false
        this._signInResponse = true;
        this.loginStateService.changeState(true);
        if(this._previousRoute.value){
          this.ngZone.run(() =>this.router.navigate(['/'+this._previousRoute.value])).then()
        }else{
          this.ngZone.run(() =>this.router.navigate([''])).then()

        }
        this.cartStateService.fetchAndUpdateCartCount(true)
        
      }).catch(error => {
        this.progressSpinner = false
        this._signInResponse = false;
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
      this.progressSpinner = false;
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

  handleGuest() {
    this.ngZone.run(() =>this.router.navigate(['cart/guest-checkout'])).then()
  }
}
