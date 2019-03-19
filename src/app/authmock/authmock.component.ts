import { Component, OnInit } from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import { ProfileService } from '../services/profile/profile.service';
import { SignUpService } from '../services/authentication/sign-up/sign-up.service';
import { ResendConfirmationCodeService } from '../services/authentication/resend-confirmation-code/resend-confirmation-code.service';

@Component({
  selector: 'app-authmock',
  templateUrl: './authmock.component.html',
  styleUrls: ['./authmock.component.scss']
})
export class AuthmockComponent implements OnInit {

  _profileService: ProfileService;

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

  _userRegistered: Boolean = false;
  _resentConfirmationCode: Boolean = false;

  private _signUpService: SignUpService
  private _resendConfirmationCodeService: ResendConfirmationCodeService


  constructor(
    signUpService: SignUpService,
    profileService: ProfileService,
    resendConfirmationCodeService: ResendConfirmationCodeService
    ) {
    this._signUpService = signUpService
    this._profileService = profileService
    this._resendConfirmationCodeService = resendConfirmationCodeService
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
      this._userRegistered = true;
      console.log(value) // response from successfull resolve
      console.log(this._profileService.cognitoUser); // updated user profile
    }).catch(error => {
      this._userRegistered = false;
      console.log(error) // response from a graceful reject
    })
  }

  resendConfirmationCode(){
    const promise = this._resendConfirmationCodeService.resendConfirmationCode()
    promise.then(value => {
      this._resentConfirmationCode = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._resentConfirmationCode = false;
      console.log(error) // response from a graceful reject
    })
  }
}
