import { Component, OnInit, NgModule } from '@angular/core';
import { SessionService } from '../services/authentication/session/session.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { LoginStateService } from '../shared-services/login-state/login-state.service';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({})
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  isSignedIn: Boolean = false
  name: String
  searchedText: string = ''
  bannerName: String = Constants.RAPIDO_BUILD
  durationInSeconds = 5;

  constructor(private _sessionService: SessionService,
              private _profileService: ProfileService,
              public router: Router, // used in html
              private _snackBar: MatSnackBar,
              private _searchItemService: SearchItemService,
              private _loginStateService: LoginStateService) {}

  ngOnInit() {
    const promise = this._sessionService.retrieveSessionIfExists()
    promise.then( _ => {
      this._loginStateService.changeState(true);
    }).catch(error => {
      this.openSnackBar(error.message);
      this.isSignedIn = false
    })
    this._loginStateService.currentState.subscribe(state => {
      this.isSignedIn = state
      if (state) {
        this.name =  this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
      }
    })
  }

  signOut() {
    this._profileService.cognitoUser.signOut()
    this._loginStateService.changeState(false)
  }

  onSearch(e){
    // obj check later
    if(this.searchedText)
    this._searchItemService.changeState(this.searchedText);
  }

  openSnackBar(message) {
    message && this._snackBar.open(message,  undefined , {
      duration: 4000,
   });
  }
}
