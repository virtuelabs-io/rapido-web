import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProductResultsComponent } from './product-results/product-results.component';
import { ResendOtpComponent } from './resend-otp/resend-otp.component';
import { ProfileComponent } from './my-profile/profile.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CartComponent } from './cart/cart.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
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
  { path: 'products/details/:id', component: ProductDetailsComponent}
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
  ProductDetailsComponent
];
