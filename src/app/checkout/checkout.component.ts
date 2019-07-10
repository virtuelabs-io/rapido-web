import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ChargeService } from '../services/payment/charge.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { Charge } from '../services/payment/charge';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { AddressDetailsService } from '../services/customer/address-details.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  
  showSpinner: Boolean = false
  address_details_id: number
  private _addressDetailsService: AddressDetailsService
  address: any
  example:any
  

  constructor(
   // private fb: FormBuilder, // by Sangram
    private _formBuilder: FormBuilder,
    private stripeService: StripeService,
    private chargeService: ChargeService,

    private router: Router,
    addressDetailsService: AddressDetailsService
  ) {
    this._addressDetailsService = addressDetailsService
    this.showSpinner = true
    this.getAddressList()
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.showSpinner = true
    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      if(data['length'] > 0) {
        this.address_details_id = data[0]['id']
        this.address = data
      }
      this.showSpinner = false
    })
  }

  getAddressList() {
    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      this.showSpinner = false
      if(data['length'] > 0) {
        this.address_details_id = data[0]['id']
        this.address = data
      }
      else if(data['length'] === 0) {
        this.address = data
      }
    })
  }

  addressDelete(id) {
    this.showSpinner = true
    this._addressDetailsService.deleteAddressDetails(id)
    .subscribe(data => {
      this.address_details_id = null
      this.getAddressList()
    })
  }
  addressEdit(id) {
    this.router.navigate(['profile/address/editAddress', id])
  }
}
