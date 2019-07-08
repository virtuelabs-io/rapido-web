import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResendOtpComponent } from './resend-otp/resend-otp.component';
import { ProfileComponent } from './my-profile/profile.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { AddCompanyDetailsComponent } from './add-company-details/add-company-details.component';
import { EditCompanyDetailsComponent } from './edit-company-details/edit-company-details.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogInComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'resendotp', component: ResendOtpComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/address', component: AddressComponent},
  { path: 'profile/address/newAddress', component: AddAddressComponent},
  { path: 'profile/address/editAddress/:id', component: EditAddressComponent},
  { path: 'myprofile', component: ProfileComponent},
  { path: 'profile/companyDetails', component: CompanyDetailsComponent },
  { path: 'profile/companyDetails/newDetails', component: AddCompanyDetailsComponent },
  { path: 'profile/companyDetails/edit', component: EditCompanyDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: AuthmockComponent},
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
  ResendOtpComponent,
  ProfileComponent,
  CompanyDetailsComponent,
  AddCompanyDetailsComponent,
  AddressComponent,
  AddAddressComponent,
  EditAddressComponent,
  EditCompanyDetailsComponent,
  CartComponent,
  AuthmockComponent
];
