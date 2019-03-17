import { AuthenticationService } from '../services/authentication/base/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import { ProfileService } from '../services/profile/profile.service';
import { SignUpService } from '../services/authentication/sign-up/sign-up.service';

@Component({
  selector: 'app-authmock',
  templateUrl: './authmock.component.html',
  styleUrls: ['./authmock.component.scss']
})
export class AuthmockComponent implements OnInit {

  private _profileService: ProfileService;

  private _registration: Registration = new Registration(
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
  private _userRegistered: Boolean = false;

  private _signUpService: SignUpService

  constructor(signUpService: SignUpService, profileService: ProfileService) {
    this._signUpService = signUpService
    this._profileService = profileService
  }

  ngOnInit() {
  }

  private registerUser(){
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
}
