import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  example:string;
  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {example: string};
    if(state != undefined){
      this.example = state.example;
      console.log(this.example)
    }
   
  }

  ngOnInit() {
  }

}
