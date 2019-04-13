import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  address = [
    // {
    //   mobileNumber: "7032908112",
    //   name: "Anirup Patnaik",
    //   pincode: "560100",
    //   streetAdd: "B-104, Euphoria Corporate Leisure Apartments",
    //   city: "Bangalore",
    //   state: "Karnataka",
    //   country: "India"
    // },
    // {
    //   mobileNumber: "7032908112",
    //   name: "Anirup Patnaik",
    //   pincode: "560100",
    //   streetAdd: "B-104, Euphoria Corporate Leisure Apartments",
    //   city: "Bangalore",
    //   state: "Karnataka",
    //   country: "India"
    // }
]
  example:any;
  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {example: string};
    if(state != undefined){
      this.example = state.example;
      // console.log(this.example)

      this.address[0] = this.example
    }
   
  }

  ngOnInit() {
    console.log(this.example)
    // this.address = this.example
  }

}
