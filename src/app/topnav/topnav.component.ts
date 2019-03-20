import { Component, OnInit, NgModule } from '@angular/core';
import { Constants } from '../utils/constants';
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  bannerName = Constants.RAPIDO_BUILD;
  logInLabel = "Sign In";
  cartLabel = "Cart";
  add_circle = "add_circle";

  constructor() { }

  ngOnInit() {
  }
}
