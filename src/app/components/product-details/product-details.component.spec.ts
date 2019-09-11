import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule, MatSnackBarModule  } from '@angular/material';
import { RatingsMockData} from 'src/app/services/ratings/ratings.mock.data';
import { RatingsMockService} from 'src/app/services/ratings/ratings.mock.service';
import { RatingsService} from 'src/app/services/ratings/ratings.service';

describe('ProductDetailsComponent', () => {
  let ratingMockService: RatingsService = new RatingsMockService()
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    component._ratingsService = ratingMockService
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoggedIn = true
    expect(component).toBeTruthy();
  });

  it('should fetch all the reviews specific to the product', () => {
    component.fetchProductRatings(33)
    expect(component.reviews).toEqual(RatingsMockData.ratingDetails);
  });

  it('should fetch all the reviews specific to the product', () => {
    component.getProductRatingsSummary(33)
    expect(component.rate).toEqual(RatingsMockData.productRatingsSummary);
  });
});
