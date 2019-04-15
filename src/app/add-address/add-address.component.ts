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
      organisation: "Anirup Patnaik",
      add1: "46 Broadway",
      add2: "Address Line 2",
      town_city: "Pontypridd",
      postcode: "CF37 1BD",
      country: "United Kingdom"

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
