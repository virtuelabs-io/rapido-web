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
import { MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, 
  MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, 
  MatSnackBarModule, MatExpansionModule, MatSelectModule, MatPaginatorModule, 
  MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatCardModule  } from '@angular/material';
import { LeftSectionComponent } from './leftsection/leftsection.component';
import { CardComponent } from './card/card.component';
import { RatingComponent } from './rating/rating.component';
import { ImagesComponent } from './images/images.component';
import { ProductControlsComponent } from './product-controls/product-controls.component';
import { ProductResultsComponent } from './product-results/product-results.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
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
        MatPaginatorModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
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
        LeftSectionComponent,
        CardComponent,
        RatingComponent,
        ImagesComponent,
        ProductControlsComponent,
        ProductResultsComponent,
        RangeSliderComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
