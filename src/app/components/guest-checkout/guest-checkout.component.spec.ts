import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StripeService, StripeCardComponent, NgxStripeModule } from "ngx-stripe";
import { GuestCheckoutComponent } from './guest-checkout.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { StripeElementsOptions, StripeCardElementOptions } from '@stripe/stripe-js';
import { Constants } from 'src/app/utils/constants';

describe('GuestCheckoutComponent', () => {
  let component: GuestCheckoutComponent;
  let fixture: ComponentFixture<GuestCheckoutComponent>;
  let router: Router;

  const routes: Routes = [
    { path: 'orders/:id/details', component: OrderDetailsComponent}
   // { path: 'cart/checkout', component: CheckoutComponent}
  ]

  let elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  // let elements: Elements;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: StripeService, useValue: StripeService }
       ],
      imports: [ NgxStripeModule.forRoot(Constants.environment.stripePublicKey), MatCardModule, MatStepperModule, BrowserAnimationsModule, RouterTestingModule, RouterTestingModule.withRoutes(routes), MatSnackBarModule, HttpClientModule,MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule ],
      declarations: [ GuestCheckoutComponent, OrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
