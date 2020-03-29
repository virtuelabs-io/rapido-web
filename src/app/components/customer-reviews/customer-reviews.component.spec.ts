import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerReviewsComponent } from "./customer-reviews.component";
import { RatingsMockData } from "src/app/services/ratings/ratings.mock.data";
import { RatingsMockService } from "src/app/services/ratings/ratings.mock.service";
import { RatingsService } from "src/app/services/ratings/ratings.service";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { LogInComponent } from "../log-in/log-in.component";
import { Router, Routes } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("CustomerReviewsComponent", () => {
  let ratingMockService: RatingsService = new RatingsMockService();
  let component: CustomerReviewsComponent;
  let fixture: ComponentFixture<CustomerReviewsComponent>;

  const routes: Routes = [{ path: "login", component: LogInComponent }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [CustomerReviewsComponent, LogInComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewsComponent);
    component = fixture.componentInstance;
    component._ratingsService = ratingMockService;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch all the reviews specific to the customer", () => {
    component.isLoggedIn = true;
    component.fetchCustomerReviews();
    expect(component.reviews).toEqual(RatingsMockData.ratingDetails);
  });
});
