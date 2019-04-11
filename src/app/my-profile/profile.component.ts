import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileItems = [
    {
      icon: "#shopping-bag",
      title: "My Orders",
      description: "Track, return or buy things again"
    },
    {
      icon: "#black-and-white-credit-cards",
      title: "My Payment",
      description: "Edit or add payment methods"
    },
    {
      icon: "#address",
      title: "To Be Added",
      description: "To Be Added"
    },
    {
      icon: "#delivery-truck",
      title: "My Delivery Addresses",
      description: "Track, return or buy things again",
      route: "profile/address"
    },
    {
      icon: "#settings-work-tool",
      title: "Account Settings",
      description: "Set up your account",
      route: "profile/accountInfo"
    },
    {
      icon: "#log-in",
      title: "To Be Added",
      description: "To Be Added"
    }
    
  ]
  constructor(){}

  ngOnInit() {}

}
