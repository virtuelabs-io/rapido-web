import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ButtonComponent } from './common/button/button.component';
import { IconComponent } from './common/icons/icons.component';
import { LogInComponent } from './log-in/log-in.component';
import { RoutingComponents } from './app-routing.module';
import { MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, MatSnackBarModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProductCardsComponent } from './product-cards/product-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    AuthmockComponent,
    ButtonComponent,
    IconComponent,
    LogInComponent,
    RoutingComponents,
    ForgotPasswordComponent,
    MyProfileComponent,
    ProductCardsComponent
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
    MatMenuModule,
    MatListModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
