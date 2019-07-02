import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressDetailsService } from '../services/customer/address-details.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  showSpinner: Boolean = false
  address_details_id: number
  private _addressDetailsService: AddressDetailsService
  address: any
  example:any;
  constructor( 
    private router: Router,
    addressDetailsService: AddressDetailsService
  ) {
    this._addressDetailsService = addressDetailsService
    this.showSpinner = true
    this.getAddressList()
  }

  ngOnInit() {
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