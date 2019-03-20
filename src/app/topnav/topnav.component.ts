import { Component, OnInit, NgModule } from '@angular/core';
import { Constants } from '../utils/constants';
import { SessionService } from '../services/authentication/session/session.service';
import { ProfileService } from '../services/authentication/profile/profile.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  bannerName = Constants.RAPIDO_BUILD;
  logInLabel = "Sign In";
  cartLabel = "Cart";
  add_circle = "add_circle";

  _profileService: ProfileService

  private _sessionService: SessionService

  constructor(sessionService: SessionService, profileService: ProfileService) {
    this._sessionService = sessionService
    this._profileService = profileService
  }

  ngOnInit() {
    const promise = this._sessionService.retrieveSessionIfExists()
    promise.then(value => {
      console.log(value)
    }).catch(error => {
      console.log(error)
    })
  }

  signOut(){
    this._profileService.cognitoUser.signOut()
  }
}
