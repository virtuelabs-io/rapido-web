import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
// export interface Food {
//   value: string;
//   viewValue: string;
// }

export class AddAddressComponent implements OnInit {
  addressItems = 
    {
      mobileNumber: "7032908112",
      name: "Anirup Patnaik",
      pincode: "560100",
      streetAdd: "B-104, Euphoria Corporate Leisure Apartments",
      city: "Bangalore",
      state: "Karnataka"

    }
  
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
  constructor( private router: Router ) { }

  ngOnInit() {
  }
  addAddress() {
    // console.log(this.addressItems)
    const navigationExtras: NavigationExtras = {state: {example: 'This is an example'}};
    this.router.navigate(['profile/address'], { state: { example: this.addressItems } });
  }

}
