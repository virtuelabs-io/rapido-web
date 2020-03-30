import { Injectable } from '@angular/core'
import { RapidoHttpService } from '../commons/rapido-http.service'
import { AddressDetails } from './address-details'
import { HttpClient } from '@angular/common/http'
import { ProfileService } from '../authentication/profile/profile.service'
import { of } from 'rxjs'
import { CompanyDetailsMockData } from './company-details.mock.data'
import { CompanyDetailsService } from './company-details.service'
import { CompanyDetails } from './company-details'

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsMockService extends CompanyDetailsService {
  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService
  ) {
    super(_http, _profileService)
  }

  getCompanyDetails() {
    return of(CompanyDetailsMockData.company)
  }

  postCompanyDetails(companyDetails: CompanyDetails) {
    return of(CompanyDetailsMockData.postCompanyDetails)
  }

  putCompanyDetails(companyDetails: CompanyDetails) {
    return of(CompanyDetailsMockData.putComapnyDetails)
  }

  deleteCompanyDetails() {
    return of(CompanyDetailsMockData.deleteCompany)
  }
}
