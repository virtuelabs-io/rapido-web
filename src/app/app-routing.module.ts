import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'sign-in', component: LogInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
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
  AuthmockComponent
];
