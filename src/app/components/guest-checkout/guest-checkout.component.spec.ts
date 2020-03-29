import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatCardModule,
  MatStepperModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgxStripeModule,
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions,
} from "ngx-stripe";
import { GuestCheckoutComponent } from "./guest-checkout.component";
import { OrderDetailsComponent } from "../order-details/order-details.component";

describe("GuestCheckoutComponent", () => {
  let component: GuestCheckoutComponent;
  let fixture: ComponentFixture<GuestCheckoutComponent>;
  let router: Router;

  const routes: Routes = [
    { path: "orders/:id/details", component: OrderDetailsComponent },
    // { path: 'cart/checkout', component: CheckoutComponent}
  ];

  let elementsOptions: ElementsOptions = {
    locale: "en",
  };
  let elements: Elements;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StripeService, useValue: StripeService }],
      imports: [
        NgxStripeModule.forRoot(),
        MatCardModule,
        MatStepperModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(routes),
        MatSnackBarModule,
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [GuestCheckoutComponent, OrderDetailsComponent],
    }).compileComponents();
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
