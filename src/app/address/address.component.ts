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
//   address = [
  
// ]
  example:any;
  constructor( 
    private router: Router,
    addressDetailsService: AddressDetailsService
  ) { 
    this._addressDetailsService = addressDetailsService
    const navigation = this.router.getCurrentNavigation();
    // const state = navigation.extras.state as {example: string};
    // if(state != undefined){
    //   this.example = state.example;
    // }

    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      console.log(data)
      if(data['length'] > 0){
        this.address_details_id = data[0]['id']
        this.address = data
        console.log("find address below")
        console.log('Sucessfully updated the address test id to: ' + String(this.address_details_id))
      }
      this.address_details_result = "Sucessfully fetched address details List and logged!";
    })
   
  }

  ngOnInit() {
    this.showSpinner = true
    // setTimeout(() => {
    //   this.showSpinner = false
    // }, 5000)
    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      console.log(data)
      if(data['length'] > 0){
        this.address_details_id = data[0]['id']
        this.address = data
        console.log("find address below")
        console.log('Sucessfully updated the address test id to: ' + String(this.address_details_id))
      }
      this.address_details_result = "Sucessfully fetched address details List and logged!";
      this.showSpinner = false
    })
  }
  addressDelete(id) {
    this._addressDetailsService.deleteAddressDetails(id)
    .subscribe(data => {
      console.log(data)
      this.address_details_id = null
      this.address_details_result = "Sucessfully deleted customer address details and logged!";
    })
    this.router.navigate(['profile']);
  }
  addressEdit(id) {
    this.router.navigate(['profile/address/editAddress', id]);
  }
}