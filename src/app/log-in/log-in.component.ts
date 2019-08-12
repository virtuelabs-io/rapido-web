import { Component, OnInit, NgModule } from '@angular/core';
import { SignInService } from '../services/authentication/sign-in/sign-in.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../utils/constants';
import { LoginStateService } from '../shared-services/login-state/login-state.service';
import { CartStateService } from '../shared-services/cart-state/cart-state.service';
import { ResendOtpService } from '../shared-services/resend-otp/resend-otp.services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  alertBox: boolean = false
  alertMsg: string = ""
  _signInResponse: Boolean = false;
  countryCode: string = Constants.DEFAULT_PHONE_CODE; //Constants.DEFAULT_PHONE_CODE;
  mobileNumber: string;
  password: string;
  progressSpinner: Boolean = false
  _profileService: ProfileService;

  private _signInService: SignInService
  redirectToCart: any;
  constructor(
    signInService: SignInService,
    profileService: ProfileService,
    private router: Router,
    private loginStateService: LoginStateService,
    private cartStateService: CartStateService,
    private resendOtpService : ResendOtpService,
		private route: ActivatedRoute,
    private location: Location
    ) {
    this._signInService = signInService
    this._profileService = profileService
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
			this.redirectToCart = params.redirectToCart;
		});
   this.loginStateService.changeState(false);
  }

  closeAlert() {
    this.alertBox = false;
  }

  navigateToForgotPassword() {
    this.router.navigateByUrl('/forgotpassword');
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
        console.log(this._profileService.cognitoUser);
        this._signInResponse = true;
        this.loginStateService.changeState(true);
        if(this.redirectToCart){
          this.location.back();
        }else{
          this.router.navigateByUrl('/');
        }
        this.cartStateService.fetchAndUpdateCartCount()
        
      }).catch(error => {
        this.progressSpinner = false
        this._signInResponse = false;
        this.alertBox = true;
        this.alertMsg = error.data.message
        this.password = ""
        if(error.data.code === "UserNotConfirmedException") {
          this.resendOtpService.changeNumber(this.mobileNumber);
          this.router.navigateByUrl('/resendotp');
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
}
