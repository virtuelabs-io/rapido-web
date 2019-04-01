import { Component, OnInit, NgModule, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Constants } from '../utils/constants';
import { SessionService } from '../services/authentication/session/session.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import {MediaMatcher} from '@angular/cdk/layout';

@NgModule({})
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  fillerNav = [
    "My Profile",
    "Departments",
    "Log Out"
    ];

  fillerContent = Array.from({length: 50}, () =>
     `Rapido Build`);

  private _mobileQueryListener: () => void;

  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true//[/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  bannerName = Constants.RAPIDO_BUILD;
  logInLabel = "Sign In";
  cartLabel = "Cart";
  add_circle = "add_circle";
  _width = window.innerWidth;

  _profileService: ProfileService

  private _sessionService: SessionService

  constructor(sessionService: SessionService, profileService: ProfileService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this._sessionService = sessionService
    this._profileService = profileService
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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

  whatClass(){
    console.log(this._width)
    return 'col-sm-6 d-none'
  }
}
