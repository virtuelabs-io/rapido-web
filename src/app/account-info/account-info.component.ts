import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  accountItems = [
    {
      key: "name",
      value: "Anirup",
      button: "Edit"
    },
    {
      key: "Email",
      value: "Anirup",
      button: "Edit"
    },
    {
      key: "Mobile Number",
      value: "Anirup",
      button: "Edit"
    }
    
  ]

  constructor() { }

  ngOnInit() {
  }

}
