import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './my-profile/profile.component';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'sign-in', component: LogInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'product-cards', component: ProductCardsComponent },
  { path: 'profile/accountInfo', component: AccountInfoComponent },
  { path: 'profile/address', component: AddressComponent },
  { path: 'profile/address/newAddress', component: AddAddressComponent },
  { path: 'profile/payment', component: PaymentDetailsComponent },
  { path: 'profile/payment/newPayment', component: AddPaymentComponent },
  { path: '', component: AuthmockComponent}
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
  ProfileComponent,
  ProductCardsComponent,
  AccountInfoComponent,
  AddressComponent,
  AddAddressComponent,
  PaymentDetailsComponent,
  AddPaymentComponent,
  AuthmockComponent
];
