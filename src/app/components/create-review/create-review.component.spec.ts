import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CreateReviewComponent } from './create-review.component'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, Routes } from '@angular/router'
import { Location } from '@angular/common'
import { CustomerReviewsComponent } from '../customer-reviews/customer-reviews.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material'
import { LogInComponent } from '../log-in/log-in.component'
import { RatingsService } from 'src/app/services/ratings/ratings.service'
import { RatingsMockService } from 'src/app/services/ratings/ratings.mock.service'
import { RatingsMockData } from 'src/app/services/ratings/ratings.mock.data'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('CreateReviewComponent', () => {
  let ratingMockService: RatingsService = new RatingsMockService()
  let component: CreateReviewComponent
  let fixture: ComponentFixture<CreateReviewComponent>
  let router: Router
  let location: Location

  const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'profile/my-reviews', component: CustomerReviewsComponent }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        CreateReviewComponent,
        CustomerReviewsComponent,
        LogInComponent
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(CreateReviewComponent)
    fixture.ngZone.run(() => {
      router.initialNavigation()
    })
    component = fixture.componentInstance
    component._ratingsService = ratingMockService
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should create review', () => {
    component.isLoggedIn = true
    component._productId = 12
    component.rate = 3
    component.registerFormGroup.controls['summary'].setValue(
      'wow..awesome product'
    )
    component.registerFormGroup.controls['title'].setValue('beautiful')
    component.submitReview(component.registerFormGroup.value)
    expect(component.submitRes).toEqual(RatingsMockData.createRating)
  })

  it('should throw error when no title is entered', () => {
    component.registerFormGroup.controls['title'].setValue('')
    expect(
      component.registerFormGroup.controls['title'].hasError('required')
    ).toBeTruthy()
  })

  it('should throw error when no summary is entered', () => {
    component.registerFormGroup.controls['summary'].setValue('')
    expect(
      component.registerFormGroup.controls['summary'].hasError('required')
    ).toBeTruthy()
  })

  it('route to My Reviews page from create review component', fakeAsync(() => {
    component.isLoggedIn = true
    component._productId = 13
    component.rate = 3
    component.registerFormGroup.controls['summary'].setValue(
      'wow..awesome product'
    )
    component.registerFormGroup.controls['title'].setValue('beautiful')
    component.submitReview(component.registerFormGroup.value)
    tick(10000)
    expect(location.path()).toEqual('/profile/my-reviews')
  }))
})
