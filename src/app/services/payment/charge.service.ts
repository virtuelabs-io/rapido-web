import { Injectable } from '@angular/core';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { Charge } from './charge';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ChargeService extends RapidoHttpService<Charge> {

  constructor(protected _http: HttpClient, protected _profileService: ProfileService) {
    super(_http, _profileService)
  }

  chargeCustomer(charge: Charge){
    return this.post([Constants.PAYMENT_APIS.api,"charge"].join("/"), charge, this.addAuthHeader(this.initializeHeaders()))
  }
}
