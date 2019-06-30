import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ButtonComponent } from './common/button/button.component';
import { IconComponent } from './common/icons/icons.component';
import { LogInComponent } from './log-in/log-in.component';
import { RoutingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, 
          MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, 
          MatSnackBarModule, MatExpansionModule, MatSelectModule, MatPaginatorModule } from '@angular/material';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { MyProfileComponent } from './my-profile/my-profile.component';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProductResultsComponent } from './ProductResults/ProductResults.component';
import { CardComponent } from './card/card.component';
import { RatingComponent } from './rating/rating.component';
import { ImagesComponent } from './images/images.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LeftSectionComponent } from './leftsection/leftsection.component';
import { ProductControlsComponent } from './ProductControls/ProductControls.component';
// import { DialogComponent } from './dialog/dialog.component';
import { FilterMobileComponent } from './filter-mobile/filter-mobile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { Constants } from './utils/constants';
import { Ng5SliderModule } from 'ng5-slider';
import { RangeSliderComponent } from './range-slider/range-slider.component';


@NgModule({
  declarations: [
    TopnavComponent,
    AuthmockComponent,
    ButtonComponent,
    IconComponent,
    LogInComponent,
    RoutingComponents,
    CheckoutComponent,
    ForgotPasswordComponent,
    AppComponent,
    // MyProfileComponent,
    ProductResultsComponent,
    CardComponent,
    RatingComponent,
    ImagesComponent,
    LeftSectionComponent,
    ProductControlsComponent,
    // DialogComponent,
    FilterMobileComponent,
    ProductDetailsComponent,
    ImageZoomComponent,
    RangeSliderComponent
  ],
  imports: [
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    HttpClientModule,
    // NgxStripeModule.forRoot(Constants.environment.stripePublicKey),
    HttpClientModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    NgbModule,
    MatExpansionModule,
    MatMenuModule,
    HttpClientModule,
    // MatDialogModule,
    Ng5SliderModule,
    NgxImageZoomModule.forRoot() 
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
