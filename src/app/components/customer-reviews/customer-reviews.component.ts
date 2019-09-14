import { Component, OnInit, NgZone } from '@angular/core';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { RouteService } from '../../shared-services/route/route.service';
import { Router } from '@angular/router';
import { RatingsService } from '../../services/ratings/ratings.service';

@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.scss']
})
export class CustomerReviewsComponent implements OnInit {
  reviews: any
  isLoggedIn: Boolean
  public _ratingsService: RatingsService
  constructor(
    private RouteService : RouteService,
    private _loginStateService: LoginStateService,
    private ngZone: NgZone,
    private router: Router,
    ratingsService: RatingsService
  ) { 
    this._ratingsService = ratingsService

  }

  ngOnInit() {
    this._loginStateService.loaderEnable()
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists().
		then( _ => this.fetchCustomerReviews()).
		catch(err => this.handleError(err))
  }

  async loginSessinExists() {
    await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
  }

  async handleError(err) {
    this.RouteService.changeRoute('profile/my-reviews')
    this.router.navigateByUrl('/login')
  }

  async fetchCustomerReviews() {
    if(this.isLoggedIn){
      await this._ratingsService.getAllCustomerRatings()
      .subscribe(data => {
      this.reviews = data
      this._loginStateService.loaderDisable()
      })
    }
    else {
      await Promise.reject("Login Session doesn't exist!")
      this._loginStateService.loaderDisable()
    }
  }

  fetchData() {
    this.fetchCustomerReviews()
  }
}
