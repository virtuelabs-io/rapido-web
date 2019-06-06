import { Component, OnInit, NgModule } from '@angular/core';
import { SignInService } from '../services/authentication/sign-in/sign-in.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { Router } from '@angular/router';

@NgModule({
  
  
})
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  headerText: string = "Sign in to Rapidobuild.com"
  alertBox: boolean = false
  alertMsg: string = ""
  _signInResponse: Boolean = false;
  countryCode: string = "+91";
  _mobileNumber: string;
  _password: string;
  _progressSpinner: Boolean = false
  _profileService: ProfileService;

  private _signInService: SignInService
  constructor(
    signInService: SignInService,
    profileService: ProfileService,
    private router: Router
    ) { 
    this._signInService = signInService   
    this._profileService = profileService
  }

  ngOnInit() {
  }
  
  closeAlert(e){
    this.alertBox = false;
  }

  signIn(evt){
    this._progressSpinner = true
    this._signInService.signInData = {
      Username: this._mobileNumber,
      Password: this._password
    }

    const promise = this._signInService.signIn()
    promise.then(value => {
      this._progressSpinner = false
      console.log(this._profileService.cognitoUser);
      this._signInResponse = true;
      console.log(value) // response from successfull resolve
      this.router.navigateByUrl('/');
    }).catch(error => {
      this._progressSpinner = false
      this._signInResponse = false;
      this.alertBox = true;
      this.alertMsg = error.data.message
      this._password = ""
      console.log(error) // response from a graceful reject
    })
  }

}