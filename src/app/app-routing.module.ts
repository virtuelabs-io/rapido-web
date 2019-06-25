import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProductResultsComponent } from './productresults/productresults.component';
// import { DialogComponent } from './dialog/dialog.component';
import { FilterMobileComponent } from './filter-mobile/filter-mobile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'sign-in', component: LogInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'my-profile', component: MyProfileComponent },
  { path: 'products', component: ProductResultsComponent },
  // { path: 'test', component: DialogComponent },
  { path: 'filter-mobile', component: FilterMobileComponent },
  { path: '', component: AuthmockComponent},
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
  // MyProfileComponent,
  ProductResultsComponent,
  AuthmockComponent,
  // DialogComponent,
  FilterMobileComponent,
  ProductDetailsComponent
];
