import { Component, OnInit, NgModule } from '@angular/core';
import { SignInService } from '../services/authentication/sign-in/sign-in.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@NgModule({
  
  
})
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  _signInResponse: Boolean = false;
  _mobileNumber: string;
  _password: string;
  _progressSpinner: Boolean = false
  _profileService: ProfileService;
  // _matSnackBar: MatSnackBar;

  private _signInService: SignInService
  constructor(
    signInService: SignInService,
    profileService: ProfileService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { 
    this._signInService = signInService   
    this._profileService = profileService
  }

  ngOnInit() {
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
      this.snackBar.open("User Signed In Successfully", "", {
        duration: 2000,
      });
    }).catch(error => {
      this._progressSpinner = false
      this._signInResponse = false;
      this.snackBar.open(error.data.message , "", {
        duration: 2000,
      });
      this._password = ""
      this._mobileNumber = ""
      console.log(error) // response from a graceful reject
    })
  }

}
