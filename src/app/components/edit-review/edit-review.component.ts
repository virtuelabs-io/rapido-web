import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Rating } from '../../services/ratings/rating';
import { RatingsService } from '../../services/ratings/ratings.service';
import { ProductsService } from '../../services/products/products.service';
import { Common } from '../../../../src/app/utils/common';
import { RouteService } from '../../shared-services/route/route.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {

  _productId: number = 0
  _reviewId: any
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
    this._reviewId = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    this.userLogInCheck()
  }

  async userLogInCheck() {
    this._loginStateService.loaderEnable()
    await this.loginSessinExists().
		then( _ => this.getReviewDetails()).
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

  async getReviewDetails() {
    this._ratingsService.getCustomerRating(this._reviewId)
    .subscribe(data => {
      this.rate = data.rating
      this.review_summary = data.summary
      this.review_title = data.title
      this.getProductDetails(data.product_id)
    })
  }

  async getProductDetails(product_id) {
    let query = {
      q: `(term field=_id ${product_id})`,
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

  updateRating() {
    this._loginStateService.loaderEnable()
    this.rating.id = this._reviewId
    this.rating.title = this.review_title
    this.rating.rating = this.rate
    this.rating.summary = this.review_summary
    this._ratingsService.updateRating(this.rating)
    .subscribe(data => {
      console.log(data)
      this.ngZone.run(() =>this.router.navigate(['profile/my-reviews'] )).then()
      if(data){
        console.log('Sucessfully updated a rating')
      }
     // this.rating_result = "Sucessfully updated a rating";
    })
  }

}
