import { Injectable } from '@angular/core';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { AddressDetails } from './address-details';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { of } from 'rxjs';
import { AddressDetailsMockData } from './address-details.mock.data';
import { AddressDetailsService } from './address-details.service';

@Injectable({
  providedIn: 'root'
})
export class AddressDetailsMockService extends AddressDetailsService{

  constructor(protected _http?: HttpClient, protected _profileService?: ProfileService) {
    super(_http, _profileService)
  }

  getAddressDetailsList(){
    return of(AddressDetailsMockData.addressList)
  }

  getAddressDetails(id: number){
    return of(AddressDetailsMockData.address)
  }

  postAddressDetails(addressDetails: AddressDetails){
    return of(AddressDetailsMockData.postAddress)
  }

  putAddressDetails(addressDetails: AddressDetails){
    return of(AddressDetailsMockData.putAddress)
  }

  deleteAddressDetails(id: number){
    return of(AddressDetailsMockData.deleteAddress)
  }
}
