import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressDetails } from '../services/customer/address-details';
import { AddressDetailsService } from '../services/customer/address-details.service';
import { parse } from 'url';

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
  }
  address_details_id: number;
  address_details_result: string;
  name: string = ""
  addressItems = 
  {
    organisation: "",
    add1: "",
    add2: "",
    town_city: "",
    postcode: "",
    country: "",
    address_type_id:0,
    id: 0

  }
  addressDetails: AddressDetails;
  private _addressDetailsService: AddressDetailsService
  
  ngOnInit() {
    let id = parseInt(this.router.snapshot.paramMap.get('id'))
    console.log(id)

    this._addressDetailsService.getAddressDetails(id)
    .subscribe(data => {
      console.log(data)
      this.addressItems.organisation = data.full_name
      this.addressItems.add1 = data.addr_1
      this.addressItems.add2 = data.addr_2
      this.addressItems.town_city = data.city
      this.addressItems.postcode = data.postcode
      this.addressItems.country = data.country
      this.addressItems.address_type_id = data.address_type_id
      this.addressItems.id = data.id
      this.address_details_result = "Sucessfully fetched address details and logged!";
    })
  }
  saveAddress() {
    let SId: string = this.addressItems.id.toString()
    console.log(this.addressItems)
    this.addressDetails = new AddressDetails(  
      this.addressItems.organisation,
      this.addressItems.address_type_id, // check Constants.ADDRESS_TYPES for different types of addresses. Only those should be used
      this.addressItems.add1,
      this.addressItems.town_city,
      "county",
      this.addressItems.country,
      this.addressItems.postcode,
      this.addressItems.add2,
      SId
    )
    
    this.addressDetails.full_name = this.addressItems.organisation
    this.addressDetails.id = this.addressItems.id
    this.addressDetails.addr_1 = this.addressItems.add1
    this.addressDetails.addr_2 = this.addressItems.add2
    this.addressDetails.city = this.addressItems.town_city
    this.addressDetails.postcode = this.addressItems.postcode
    this.addressDetails.country = this.addressItems.country
    this.addressDetails.address_type_id = this.addressItems.address_type_id
    this._addressDetailsService.putAddressDetails(this.addressDetails)
    .subscribe(data => {
      this.address_details_result = "Sucessfully updated customer address details and logged!";
    })
  }
}