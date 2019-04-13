import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { AuthmockComponent } from './authmock/authmock.component';
import { ButtonComponent } from './common/button/button.component';
import { IconComponent } from './common/icons/icons.component';
import { LogInComponent } from './log-in/log-in.component';
import { RoutingComponents } from './app-routing.module';
import { MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, MatSnackBarModule, MatExpansionModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { CardComponent } from './card/card.component';
import { RatingComponent } from './rating/rating.component';
import { ImagesComponent } from './images/images.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FilterByComponent } from './filter-by/filter-by.component';
import { FilterbarComponent } from './filterbar/filterbar.component';
import { DialogComponent } from './dialog/dialog.component';
import { FilterMobileComponent } from './filter-mobile/filter-mobile.component';


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
    ProductCardsComponent,
    CardComponent,
    RatingComponent,
    ImagesComponent,
    FilterByComponent,
    FilterbarComponent,
    DialogComponent,
    FilterMobileComponent
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
    MatListModule,
    MatSnackBarModule,
    NgbModule,
    MatExpansionModule,
    MatMenuModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
