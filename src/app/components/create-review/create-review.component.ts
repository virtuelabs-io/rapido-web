import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Rating } from '../../services/ratings/rating';
import { RatingsService } from '../../services/ratings/ratings.service';
import { ProductsService } from '../../services/products/products.service';
import { Common } from '../../../../src/app/utils/common';
import { RouteService } from '../../shared-services/route/route.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '../../../../src/app/utils/constants';
import { OrdersService } from '../../services/orders/orders.service';

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
  _previousRoute: any
  disableSubmitReview: Boolean = false
  rating: Rating = new Rating()
  private _ratingsService: RatingsService
  private _productsService: ProductsService
  private _orderService: OrdersService

  constructor(
    private actRoute: ActivatedRoute,
    ratingsService: RatingsService,
    productsService: ProductsService,
    private RouteService : RouteService,
    private _loginStateService: LoginStateService,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    orderService: OrdersService
  ) { 
    this._ratingsService = ratingsService
    this._productsService = productsService
    this._orderService = orderService
  }

  ngOnInit() {
    this._loginStateService.loaderEnable()
    this._previousRoute = this.RouteService.getRoute()
    this._productId = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    this.userLogInCheck()
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
// let this be commented for now..we will refactor it later...
  /*onVoted(rateValue) {
    this.rate = rateValue
  }*/

  async getProductDetails() {
    let query = {
      q: `(term field=_id ${this._productId})`,
      size: 10,
      qdotparser: 'structured'
    }
    if(this.isLoggedIn) {
      await this.checkProductPurchase()
      await this._productsService.get(query).
      subscribe(data => {
        if (data) {
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

  async checkProductPurchase() {
		console.log("checkProductPurchase order for: 9")
		await this._orderService.checkProductPurchase(this._productId)
		.subscribe(data => {
			if(data[0].length == 0) {
        this.disableSubmitReview = true
        this._snackBar.open(Constants.UNAUTHORIZED_REVIEW_CREATE,  undefined , {
          duration: 4000,
         })
      }	
		})
	}

  submitReview() {
    this._loginStateService.loaderEnable()
    this.rating.product_id = this._productId
    this.rating.title = this.review_title
    this.rating.rating = this.rate
    this.rating.summary = this.review_summary
    this._ratingsService.createRating(this.rating)
    .subscribe(data => {
      this._loginStateService.loaderDisable()
      this._snackBar.open(Constants.REVIEW_ADDED_SUCCESSFULLY,  undefined , {
        duration: 4000,
       })
      if(this._previousRoute.value){
        this.ngZone.run(() =>this.router.navigate(['/'+this._previousRoute.value])).then()
      }else{
        this.ngZone.run(() =>this.router.navigate([''])).then()
      }
    })
  }
}
