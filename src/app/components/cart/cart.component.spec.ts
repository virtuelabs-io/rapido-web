import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatSnackBarModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { CartComponent } from './cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { LogInComponent } from '../log-in/log-in.component';
import { CartMockService } from 'src/app/services/cart/cart.mock.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CartMockData} from 'src/app/services/cart/cart.mock.data';

describe('CartComponent', () => {
  let cartMockService: CartService = new CartMockService()
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;

  const routes: Routes = [
    { path: 'login', component: LogInComponent}
   // { path: 'cart/checkout', component: CheckoutComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  RouterTestingModule, RouterTestingModule.withRoutes(routes), MatSnackBarModule, HttpClientModule,MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule ],
      declarations: [ CartComponent, LogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(CartComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    component._cartService = cartMockService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetch cart items if present', async() => {
    component.isLoggedIn = true
    await component.getCartItems()
    console.log(component.fetchRes)
    console.log(CartMockData.getCartItems)
    expect(component).toBeTruthy();
  });
});
