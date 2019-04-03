import { Component, OnInit, NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import { SessionService } from '../services/authentication/session/session.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { Constants } from '../utils/constants';

@NgModule({})
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  signInTag: Boolean
  userIcon: Boolean
  name: String = ""
  signIn: String = ""
  bannerName: String = Constants.RAPIDO_BUILD

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  _profileService: ProfileService

  private _sessionService: SessionService

  constructor(sessionService: SessionService, profileService: ProfileService) {
    this._sessionService = sessionService
    this._profileService = profileService
  }

  ngOnInit() {
    const promise = this._sessionService.retrieveSessionIfExists()
    promise.then(value => {
      this.signInTag = false
      this.userIcon = true
      console.log(this._profileService.cognitoUser); 
      this.name = this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
      
      this.signIn = "Signed In As"
      console.log(this.name)
      console.log(value)
    }).catch(error => {
      this.signInTag = true
      this.userIcon = false
      console.log(error)
    })
  }

  public signOut(){
    alert('success')
    this._profileService.cognitoUser.signOut()
  }
}
