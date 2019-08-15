import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/authentication/session/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  logInStatus: boolean = false
  profileItems = [
    {
      icon: "#shopping-bag",
      title: "My Orders",
      description: "Track, return or buy things again",
      route: "/orders"
    },
    {
      icon: "#company-details", 
      title: "Company Details",
      description: "Add your company details",
      route: "/profile/companyDetails"
    },
    {
      icon: "#black-and-white-credit-cards",
      title: "To Be Added",
      description: "To Be Added"
    },
    {
      icon: "#delivery-truck",
      title: "My Addresses",
      description: "Track, return or buy things again",
      route: "/profile/address"
    },
    {
      icon: "#settings-work-tool",
      title: "Account Settings",
      description: "Set up your account",
      route: "/profile/account"
    },
    {
      icon: "#log-in",
      title: "To Be Added",
      description: "To Be Added"
    }
    
  ]
  constructor(
    private _sessionService: SessionService
  ){}

  ngOnInit() {
    const promise = this._sessionService.retrieveSessionIfExists()
    promise.then( _ => {
      this.logInStatus = true
    }).catch(error => {
      this.logInStatus = false
    })
  }

}