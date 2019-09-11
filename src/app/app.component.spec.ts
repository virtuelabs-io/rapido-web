import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { TopnavComponent } from './components/topnav/topnav.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { IconComponent } from './common/icons/icons.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RoutingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { Constants } from './utils/constants';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, 
  MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, 
  MatSnackBarModule, MatExpansionModule, MatSelectModule, MatPaginatorModule, 
  MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatCardModule,
  MatTableModule,  
  MatProgressBarModule} from '@angular/material';
import { LeftSectionComponent } from './components/leftsection/leftsection.component';
import { CardComponent } from './components/card/card.component';
import { RatingComponent } from './components/rating/rating.component';
import { ImagesComponent } from './components/images/images.component';
import { ProductControlsComponent } from './components/product-controls/product-controls.component';
import { ProductResultsComponent } from './components/product-results/product-results.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BusyLoaderComponent } from './components/common/busy-loader/busy-loader.component';
import { TableComponent } from './components/table/table.component';
import { PillBadgeComponent } from './components/common/pill-badge/pill-badge.component';
import { CareerPageComponent } from './components/career-page/career-page.component';
import { HomeCardComponent } from './components/card/home-card/home-card.component';
import { CarouselComponent } from './components/card/carousel/carousel.component';
import { CarouselScrollComponent } from './components/card/carousel-scroll/carousel-scroll.component';
import { HomeComponent } from './components/home/home.component';
import { CreditsComponent  } from './components/credits/credits.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { RatingBarComponent } from './components/rating-bar/rating-bar.component';

describe('AppComponent', () => {
  var originalTimeout;

  beforeEach(async(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatStepperModule,
        ReactiveFormsModule,
        NgxStripeModule.forRoot(Constants.environment.stripePublicKey),
        ReactiveFormsModule,
        MatMenuModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        NgxPageScrollCoreModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatTableModule,
        MatProgressBarModule,
        NgbModule.forRoot()
      ],
      declarations: [
        AppComponent,
        TopnavComponent,
        NavComponent,
        AuthmockComponent,
        IconComponent,
        LogInComponent,
        RoutingComponents,
        CheckoutComponent,
        FooterComponent,
        LeftSectionComponent,
        CardComponent,
        RatingComponent,
        ImagesComponent,
        ProductControlsComponent,
        ProductResultsComponent,
        RangeSliderComponent,
        BusyLoaderComponent,
        TableComponent,
        PillBadgeComponent,
        CreditsComponent,
        CareerPageComponent,
        HomeCardComponent,
        CarouselComponent,
        CarouselScrollComponent,
        HomeComponent,
        ProductReviewsComponent,
        RatingBarComponent
      ],
    }).compileComponents();
  }));

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
