import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressDetails } from '../services/customer/address-details';
import { AddressDetailsService } from '../services/customer/address-details.service';
import { parse } from 'url';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  showSpinner: Boolean = false
  addressItems = {
    organisation: "",
    add1: "",
    add2: "",
    town_city: "",
    postcode: "",
    country: "",
    address_type_id:0,
    id: 0
  }
  addressDetails: AddressDetails
  private _addressDetailsService: AddressDetailsService
  addressFormGroup: FormGroup // UI reactive Form Group variable

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    addressDetailsService: AddressDetailsService
  ) {
    this._addressDetailsService = addressDetailsService 
  }
  
  ngOnInit() {
    this.addressFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      add1: new FormControl('', [Validators.required]),
      add2: new FormControl('', [Validators.required]),
      town_city: new FormControl('', [Validators.required]),
      postCode: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    })
    
    this.showSpinner = true
    let id = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    console.log(id)

    this._addressDetailsService.getAddressDetails(id)
    .subscribe(data => {
      this.showSpinner = false
      this.addressItems.organisation = data.full_name
      this.addressItems.add1 = data.addr_1
      this.addressItems.add2 = data.addr_2
      this.addressItems.town_city = data.city
      this.addressItems.postcode = data.postcode
      this.addressItems.country = data.country
      this.addressItems.address_type_id = data.address_type_id
      this.addressItems.id = data.id
    })
  }
  saveAddress() {
    this.showSpinner = true
    let id: string = this.addressItems.id.toString()
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
      id
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
    .subscribe( _ => {
      this.showSpinner = false
      this.router.navigate(['profile/address'])
    })
  }

  cancelAddAddress() {
    this.router.navigate(['profile/address'])
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
	}
}