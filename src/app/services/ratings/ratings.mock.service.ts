import { Injectable } from '@angular/core'
import { RapidoHttpService } from '../commons/rapido-http.service'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'
import { RatingsMockData } from './ratings.mock.data'
import { RatingsService } from './ratings.service'
import { ProfileService } from '../authentication/profile/profile.service'

@Injectable({
  providedIn: 'root',
})
export class RatingsMockService extends RatingsService {
  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService
  ) {
    super(_http, _profileService)
  }

  getProductRatingsSummary() {
    return of(RatingsMockData.productRatingsSummary)
  }

  getProductRatings() {
    return of(RatingsMockData.ratingDetails)
  }

  helpfulRatingIncrement() {
    return of(RatingsMockData.helpfulRatingIncrement)
  }

  deactivateRating() {
    return of(RatingsMockData.deactivateRating)
  }

  getAllCustomerRatings() {
    return of(RatingsMockData.ratingDetails)
  }

  createRating() {
    return of(RatingsMockData.createRating)
  }

  updateRating() {
    return of(RatingsMockData.updateRating)
  }
}
