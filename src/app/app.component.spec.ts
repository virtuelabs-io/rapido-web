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
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatCardModule } from '@angular/material/card';
  import { MatTableModule } from '@angular/material/table';
  import { MatTreeModule } from '@angular/material/tree';
  import { MatProgressBarModule } from '@angular/material/progress-bar';

  import { MatStepperModule } from '@angular/material/stepper';
  import { MatInputModule } from '@angular/material/input';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatToolbarModule } from '@angular/material/toolbar';

  import { MatMenuModule, MatMenu } from '@angular/material/menu';
  import { MatSidenavModule } from '@angular/material/sidenav';
  import { MatListModule } from '@angular/material/list';
  import { MatSnackBarModule } from '@angular/material/snack-bar';
  import { MatExpansionModule } from '@angular/material/expansion';
  import { MatSelectModule } from '@angular/material/select';
  import { MatPaginatorModule } from '@angular/material/paginator';
  import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  import { MatDialogModule } from '@angular/material/dialog';
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
import { ProductMenuComponent } from './components/product-menu/product-menu.component';
import { StageDisclaimerComponent } from './components/stage-disclaimer/stage-disclaimer.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { CarouselFlipComponent } from './components/card/carousel-flip/carousel-flip.component';
import { HomeCardFlipComponent } from './components/card/home-card-flip/home-card-flip.component';
import { FlipCaseComponent } from './components/card/flip-case/flip-case.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
        NgbModule,
        MatTreeModule
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
        HomeCardFlipComponent,
        CarouselComponent,
        CarouselFlipComponent,
        FlipCaseComponent,
        CarouselScrollComponent,
        HomeComponent,
        ProductReviewsComponent,
        RatingBarComponent,
        ProductMenuComponent,
        StageDisclaimerComponent,
        CookieConsentComponent
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
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
