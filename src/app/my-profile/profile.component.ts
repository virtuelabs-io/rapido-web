import { Component, OnInit, NgModule } from '@angular/core';

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
      description: "Track, return or buy things again",
      route: "/orders"
    },
    {
      icon: "#black-and-white-credit-cards",
      title: "My Payment",
      description: "Edit or add payment methods",
      route: "profile/payment"
    },
    {
      icon: "#company-details", 
      title: "Company Details",
      description: "Add your company details",
      route: "/profile/companyDetails"
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
  constructor(){}

  ngOnInit() {}

}