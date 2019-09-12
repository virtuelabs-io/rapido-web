import { Component, OnInit, Input } from '@angular/core';
import { RatingsService } from '../../services/ratings/ratings.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { RouteService } from '../../shared-services/route/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {
  @Input()  filteredReview = [{
    rating: "",
    title: "",
    date: "",
    summary: "",
    helpful: "",
    id: ""
  }]
  @Input() productId: number
  @Input() action: Boolean
  @Input() feedback: Boolean
  isLoggedIn: Boolean
  resAbuse: any
  resHelpfulCount: any
  id: any
  public _ratingsService: RatingsService
  constructor(
    ratingsService: RatingsService,
    private _loginStateService: LoginStateService,
    private RouteService : RouteService,
    private router: Router
  ) { 
    this._ratingsService = ratingsService
  }

  ngOnInit() {
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists()
  }

  async loginSessinExists() {
    await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
  }

  async handleError(err) {
    this.RouteService.changeRoute('products/details/'+this.productId)
    this.router.navigateByUrl('/login')
  }

  async helpfulRatingIncrement(id) {
    if(this.isLoggedIn) {
      await this._ratingsService.helpfulRatingIncrement(id)
      .subscribe(data => {
        this.resHelpfulCount = data
        this.filteredReview.map((v, i)=>{
          if(v.id == id){
          this.filteredReview[i].helpful += 1
          }
        })
      })
    }
    else {
      await this.handleError('e')
      await Promise.reject("Login Session doesn't exist!")

    }
  }

  async deactivateRating(id) {
    if(this.isLoggedIn) {
      await this._ratingsService.deactivateRating(id)
      .subscribe(data => {
        this.resAbuse = data
      })
    }
    else {
      await this.handleError('e')
      await Promise.reject("Login Session doesn't exist!")
    }
  }
}
