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
      country: new FormControl('', [Validators.required]),
      address_type_id: new FormControl(0, [Validators.required]),
      id: new FormControl(0, [Validators.required]),
      county: new FormControl(''),
      customer_id: new FormControl('')
    })
    this.showSpinner = true
    let id = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    this._addressDetailsService.getAddressDetails(id)
    .subscribe(data => {
      this.showSpinner = false
      this.addressFormGroup.controls["name"].setValue(data.full_name)
      this.addressFormGroup.controls["add1"].setValue(data.addr_1)
      this.addressFormGroup.controls["add2"].setValue(data.addr_2)
      this.addressFormGroup.controls["town_city"].setValue(data.city)
      this.addressFormGroup.controls["postCode"].setValue(data.postcode)
      this.addressFormGroup.controls["country"].setValue(data.country)
      this.addressFormGroup.controls["address_type_id"].setValue(data.address_type_id)
      this.addressFormGroup.controls["id"].setValue(data.id)
    })
  }
  saveAddress() {
    let id: number = parseInt(this.addressFormGroup.value.id)
    let address_type_id: number = parseInt(this.addressFormGroup.value.address_type_id)
    this.showSpinner = true
    this.addressDetails = new AddressDetails(  
      this.addressFormGroup.value.name,
      address_type_id,
      this.addressFormGroup.value.add1,
      this.addressFormGroup.value.town_city,
      this.addressFormGroup.value.county,
      this.addressFormGroup.value.country,
      this.addressFormGroup.value.postCode,
      this.addressFormGroup.value.add2,
      this.addressFormGroup.value.customer_id,
      id
    )
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