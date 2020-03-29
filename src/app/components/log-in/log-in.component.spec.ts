import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { LogInComponent } from "./log-in.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Location } from "@angular/common";
import { RegisterComponent } from "../register/register.component";
import {
  MatToolbarModule,
  MatStepperModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TermsConditionsComponent } from "../terms-conditions/terms-conditions.component";
import { PrivacyPolicyComponent } from "../privacy-policy/privacy-policy.component";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { GuestCheckoutComponent } from "../guest-checkout/guest-checkout.component";
import { HomeComponent } from "../home/home.component";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OrdersComponent } from "../orders/orders.component";

describe("LogInComponent", () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: "register", component: RegisterComponent },
    { path: "terms", component: TermsConditionsComponent },
    { path: "privacy-policy", component: PrivacyPolicyComponent },
    { path: "forgotpassword", component: ForgotPasswordComponent },
    { path: "cart/guest-checkout", component: GuestCheckoutComponent },
    { path: "", component: HomeComponent },
    { path: "orders", component: OrdersComponent },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatToolbarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [
        OrdersComponent,
        HomeComponent,
        LogInComponent,
        RegisterComponent,
        TermsConditionsComponent,
        PrivacyPolicyComponent,
        ForgotPasswordComponent,
        GuestCheckoutComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(LogInComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render title in h1 tag", async(() => {
    const fixture = TestBed.createComponent(LogInComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Log in to Rapidobuild.com"
    );
  }));

  it("should contain the prefix for mobile number", async(() => {
    expect(component.countryCode).toContain("+");
    expect(component.countryCode.length).toEqual(3);
  }));

  it("should throw error alert for missing mobile number", async(() => {
    component.login();
    expect(component.alertMsg).toEqual("Please enter mobile number");
    expect(component.alertBox).toBeTruthy();
  }));

  it("should throw error alert for missing password", async(() => {
    component.mobileNumber = "1234567890";
    component.login();
    expect(component.alertMsg).toEqual("Please enter password");
    expect(component.alertBox).toBeTruthy();
  }));

  it("should contain 10 digits for mobile number", async(() => {
    component.mobileNumber = "1234567890";
    expect(component.mobileNumber.length).toEqual(10);
  }));

  it("should navigate to Register component", () => {
    document.getElementById("LogInComponent-register").click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/register");
    });
  });

  it("should navigate to Terms of service component", () => {
    document.getElementById("LogInComponent-terms").click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/terms");
    });
  });

  it("should navigate to Privacy policy component", () => {
    document.getElementById("LogInComponent-privacy").click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/privacy-policy");
    });
  });

  it("should navigate to Register component", () => {
    document.getElementById("idForgotPassord").click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual("/forgotpassword");
    });
  });

  it("should navigate to Home component when clicked on Proceed as Guest", fakeAsync(() => {
    component.RouteService.changeRoute("");
    component.handleGuest();
    tick();
    expect(location.path()).toEqual("/");
  }));

  it("should navigate to Checkout component when clicked on Proceed as Guest", fakeAsync(() => {
    component.RouteService.changeRoute("cart/guest-checkout");
    component.handleGuest();
    tick();
    expect(location.path()).toEqual("/cart/guest-checkout");
  }));
});
