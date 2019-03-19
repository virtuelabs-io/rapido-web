import { Component, OnInit } from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import { ProfileService } from '../services/profile/profile.service';
import { SignUpService } from '../services/authentication/sign-up/sign-up.service';
import { ResendConfirmationCodeService } from '../services/authentication/resend-confirmation-code/resend-confirmation-code.service';
import { ConfirmRegistrationService } from '../services/authentication/confirm-registration/confirm-registration.service';

@Component({
  selector: 'app-authmock',
  templateUrl: './authmock.component.html',
  styleUrls: ['./authmock.component.scss']
})
export class AuthmockComponent implements OnInit {

  _profileService: ProfileService;

  _confirmationCode: string;

  _registration: Registration = new Registration(
    "+447783307487",
    "reddy.horcrux@gmail.com",
    "Sangram Reddy",
    "Sangram1992",
    "true",
    "true",
    "true",
    "true",
    "true"
  );

  _userRegisteredResponse: Boolean = false;
  _resentConfirmationCodeResponse: Boolean = false;
  _confirmRegistrationResponse: Boolean = false;

  private _signUpService: SignUpService
  private _resendConfirmationCodeService: ResendConfirmationCodeService
  private _confirmRegistrationService: ConfirmRegistrationService


  constructor(
    signUpService: SignUpService,
    profileService: ProfileService,
    resendConfirmationCodeService: ResendConfirmationCodeService,
    confirmRegistrationService: ConfirmRegistrationService
    ) {
    this._signUpService = signUpService
    this._profileService = profileService
    this._resendConfirmationCodeService = resendConfirmationCodeService,
    this._confirmRegistrationService = confirmRegistrationService
  }

  ngOnInit() {
  }

  registerUser(){
    this._registration.createAttributeList()
    this._signUpService.signUpData = {
      phone_number: this._registration.phone_number,
      password: this._registration.password,
      attributeList: this._registration.attributeList
    }

    const promise = this._signUpService.signUp()
    promise.then(value => {
      this._userRegisteredResponse = true;
      console.log(value) // response from successfull resolve
      console.log(this._profileService.cognitoUser); // updated user profile
    }).catch(error => {
      this._userRegisteredResponse = false;
      console.log(error) // response from a graceful reject
    })
  }

  resendConfirmationCode(){
    const promise = this._resendConfirmationCodeService.resendConfirmationCode()
    promise.then(value => {
      this._resentConfirmationCodeResponse = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._resentConfirmationCodeResponse = false;
      console.log(error) // response from a graceful reject
    })
  }

  confirmRegistration(){
    const promise = this._confirmRegistrationService.confirmRegistration(this._confirmationCode)
    promise.then(value => {
      this._confirmRegistrationResponse = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._confirmRegistrationResponse = false;
      console.log(error) // response from a graceful reject
    })
  }
}
