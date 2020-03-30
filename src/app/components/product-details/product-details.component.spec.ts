import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing'
import { ProductDetailsComponent } from './product-details.component'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatTableModule, MatSnackBarModule } from '@angular/material'
import { RatingsMockData } from 'src/app/services/ratings/ratings.mock.data'
import { RatingsMockService } from 'src/app/services/ratings/ratings.mock.service'
import { RatingsService } from 'src/app/services/ratings/ratings.service'
import { Location } from '@angular/common'
import { Router, Routes } from '@angular/router'
import { LogInComponent } from '../log-in/log-in.component'
import { EditReviewComponent } from '../edit-review/edit-review.component'
import { CreateReviewComponent } from '../create-review/create-review.component'

describe('ProductDetailsComponent', () => {
  let ratingMockService: RatingsService = new RatingsMockService()
  let component: ProductDetailsComponent
  let fixture: ComponentFixture<ProductDetailsComponent>
  let router: Router
  let location: Location

  const routes: Routes = [
    { path: 'review/edit/review/:id', component: EditReviewComponent },
    { path: 'review/create/product/:id', component: CreateReviewComponent },
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        ProductDetailsComponent,
        EditReviewComponent,
        CreateReviewComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(ProductDetailsComponent)
    component = fixture.componentInstance
    component._ratingsService = ratingMockService
    fixture.detectChanges()
  })

  it('should create', () => {
    component.isLoggedIn = true
    expect(component).toBeTruthy()
  })

  it('should fetch all the reviews specific to the product', () => {
    component.fetchProductRatings(33)
    expect(component.reviews).toEqual(RatingsMockData.ratingDetails)
  })

  it('should fetch all the reviews specific to the product', () => {
    component.getProductRatingsSummary(33)
    expect(component.rate).toEqual(RatingsMockData.productRatingsSummary)
  })

  it('route to Create Review component from Orders component', fakeAsync(() => {
    component.isLoggedIn = true
    let data = []
    let id = 51
    component.handleReviewNavigation(data, id)
    tick()
    expect(location.path()).toEqual('/review/create/product/51')
  }))

  it('route to Edit Review component from Orders component', fakeAsync(() => {
    component.isLoggedIn = true
    let data = [
      {
        id: 8,
      },
    ]
    let id = 51
    component.handleReviewNavigation(data, id)
    tick()
    expect(location.path()).toEqual('/review/edit/review/8')
  }))
})
