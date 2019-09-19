import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/authentication/session/session.service';
import { RouteService } from '../../shared-services/route/route.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  logInStatus: boolean = false
  _previousRoute: any
  showQuestionnaire: boolean = true
  profileItems = [
    {
      icon: "#shopping-bag",
      title: "My Orders",
      description: "Track, return or buy things again",
      route: "/orders",
      id: '1'
    },
    {
      icon: "#company-details", 
      title: "Company Details",
      description: "Add your company details",
      route: "/profile/companyDetails",
      id: '2'
    },
    {
      icon: "#rating",
      title: "My Reviews",
      description: "Track all your reviews",
      route: "/profile/my-reviews",
      id: '3'
    },
    {
      icon: "#delivery-truck",
      title: "My Addresses",
      description: "Track, return or buy things again",
      route: "/profile/address",
      id: '4'
    },
    {
      icon: "#settings-work-tool",
      title: "Account Settings",
      description: "Set up your account",
      route: "/profile/account",
      id: '5'
    },
    {
      icon: "#log-in",
      title: "To Be Added",
      description: "To Be Added",
      id: '6'
    }
    
  ]
  constructor(
    private _sessionService: SessionService,
    private RouteService: RouteService
  ){}

  ngOnInit() {
    const promise = this._sessionService.retrieveSessionIfExists()
    promise.then( _ => {
      this.logInStatus = true
    }).catch(error => {
      this.logInStatus = false
    })

    this._previousRoute = this.RouteService.getRoute()
    if(this._previousRoute.value == 'noQuestionnaire') {
      this.showQuestionnaire = false
    }
    else if(this._previousRoute.value == 'questionnaire') {
      this.showQuestionnaire = true
    }
    else {
      this.showQuestionnaire = false
    }
  }
}