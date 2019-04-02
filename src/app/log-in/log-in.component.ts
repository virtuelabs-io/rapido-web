import { Component, OnInit } from '@angular/core';
import { SignInService } from '../services/authentication/sign-in/sign-in.service';
import { ProfileService } from '../services/authentication/profile/profile.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  _signInResponse: Boolean = false;
  _mobileNumber: string;
  _password: string;
  _profileService: ProfileService;

  private _signInService: SignInService
  constructor(
    signInService: SignInService,
    profileService: ProfileService
    ) { 
    this._signInService = signInService   
    this._profileService = profileService
  }

  ngOnInit() {
  }

  signIn(evt){
    this._signInService.signInData = {
      Username: this._mobileNumber,
      Password: this._password
    }

    const promise = this._signInService.signIn()
    promise.then(value => {
      console.log(this._profileService.cognitoUser);
      this._signInResponse = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._signInResponse = false;
      console.log(error) // response from a graceful reject
    })
  }

}
