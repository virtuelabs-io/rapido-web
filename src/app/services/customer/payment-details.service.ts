import { Injectable } from '@angular/core';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { PaymentDetails } from './payment-details';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService extends RapidoHttpService<PaymentDetails>{

  constructor(protected _http: HttpClient, protected _profileService: ProfileService) { 
    super(_http, _profileService)
  }

  getPaymentDetailsList(){
    return this.get(Constants.CUSTOMER_APIS.payment.apiList,this.addAuthHeader(this.initializeHeaders()))
  }

  getPaymentDetails(id: number){
    return this.get([Constants.CUSTOMER_APIS.payment.api,String(id)].join("/"),this.addAuthHeader(this.initializeHeaders()))
  }

  postPaymentDetails(paymentDetails: PaymentDetails){
    return this.post(Constants.CUSTOMER_APIS.payment.api, paymentDetails, this.addAuthHeader(this.initializeHeaders()))
  }

  putPaymentDetails(paymentDetails: PaymentDetails){
    return this.put([Constants.CUSTOMER_APIS.payment.api,String(paymentDetails.id)].join("/"), paymentDetails, this.addAuthHeader(this.initializeHeaders()))
  }

  deletePaymentDetails(id: number){
    return this.delete([Constants.CUSTOMER_APIS.payment.api,String(id)].join("/"),this.addAuthHeader(this.initializeHeaders()))
  }
}
