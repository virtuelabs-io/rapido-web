import { Injectable } from '@angular/core';
import { Rating } from './rating';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class RatingsService extends RapidoHttpService<Rating>{

  constructor(protected _http?: HttpClient, protected _profileService?: ProfileService) {
    super(_http, _profileService)
  }

  createRating(rating: Rating){
    return this.post(Constants.RATINGS_APIS.api , rating, this.addAuthHeader(this.initializeHeaders()))
  }

  updateRating(rating: Rating){
    return this.put([Constants.RATINGS_APIS.api, String(rating.id)].join("/") , rating, this.addAuthHeader(this.initializeHeaders()))
  }

  getCustomerRating(id: Number){
    return this.get([Constants.RATINGS_APIS.api, String(id)].join("/"), this.addAuthHeader(this.initializeHeaders()))
  }

  getAllCustomerRatings(){
    return this.getList(Constants.RATINGS_APIS.api, this.addAuthHeader(this.initializeHeaders()))
  }

  deleteCustomerRating(id: Number){
    return this.delete([Constants.RATINGS_APIS.api, String(id)].join("/"), this.addAuthHeader(this.initializeHeaders()))
  }

  helpfulRatingIncrement(id: Number){
    return this.put([Constants.RATINGS_APIS.api, "helpful", String(id)].join("/") , null, this.addAuthHeader(this.initializeHeaders()))
  }

  deactivateRating(id: Number){
    return this.put([Constants.RATINGS_APIS.api, "deactivate", String(id)].join("/") , null, this.addAuthHeader(this.initializeHeaders()))
  }

  getProductRatings(product_id: Number){
    return this.getList([Constants.RATINGS_APIS.api, "product", String(product_id)].join("/"))
  }

  getProductRatingsSummary(product_id: Number){
    return this.getList([Constants.RATINGS_APIS.api, "product", "summary", String(product_id)].join("/"))
  }
}
