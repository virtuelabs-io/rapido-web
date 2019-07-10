import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressDetails } from '../services/customer/address-details';
import { AddressDetailsService } from '../services/customer/address-details.service';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Constants } from '../utils/constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})

export class AddAddressComponent implements OnInit {
  address_details_id: number
  name: string = ""
  showSpinner: Boolean = false
  addressDetails: AddressDetails
  private _addressDetailsService: AddressDetailsService
  addressFormGroup: FormGroup // UI reactive Form Group variable

  constructor( private router: Router,
               addressDetailsService: AddressDetailsService,
               private location: Location
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
      county: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    })
  }
  addAddress(formData) {
    this.showSpinner = true
    this.addressDetails = new AddressDetails(  
      formData.name,
      //Constants.ADDRESS_TYPES[0].value,
      1, // check Constants.ADDRESS_TYPES for different types of addresses. Only those should be used
      formData.add1,
      formData.town_city,
      formData.county,
      formData.country,
      formData.postCode,
      formData.add2
    )
    this._addressDetailsService.postAddressDetails(this.addressDetails)
    .subscribe(data => {
      if(data['insertId']) {
        this.address_details_id = data['insertId']
        this.location.back();
      }
    })
    //this.location.back();
   // this.router.navigate(['profile/address']);
  }
  cancelAddAddress() {
    this.location.back();
   // this.router.navigate(['profile/address']);
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
	}
}