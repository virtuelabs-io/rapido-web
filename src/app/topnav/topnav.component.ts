import { Component, OnInit, NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import { SessionService } from '../services/authentication/session/session.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { Constants } from '../utils/constants';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginStateService } from '../shared-services/login-state/login-state.service';

@NgModule({})
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  isSignedIn: Boolean
  userIcon: Boolean
  name: String = ""
  loggedInAs: String = ""
  bannerName: String = Constants.RAPIDO_BUILD
  myControl = new FormControl();

  constructor(
    private _sessionService: SessionService,
    private _profileService: ProfileService,
    private _location: Location,
    private router: Router,
    private loginStateService: LoginStateService ) {}

  ngOnInit() {
    let localName = this.name
    const promise = this._sessionService.retrieveSessionIfExists()
    promise.then(value => {
      this.isSignedIn = false
      this.userIcon = true
      this._profileService.cognitoUser.getUserAttributes(function(err, result){
        if (err) {
        //  reject(new Response( 1, err.message, err ))
        }
        localName = result[7].getValue()
      })
      this.name =  this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name

      this.loggedInAs = Constants.LOGGED_IN_AS;
    }).catch(error => {
      this.isSignedIn = true
      this.userIcon = false
    })

    this.loginStateService.currentState.subscribe(state => {
      if (state) {
        this.isSignedIn = false
        this.userIcon = true
        if(!this.name) {
          this._profileService.cognitoUser.getUserAttributes(function(err, result){
            if (err) {
            //  reject(new Response( 1, err.message, err ))
            }
            localName = result[7].getValue()
          })
          this.name =  this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
          this.loggedInAs = Constants.LOGGED_IN_AS;
        }
      } else {
        if(this.router.url == '/login') {
          this.isSignedIn = false
          this.userIcon = false
        }
        else {
          this.isSignedIn = true
          this.userIcon = false
        }
      }
    })
  }

 signOut(){
    this._profileService.cognitoUser.signOut()
    this.loginStateService.changeState(false)
  }

  searchProducts(e){
    console.log(e)
  }

  liveSearch(e){
    console.log(e)
  }
}
