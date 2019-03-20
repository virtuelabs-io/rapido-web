import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'sign-in', component: LogInComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  RegisterComponent,
  LogInComponent
];
