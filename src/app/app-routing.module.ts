import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResendOtpComponent } from './resend-otp/resend-otp.component';
import { ProfileComponent } from './my-profile/profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogInComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'resendotp', component: ResendOtpComponent},
  { path: 'myprofile', component: ProfileComponent},
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
  AuthmockComponent
];
