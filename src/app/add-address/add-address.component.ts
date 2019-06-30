import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressDetails } from '../services/customer/address-details';
import { AddressDetailsService } from '../services/customer/address-details.service';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})

export class AddAddressComponent implements OnInit {
  address_details_id: number;
  address_details_result: string;
  name: string = ""
  showSpinner: Boolean = false
  addressItems = 
  {
    name: "",
    add1: "46 Broadway",
    add2: "Address Line 2",
    town_city: "Pontypridd",
    postcode: "CF37 1BD",
    country: "United Kingdom"

  }
  addressDetails: AddressDetails;
  private _addressDetailsService: AddressDetailsService
  addressFormGroup: FormGroup // UI reactive Form Group variable

  constructor( private router: Router,
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
  }
  addAddress(formData) {
    this.showSpinner = true
    this.addressDetails = new AddressDetails(  
      formData.name,
      1, // check Constants.ADDRESS_TYPES for different types of addresses. Only those should be used
      formData.add1,
      formData.town_city,
      "county",
      formData.country,
      formData.postcode,
      formData.add2
    )
    console.log(this.addressDetails)
    this._addressDetailsService.postAddressDetails(this.addressDetails)
    .subscribe(data => {
      console.log(data)
      if(data['insertId']){
        this.address_details_id = data['insertId']
        console.log('Sucessfully updated the address test id to: ' + String(this.address_details_id))
      }
      this.address_details_result = "Sucessfully posted address company details and logged!";
    })
    // const navigationExtras: NavigationExtras = {state: {example: 'This is an example'}};
    this.router.navigate(['profile/address']);
  }
  cancelAddAddress() {
    this.router.navigate(['profile/address']);
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
	}
}