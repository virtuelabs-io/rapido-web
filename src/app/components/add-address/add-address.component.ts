import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressDetails } from '../../services/customer/address-details';
import { AddressDetailsService } from '../../services/customer/address-details.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { RouteService } from '../../shared-services/route/route.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})

export class AddAddressComponent implements OnInit {
  _previousRoute: any = ""
  address_details_id: number
  name: string = ""
  addRes: any
  addressDetails: AddressDetails
  public _addressDetailsService: AddressDetailsService
  addressFormGroup: FormGroup // UI reactive Form Group variable

  constructor( private router: Router,
               addressDetailsService: AddressDetailsService,
               private location: Location,
               private RouteService: RouteService,
               private _loginStateService: LoginStateService
  ) { 
      this._addressDetailsService = addressDetailsService
    }

  ngOnInit() {
    this._previousRoute = this.RouteService.getRoute()
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
    this._loginStateService.loaderEnable()
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
      console.log(data)
      this.addRes = data
      if(data['insertId']) {
        this.address_details_id = data['insertId']
        this.location.back();
  // lets this code be commented. Dont remove this..
        
      /*  if(this._previousRoute.value == 'cart') {
          this.router.navigate(['cart/checkout']);
        }
        else if(this._previousRoute.value == 'profile') {
          this.router.navigate(['profile/address']);
        }
        else if(this._previousRoute.value == '') {
          this.location.back();
        }*/
      }
    })   
  }
  cancelAddAddress() {
    this.location.back();
   // this.router.navigate(['profile/address']);
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
	}
}