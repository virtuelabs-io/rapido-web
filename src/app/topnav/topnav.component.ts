import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  bannerName = Constants.RAPIDO_BUILD;
  logInLabel = "Log In";
  cartLabel = "Cart";

  constructor() { }

  handleLogIn(event) {
    console.log('handleLogIn', event);
    alert("User logged In");
  }

  handleCart(event){
    alert("cart clicked");
  }

  ngOnInit() {
  }
}
