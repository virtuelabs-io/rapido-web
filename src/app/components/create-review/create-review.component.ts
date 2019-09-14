import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Rating } from '../../services/ratings/rating';
import { RatingsService } from '../../services/ratings/ratings.service';
import { ProductsService } from '../../services/products/products.service';
import { Common } from '../../../../src/app/utils/common';
import { RouteService } from '../../shared-services/route/route.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  _productId: number = 0
  imageDetails: any
  isLoggedIn: Boolean
  rate: number
  image: any
  title: string
  review_summary: string = ""
  review_title: string = ""
  rating: Rating = new Rating()
  private _ratingsService: RatingsService
  private _productsService: ProductsService
  constructor(
    private actRoute: ActivatedRoute,
    ratingsService: RatingsService,
    productsService: ProductsService,
    private RouteService : RouteService,
    private _loginStateService: LoginStateService,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this._ratingsService = ratingsService
    this._productsService = productsService
  }

  ngOnInit() {
    this._loginStateService.loaderEnable()
    this._productId = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    this.userLogInCheck()
    this.getProductDetails()
  }

  async userLogInCheck() {
    await this.loginSessinExists().
		then( _ => this.getProductDetails()).
		catch(err => this.handleError(err))
  }

  async loginSessinExists() {
    await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
  }

  async handleError(err) {
    this.RouteService.changeRoute('review/create/product/'+this._productId)
    this.router.navigateByUrl('/login')
  }

  onVoted(rateValue) {
    this.rate = rateValue
  }

  async getProductDetails() {
    let query = {
      q: `(term field=_id ${this._productId})`,
      size: 10,
      qdotparser: 'structured'
    }
    if(this.isLoggedIn) {
      await this._productsService.get(query).
      subscribe(data => {
        if (data) {
          if (data.error || data.hits.found === 0) {
          //  this.itemDetails = null
            throw Error('error')
          }
          this.imageDetails  = Common.getImageURI(data.hits.hit[0].fields.images, null)
          this.image = this.imageDetails[0]
          this.title = data.hits.hit[0].fields.name
          this._loginStateService.loaderDisable()
        }
      })
    }
    else {
      await Promise.reject("Login Session doesn't exist!")
      this._loginStateService.loaderDisable()
    }
  }

  submitReview() {
    this.rating.product_id = this._productId
    this.rating.title = this.review_title
    this.rating.rating = this.rate
    this.rating.summary = this.review_summary
    this._ratingsService.createRating(this.rating)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully created a rating')
      }
     // this.rating_result = "Sucessfully created a rating";
    })
  }
}
