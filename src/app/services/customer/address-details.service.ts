import { Injectable } from '@angular/core'
import { RapidoHttpService } from '../commons/rapido-http.service'
import { AddressDetails } from './address-details'
import { HttpClient } from '@angular/common/http'
import { ProfileService } from '../authentication/profile/profile.service'
import { Constants } from '../../utils/constants'

@Injectable({
  providedIn: 'root',
})
export class AddressDetailsService extends RapidoHttpService<AddressDetails> {
  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService
  ) {
    super(_http, _profileService)
  }

  getAddressDetailsList() {
    return this.getList(
      Constants.CUSTOMER_APIS.address.apiList,
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  getAddressDetails(id: number) {
    return this.get(
      [Constants.CUSTOMER_APIS.address.api, String(id)].join('/'),
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  postAddressDetails(addressDetails: AddressDetails) {
    return this.post(
      Constants.CUSTOMER_APIS.address.api,
      addressDetails,
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  putAddressDetails(addressDetails: AddressDetails) {
    return this.put(
      [Constants.CUSTOMER_APIS.address.api, String(addressDetails.id)].join(
        '/'
      ),
      addressDetails,
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  deleteAddressDetails(id: number) {
    return this.delete(
      [Constants.CUSTOMER_APIS.address.api, String(id)].join('/'),
      this.addAuthHeader(this.initializeHeaders())
    )
  }
}
