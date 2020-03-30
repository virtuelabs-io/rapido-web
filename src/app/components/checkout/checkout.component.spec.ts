import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import {
  MatStepperModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material'
import { CheckoutComponent } from './checkout.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, Routes } from '@angular/router'
import { LogInComponent } from '../log-in/log-in.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StripeService, Element as StripeElement } from 'ngx-stripe'

describe('CheckoutComponent', () => {
  let component: CheckoutComponent
  let fixture: ComponentFixture<CheckoutComponent>
  let router: Router

  const routes: Routes = [
    { path: 'login', component: LogInComponent },
    // { path: 'cart/checkout', component: CheckoutComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        StripeService,
        //   { provide: APP_CONFIG, useValue: ElementsOptions }
      ],
      imports: [
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
      declarations: [CheckoutComponent, LogInComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    fixture = TestBed.createComponent(CheckoutComponent)
    fixture.ngZone.run(() => {
      router.initialNavigation()
    })
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  /*it('should create', () => {
    expect(component).toBeTruthy();
  }); */
})
