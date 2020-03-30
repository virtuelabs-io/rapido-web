import { BrowserModule } from "@angular/platform-browser"
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core"
import { FormsModule, ReactiveFormsModule, FormGroup } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { TopnavComponent } from "./components/topnav/topnav.component"
import { AuthmockComponent } from "./authmock/authmock.component"
import { IconComponent } from "./common/icons/icons.component"
import { LogInComponent } from "./components/log-in/log-in.component"
import { RoutingComponents } from "./app-routing.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import {
  MatProgressBarModule,
  MatStepperModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatSelectModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatTableModule,
  MatTreeModule,
} from "@angular/material"
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component"
import { ProductResultsComponent } from "./components/product-results/product-results.component"
import { FilterControlsDialog } from "./components/product-results/product-results.component"
import { CardComponent } from "./components/card/card.component"
import { RatingComponent } from "./components/rating/rating.component"
import { ImagesComponent } from "./components/images/images.component"
import { LeftSectionComponent } from "./components/leftsection/leftsection.component"
import { ProductControlsComponent } from "./components/product-controls/product-controls.component"
import { CheckoutComponent } from "./components/checkout/checkout.component"
import { NgxStripeModule } from "ngx-stripe"
import { Constants } from "./utils/constants"
import { RangeSliderComponent } from "./components/range-slider/range-slider.component"
import { ResendOtpComponent } from "./components/resend-otp/resend-otp.component"
import { ProfileComponent } from "./components/my-profile/profile.component"
import { CompanyDetailsComponent } from "./components/company-details/company-details.component"
import { AddressComponent } from "./components/address/address.component"
import { AddAddressComponent } from "./components/add-address/add-address.component"
import { EditAddressComponent } from "./components/edit-address/edit-address.component"
import { CartComponent } from "./components/cart/cart.component"
import { RouteService } from "../app/shared-services/route/route.service"
import { FooterComponent } from "./components/footer/footer.component"
import { NgxPageScrollCoreModule } from "ngx-page-scroll-core"
import { AccountInfoComponent } from "./components/account-info/account-info.component"
import { TermsConditionsComponent } from "./components/terms-conditions/terms-conditions.component"
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component"
import { AboutUsComponent } from "./components/about-us/about-us.component"
import { OrdersComponent } from "./components/orders/orders.component"
import { OrderDetailsComponent } from "./components/order-details/order-details.component"
import { HomeComponent } from "./components/home/home.component"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { BusyLoaderComponent } from "./components/common/busy-loader/busy-loader.component"
import { HomeCardComponent } from "./components/card/home-card/home-card.component"
import { CarouselComponent } from "./components/card/carousel/carousel.component"
import { CarouselScrollComponent } from "./components/card/carousel-scroll/carousel-scroll.component"
import { ProductDetailsComponent } from "./components/product-details/product-details.component"
import { TableComponent } from "./components/table/table.component"
import { PillBadgeComponent } from "./components/common/pill-badge/pill-badge.component"
import { AngularFontAwesomeModule } from "angular-font-awesome"
import { CareerPageComponent } from "./components/career-page/career-page.component"
import { PressReleaseComponent } from "./components/press-release/press-release.component"
import { CreditsComponent } from "./components/credits/credits.component"
import { NavComponent } from "./components/nav/nav.component"
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component"
import { CustomerReviewsComponent } from "./components/customer-reviews/customer-reviews.component"
import { RatingBarComponent } from "./components/rating-bar/rating-bar.component"
import { ProductReviewsComponent } from "./components/product-reviews/product-reviews.component"
import { CreateReviewComponent } from "./components/create-review/create-review.component"
import { EditReviewComponent } from "./components/edit-review/edit-review.component"
import { GuestCheckoutComponent } from "./components/guest-checkout/guest-checkout.component"
import { ProductMenuComponent } from "./components/product-menu/product-menu.component"
import { ProductMenuMobileComponent } from "./components/product-menu-mobile/product-menu-mobile.component"
import { StageDisclaimerComponent } from "./components/stage-disclaimer/stage-disclaimer.component"
import { CookieConsentComponent } from "./components/cookie-consent/cookie-consent.component"
import { FlipCaseComponent } from "./components/card/flip-case/flip-case.component"
import { HomeCardFlipComponent } from "./components/card/home-card-flip/home-card-flip.component"
import { CarouselFlipComponent } from "./components/card/carousel-flip/carousel-flip.component"
import { ImageCarouselComponent } from "./components/card/image-carousel/image-carousel.component"

@NgModule({
  declarations: [
    TopnavComponent,
    AuthmockComponent,
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
    ProfileComponent,
    AddressComponent,
    AddAddressComponent,
    EditAddressComponent,
    AccountInfoComponent,
    BusyLoaderComponent,
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
    AccountInfoComponent,
    PillBadgeComponent,
    CareerPageComponent,
    CreditsComponent,
    PressReleaseComponent,
    NavComponent,
    CustomerReviewsComponent,
    ConfirmationDialogComponent,
    RatingBarComponent,
    ProductReviewsComponent,
    CreateReviewComponent,
    EditReviewComponent,
    GuestCheckoutComponent,
    ProductMenuComponent,
    ProductMenuMobileComponent,
    StageDisclaimerComponent,
    CookieConsentComponent,
    FlipCaseComponent,
    HomeCardFlipComponent,
    CarouselFlipComponent,
    ImageCarouselComponent,
  ],
  imports: [
    MatProgressBarModule,
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
    MatTreeModule,
    NgxPageScrollCoreModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    MatTreeModule,
  ],
  entryComponents: [FilterControlsDialog, ConfirmationDialogComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor(private RouteService: RouteService) {}

  ngOnInit() {
    this.RouteService.previousRoute.subscribe((state) => {
      this.RouteService.changeRoute(state)
    })
  }
}
