import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AddressDetails } from '../services/customer/address-details';
import { AddressDetailsService } from '../services/customer/address-details.service';

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
  address_details_id: number;
  address_details_result: string;
  addressItems = 
    {
      organisation: "Anirup Patnaik",
      add1: "46 Broadway",
      add2: "Address Line 2",
      town_city: "Pontypridd",
      postcode: "CF37 1BD",
      country: "United Kingdom"

    }
    addressDetails: AddressDetails = new AddressDetails(
      this.addressItems.organisation,
      1, // check Constants.ADDRESS_TYPES for different types of addresses. Only those should be used
      this.addressItems.add1,
      this.addressItems.town_city,
      "county",
      this.addressItems.country,
      this.addressItems.postcode,
      this.addressItems.add2
    )  
  
    private _addressDetailsService: AddressDetailsService
    constructor( private router: Router,
               addressDetailsService: AddressDetailsService
    ) { 
      this._addressDetailsService = addressDetailsService
    }

  ngOnInit() {
  }
  addAddress() {
    this._addressDetailsService.postAddressDetails(this.addressDetails)
    .subscribe(data => {
      console.log(data)
      if(data['insertId']){
        this.address_details_id = data['insertId']
        console.log('Sucessfully updated the address test id to: ' + String(this.address_details_id))
      }
      this.address_details_result = "Sucessfully posted address company details and logged!";
    })
    const navigationExtras: NavigationExtras = {state: {example: 'This is an example'}};
    this.router.navigate(['profile/address'], { state: { example: this.addressItems } });
  }

}
