import { Component, OnInit, Input, SimpleChanges, Output, NgZone, EventEmitter } from '@angular/core';
import { RatingsService } from '../../services/ratings/ratings.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { RouteService } from '../../shared-services/route/route.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '../../../../src/app/utils/constants';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {
  @Input()  filteredReview = []
  @Input() productId: number
  @Input() action: Boolean
  @Input() feedback: Boolean
  @Input() writer: Boolean
  @Output() fetchCustomerReviews = new EventEmitter<string>()

  isLoggedIn: Boolean
  resAbuse: any
  resHelpfulCount: any
  id: any
  reviews: any
  public _ratingsService: RatingsService
  constructor(
    ratingsService: RatingsService,
    private _loginStateService: LoginStateService,
    private RouteService : RouteService,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) { 
    this._ratingsService = ratingsService
  }

  ngOnInit() {
    this.userLogInCheck()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists().
    then( _ => this.formatReviews()).
		catch(err => this.handleError(err))
  }

  async loginSessinExists() {
    await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
  }

  async handleError(err) {
    this.RouteService.changeRoute('products/details/'+this.productId)
    this.router.navigateByUrl('/login')
  }

  async formatReviews() {
    this._loginStateService.loaderEnable()
    if(this.isLoggedIn) {
      if(this.filteredReview) {
        this.filteredReview.map((v, i)=>{
          if(v.updated_on == '' || v.updated_on == null) {
          this.filteredReview[i].updated_on = v.created_on.split('T')[0]
          }
          else {
            this.filteredReview[i].updated_on = v.updated_on.split('T')[0]
          }
        })
        this._loginStateService.loaderDisable()
      }
    }
    else {
      this._loginStateService.loaderDisable()
      await this.handleError('e')
      await Promise.reject("Login Session doesn't exist!")
    }
  }

  async helpfulRatingIncrement(id) {
    this._loginStateService.loaderEnable()
    if(this.isLoggedIn) {
      await this._ratingsService.helpfulRatingIncrement(id)
      .subscribe(data => {
        this._snackBar.open(Constants.REVIEW_HELPFUL_INCREMENT,  undefined , {
          duration: 4000,
         })
        this.resHelpfulCount = data
        this.filteredReview.map((v, i)=>{
          if(v.id == id){
          this.filteredReview[i].helpful += 1
          }
        })
        this._loginStateService.loaderDisable()
      })
    }
    else {
      this._loginStateService.loaderDisable()
      await this.handleError('e')
      await Promise.reject("Login Session doesn't exist!")
    }
  }

  async deactivateRating(id) {
    this._loginStateService.loaderEnable()
    if(this.isLoggedIn) {
      await this._ratingsService.deactivateRating(id)
      .subscribe(data => {
        this.resAbuse = data
        this._loginStateService.loaderDisable()
        this._snackBar.open(Constants.REVIEW_DEACTIVATED_SUCCESSFULLY,  undefined , {
          duration: 4000,
         })
      })
    }
    else {
      this._loginStateService.loaderDisable()
      await this.handleError('e')
      await Promise.reject("Login Session doesn't exist!")
    }
  }

  editReview(id) {
    this.ngZone.run(() =>this.router.navigate(['review/edit/review', id] )).then()
  }

  async deleteReview(id) {
    this._loginStateService.loaderEnable()
    if(this.isLoggedIn) {
      await this._ratingsService.deleteCustomerRating(id)
      .subscribe(_ => {
        this._snackBar.open(Constants.REVIEW_DELETED_SUCCESSFULLY,  undefined , {
          duration: 4000,
        })
        this.fetchCustomerReviews.emit()
      })
    }
    else {
      this._loginStateService.loaderDisable()
      await this.handleError('e')
      await Promise.reject("Login Session doesn't exist!")
    }
  }
}