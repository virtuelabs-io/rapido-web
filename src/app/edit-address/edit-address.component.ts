import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressDetails } from '../services/customer/address-details';
import { AddressDetailsService } from '../services/customer/address-details.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  public addressId;
  constructor(
    private router: ActivatedRoute,
    addressDetailsService: AddressDetailsService
  ) {
    this._addressDetailsService = addressDetailsService 
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation.extras.state as {example: string};
    // if(state != undefined){
    //   // this.example = state.example;
    // }
  }
  address_details_id: number;
  address_details_result: string;
  name: string = ""
  addressItems = 
  {
    organisation: "",
    add1: "46 Broadway",
    add2: "Address Line 2",
    town_city: "Pontypridd",
    postcode: "CF37 1BD",
    country: "United Kingdom"

  }
  addressDetails: AddressDetails;
  private _addressDetailsService: AddressDetailsService
  
  ngOnInit() {
    let id = parseInt(this.router.snapshot.paramMap.get('id'))
    console.log(id)
  }

}
