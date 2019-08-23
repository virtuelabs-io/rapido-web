import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProductResultsComponent } from './components/product-results/product-results.component';
import { ResendOtpComponent } from './components/resend-otp/resend-otp.component';
import { ProfileComponent } from './components/my-profile/profile.component';
import { AddressComponent } from './components/address/address.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CareerPageComponent } from './components/career-page/career-page.component';
import { PressReleaseComponent } from './components/press-release/press-release.component';
import { CreditsComponent } from './components/credits/credits.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogInComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'resendotp', component: ResendOtpComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/address', component: AddressComponent},
  { path: 'profile/address/newAddress', component: AddAddressComponent},
  { path: 'profile/address/editAddress/:id', component: EditAddressComponent},
  { path: 'profile/companyDetails', component: CompanyDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/checkout', component: CheckoutComponent},
  { path: 'profile/account', component: AccountInfoComponent },
  { path: 'terms', component: TermsConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id/details', component: OrderDetailsComponent },
  { path: '', component: HomeComponent },
 { path: 'authmock', component: AuthmockComponent},
  { path: 'products', component: ProductResultsComponent },
  { path: 'products/details/:id', component: ProductDetailsComponent},
  { path: 'careers', component: CareerPageComponent},
  { path: 'credits', component: CreditsComponent},
  { path: 'press-release', component: PressReleaseComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  RegisterComponent,
  LogInComponent,
  ForgotPasswordComponent,
  ProductResultsComponent,
  AuthmockComponent,
  ResendOtpComponent,
  ProfileComponent,
  CompanyDetailsComponent,
  AddressComponent,
  AddAddressComponent,
  EditAddressComponent,
  CartComponent,
  AccountInfoComponent,
  TermsConditionsComponent,
  PrivacyPolicyComponent,
  AboutUsComponent,
  OrdersComponent,
  OrderDetailsComponent,
  HomeComponent,
  CheckoutComponent,
  AuthmockComponent,
  ProductDetailsComponent,
  PressReleaseComponent
];
