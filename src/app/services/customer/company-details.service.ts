import { Injectable } from '@angular/core'
import { RapidoHttpService } from '../commons/rapido-http.service'
import { CompanyDetails } from './company-details'
import { HttpClient } from '@angular/common/http'
import { ProfileService } from '../authentication/profile/profile.service'
import { Constants } from '../../utils/constants'

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailsService extends RapidoHttpService<CompanyDetails> {
  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService
  ) {
    super(_http, _profileService)
  }

  getCompanyDetails() {
    return this.get(
      Constants.CUSTOMER_APIS.company.api,
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  postCompanyDetails(companyDetails: CompanyDetails) {
    return this.post(
      Constants.CUSTOMER_APIS.company.api,
      companyDetails,
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  putCompanyDetails(companyDetails: CompanyDetails) {
    return this.put(
      Constants.CUSTOMER_APIS.company.api,
      companyDetails,
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  deleteCompanyDetails() {
    return this.delete(
      Constants.CUSTOMER_APIS.company.api,
      this.addAuthHeader(this.initializeHeaders())
    )
  }
}
