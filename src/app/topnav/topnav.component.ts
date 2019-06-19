import { Component, OnInit, NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import { SessionService } from '../services/authentication/session/session.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { ProductsService } from '../services/products/products.service';
import { Constants } from '../utils/constants';
import { Query } from '../services/products/query.interface';

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
  // options: string[] = ['One', 'Two', 'Three'];

  private  _profileService: ProfileService
  private _sessionService: SessionService
  private _productsService: ProductsService

  _query: Query = {
    q: "watches",
    size: 1,
    cursor: null, // always use either cursor or start, but bot both
    start: null, // always use either cursor or start, but bot both
    sort: null
  }

  constructor(sessionService: SessionService,
    productsService: ProductsService, 
    profileService: ProfileService) {
    this._sessionService = sessionService
    this._profileService = profileService
    this._productsService = productsService
  }

  ngOnInit() {
    let localName = this.name
    const promise = this._sessionService.retrieveSessionIfExists()
    promise.then(value => {
      this.signInTag = false
      this.userIcon = true
      console.log(this._profileService.cognitoUser); 
      this._profileService.cognitoUser.getUserAttributes(function(err, result){
        if (err) {
        //  reject(new Response( 1, err.message, err ))
        }
        console.log('read me first')
        console.log(result)
        console.log(result[7].getValue())
        console.log('my name')
        console.log(localName)
        localName = result[7].getValue()
      })
      this.name =  this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
      
      this.signIn = "Signed In As"
      console.log(this.name)
      console.log(value)
    }).catch(error => {
      this.signInTag = true
      this.userIcon = false
      console.log(error)
    })

    
  }

  onSearch(e){
    debugger
    this._productsService.get(this._query)
      .subscribe(data => {
        console.log(data)
        
        // this._productsFetched = true;
      })
  }

  public signOut(){
    alert('success')
    this._profileService.cognitoUser.signOut()
  }
}
