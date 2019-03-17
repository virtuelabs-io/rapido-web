import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  private bannerName = Constants.RAPIDO_BUILD;

  constructor() { }

  ngOnInit() {
  }

  private registerUser(){
    alert("Registering user");
  }

}
