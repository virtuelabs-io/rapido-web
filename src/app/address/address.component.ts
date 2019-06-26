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
  address_details_id: number;
  address_details_result: string;
  private _addressDetailsService: AddressDetailsService
  address: any
  example:any;
  constructor( 
    private router: Router,
    addressDetailsService: AddressDetailsService
  ) {
    this._addressDetailsService = addressDetailsService
    this.getAddressList()
  }

  ngOnInit() {
    this.showSpinner = true
    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      if(data['length'] > 0){
        this.address_details_id = data[0]['id']
        this.address = data
      }
      this.address_details_result = "Sucessfully fetched address details List and logged!";
      this.showSpinner = false
    })
  }

  getAddressList() {
    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      if(data['length'] > 0){
        this.address_details_id = data[0]['id']
        this.address = data
      }
      this.address_details_result = "Sucessfully fetched address details List and logged!";
    })
  }

  addressDelete(id) {
    this._addressDetailsService.deleteAddressDetails(id)
    .subscribe(data => {
      this.address_details_id = null
      this.address_details_result = "Sucessfully deleted customer address details and logged!";
      this.getAddressList()
    })
  }
  addressEdit(id) {
    this.router.navigate(['profile/address/editAddress', id])
  }
}