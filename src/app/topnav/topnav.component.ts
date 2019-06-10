import { Component, OnInit, NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import { SessionService } from '../services/authentication/session/session.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { Constants } from '../utils/constants';
import { Location } from '@angular/common';

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

  constructor( 
               private _sessionService: SessionService, 
               private _profileService: ProfileService, 
               private _location: Location ) {}
  
  ngOnInit() {
    let localName = this.name
    const promise = this._sessionService.retrieveSessionIfExists()
    // console.log(this._location.path())
    promise.then(value => {
      this.signInTag = false
      this.userIcon = true
      this._profileService.cognitoUser.getUserAttributes(function(err, result){
        if (err) {
        //  reject(new Response( 1, err.message, err ))
        }
        localName = result[7].getValue()
      })
      this.name =  this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
      
      this.signIn = "Signed In As"
    }).catch(error => {
      this.signInTag = true
      this.userIcon = false
    })
  }

  public signOut(){
    this._profileService.cognitoUser.signOut()
  }

  searchProducts(e){
    console.log(e)
  } 
  
  liveSearch(e){
    console.log(e)
  } 
}