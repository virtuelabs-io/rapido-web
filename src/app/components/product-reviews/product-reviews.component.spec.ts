import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { ProductReviewsComponent } from './product-reviews.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { LogInComponent } from '../../components/log-in/log-in.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RatingsMockData} from 'src/app/services/ratings/ratings.mock.data';
import { RatingsMockService} from 'src/app/services/ratings/ratings.mock.service';
import { RatingsService} from 'src/app/services/ratings/ratings.service';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditReviewComponent } from '../edit-review/edit-review.component';
import {Location} from "@angular/common";

describe('ProductReviewsComponent', () => {
  let ratingMockService: RatingsService = new RatingsMockService()
  let component: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'review/edit/review/:id', component: EditReviewComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatSnackBarModule,HttpClientModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [ ProductReviewsComponent, ProductDetailsComponent, LogInComponent, EditReviewComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ProductReviewsComponent);
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

  it('should report abuse', () => {
    component.isLoggedIn = true
    component.deactivateRating(3)
    expect(component.resAbuse).toEqual(RatingsMockData.deactivateRating)
  });

  it('should report helpful', () => {
    component.isLoggedIn = true
    component.helpfulRatingIncrement(3)
    expect(component.resHelpfulCount).toEqual(RatingsMockData.helpfulRatingIncrement)
  });

  it('route to Edit Review component',  fakeAsync(() => {
    component.isLoggedIn = true
    let id = 8
    component.editReview(id)
    tick()
    expect(location.path()).toEqual('/review/edit/review/8')
  }));
});
