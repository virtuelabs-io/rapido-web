import { Component, OnInit, NgZone, NgModule } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Rating } from '../../services/ratings/rating'
import { RatingsService } from '../../services/ratings/ratings.service'
import { ProductsService } from '../../services/products/products.service'
import { Common } from '../../../../src/app/utils/common'
import { RouteService } from '../../shared-services/route/route.service'
import { LoginStateService } from '../../shared-services/login-state/login-state.service'
import { MatSnackBar } from '@angular/material'
import { Constants } from '../../utils/constants'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

@NgModule({
  imports: [FormBuilder, Validators, FormGroup],
})
@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss'],
})
export class EditReviewComponent implements OnInit {
  _productId: number = 0
  _reviewId: any
  imageDetails: any
  isLoggedIn: Boolean
  rate: number
  image: any
  title: string
  updateRes: any
  rating: Rating = new Rating()
  public _ratingsService: RatingsService
  private _productsService: ProductsService
  registerFormGroup: FormGroup

  constructor(
    private actRoute: ActivatedRoute,
    ratingsService: RatingsService,
    productsService: ProductsService,
    private RouteService: RouteService,
    private _loginStateService: LoginStateService,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {
    this._ratingsService = ratingsService
    this._productsService = productsService
  }

  ngOnInit() {
    this._loginStateService.loaderEnable()
    this._reviewId = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    this.userLogInCheck()
    this.registerFormGroup = new FormGroup({
      summary: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
    })
  }

  // Form control show/hide error messages
  public hasError = (controlName: string, errorName: string) => {
    return this.registerFormGroup.controls[controlName].hasError(errorName)
  }

  async userLogInCheck() {
    await this.loginSessinExists()
      .then((_) => this.getReviewDetails())
      .catch((err) => this.handleError(err))
  }

  async loginSessinExists() {
    await this._loginStateService.isLoggedInState.subscribe(
      (state) => (this.isLoggedIn = state)
    )
  }

  async handleError(err) {
    this.RouteService.changeRoute('review/create/product/' + this._productId)
    this.router.navigateByUrl('/login')
  }

  async getReviewDetails() {
    this._ratingsService.getCustomerRating(this._reviewId).subscribe((data) => {
      this.rate = data.rating
      this.registerFormGroup.controls['summary'].setValue(data.summary)
      this.registerFormGroup.controls['title'].setValue(data.title)
      this.getProductDetails(data.product_id)
    })
  }

  async getProductDetails(product_id) {
    let query = {
      q: `(term field=_id ${product_id})`,
      size: 10,
      qdotparser: 'structured',
    }
    if (this.isLoggedIn) {
      await this._productsService.get(query).subscribe((data) => {
        if (data) {
          this.imageDetails = Common.getImageURI(
            data.hits.hit[0].fields.images,
            null
          )
          this.image = this.imageDetails[0]
          this.title = data.hits.hit[0].fields.name
          this._loginStateService.loaderDisable()
        }
      })
    } else {
      await Promise.reject("Login Session doesn't exist!")
      this._loginStateService.loaderDisable()
    }
  }

  updateRating(form) {
    this._loginStateService.loaderEnable()
    this.rating.id = this._reviewId
    this.rating.title = form.title
    this.rating.rating = this.rate
    this.rating.summary = form.summary
    this._ratingsService.updateRating(this.rating).subscribe((data) => {
      this.updateRes = data
      this._snackBar.open(Constants.REVIEW_UPDATED_SUCCESSFULLY, '', {
        duration: 5000,
      })
      this.ngZone.run(() => this.router.navigate(['profile/my-reviews'])).then()
    })
  }
}
