import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EditReviewComponent } from './edit-review.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { CustomerReviewsComponent } from '../customer-reviews/customer-reviews.component';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { LogInComponent } from '../log-in/log-in.component';
import { RatingsService} from 'src/app/services/ratings/ratings.service';
import { RatingsMockService} from 'src/app/services/ratings/ratings.mock.service';
import { RatingsMockData } from 'src/app/services/ratings/ratings.mock.data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditReviewComponent', () => {
  let ratingMockService: RatingsService = new RatingsMockService()
  let component: EditReviewComponent;
  let fixture: ComponentFixture<EditReviewComponent>;
  let router: Router;

  const routes: Routes = [
    { path: 'login', component: LogInComponent},
    { path: 'profile/my-reviews', component: CustomerReviewsComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, RouterTestingModule.withRoutes(routes),MatSnackBarModule, HttpClientTestingModule ],
      declarations: [ EditReviewComponent, CustomerReviewsComponent, LogInComponent, CustomerReviewsComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(EditReviewComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    component._ratingsService = ratingMockService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create review', () => {
    component.isLoggedIn = true
    component._reviewId = 4
    component.review_title = "Too good product !"
    component.rate = 5
    component.review_summary = "Awesome product"
    component.updateRating()
    expect(component.updateRes).toEqual(RatingsMockData.updateRating);
  });
});
