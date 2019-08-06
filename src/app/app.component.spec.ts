import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { TopnavComponent } from './topnav/topnav.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ButtonComponent } from './common/button/button.component';
import { IconComponent } from './common/icons/icons.component';
import { LogInComponent } from './log-in/log-in.component';
import { RoutingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { Constants } from './utils/constants';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, 
  MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, 
  MatSnackBarModule, MatExpansionModule, MatSelectModule, MatPaginatorModule, 
  MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatCardModule,
  MatTableModule  } from '@angular/material';
import { LeftSectionComponent } from './leftsection/leftsection.component';
import { CardComponent } from './card/card.component';
import { RatingComponent } from './rating/rating.component';
import { ImagesComponent } from './images/images.component';
import { ProductControlsComponent } from './product-controls/product-controls.component';
import { ProductResultsComponent } from './product-results/product-results.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './components/table/table.component';
import { HomeCardComponent } from './card/home-card/home-card.component';
import { CarouselComponent } from './card/carousel/carousel.component';
import { CarouselScrollComponent } from './card/carousel-scroll/carousel-scroll.component';

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
        NgbModule
      ],
      declarations: [
        AppComponent,
        TopnavComponent,
        AuthmockComponent,
        ButtonComponent,
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
        TableComponent,
        HomeCardComponent,
        CarouselComponent,
        CarouselScrollComponent
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
