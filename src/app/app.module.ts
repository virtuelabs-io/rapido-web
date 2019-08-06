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
          MatSnackBarModule, MatExpansionModule, MatSelectModule, MatPaginatorModule, 
          MatProgressSpinnerModule, MatDialogModule, MatCardModule,
          MatFormFieldModule, MatTableModule  } from '@angular/material';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProductResultsComponent } from './product-results/product-results.component';
import { FilterControlsDialog } from './product-results/product-results.component';
import { CardComponent } from './card/card.component';
import { RatingComponent } from './rating/rating.component';
import { ImagesComponent } from './images/images.component';
import { LeftSectionComponent } from './leftsection/leftsection.component';
import { ProductControlsComponent } from './product-controls/product-controls.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { Constants } from './utils/constants';
// import { Ng5SliderModule } from 'ng5-slider';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { ResendOtpComponent } from './resend-otp/resend-otp.component';
import { ProfileComponent } from './my-profile/profile.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { AddCompanyDetailsComponent } from './add-company-details/add-company-details.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { EditCompanyDetailsComponent } from './edit-company-details/edit-company-details.component';
import { CartComponent } from './cart/cart.component';
import { RouteService } from '../app/shared-services/route/route.service';
import { FooterComponent } from './footer/footer.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { AccountInfoComponent } from './account-info/account-info.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeCardComponent } from './card/home-card/home-card.component';
import { CarouselComponent } from './card/carousel/carousel.component';
import { CarouselScrollComponent } from './card/carousel-scroll/carousel-scroll.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TableComponent } from './components/table/table.component';

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
    ProductResultsComponent,
    CardComponent,
    RatingComponent,
    ImagesComponent,
    LeftSectionComponent,
    ProductControlsComponent,
    RangeSliderComponent,
    FilterControlsDialog,
    ResendOtpComponent,
    ProfileComponent,
    CompanyDetailsComponent,
    AddCompanyDetailsComponent,
    ProfileComponent,
    AddressComponent,
    AddAddressComponent,
    EditAddressComponent,
    EditCompanyDetailsComponent,
    AccountInfoComponent,
    ProductDetailsComponent,
    TableComponent,
    CartComponent,
    FooterComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
    OrdersComponent,
    OrderDetailsComponent,
    HomeComponent,
    HomeCardComponent,
    CarouselComponent,
    CarouselScrollComponent,
    AccountInfoComponent
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
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    // Ng5SliderModule,
    NgxStripeModule.forRoot(Constants.environment.stripePublicKey),
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    NgxPageScrollCoreModule,
    NgbModule
  ],
  entryComponents: [FilterControlsDialog],
  providers: [],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { 
  constructor(
    private RouteService : RouteService
   ) {
   }

   ngOnInit() {
    this.RouteService.previousRoute.subscribe(state => {
      this.RouteService.changeRoute(state)
    })
   }
}
