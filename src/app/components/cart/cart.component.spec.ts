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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      imports: [  BrowserAnimationsModule, RouterTestingModule, RouterTestingModule.withRoutes(routes), MatSnackBarModule, HttpClientModule,MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule ],
      declarations: [ CartComponent, LogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(CartComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    component._cartService = cartMockService
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoggedIn = true
    expect(component).toBeTruthy();
  });

  it('fetch cart items if present', (async () => {
    component.isLoggedIn = true
    await component.getCartItems()
    expect(component.fetchRes).toEqual(CartMockData.getCartItems)
  }));

  it('delete from cart', (async () => {
    component.isLoggedIn = true
    let id = 1
    await component.deleteCartItem(id)
    expect(component.deleteRes).toEqual(CartMockData.deleteCartItem);
  }));

  it('move to save for later', (async () => {
    component.isLoggedIn = true
    let id = 1
    let quantity = 2
    let bol = false
    await component.saveForLaterFn(id,quantity,bol)
    expect(component.saveForLaterRes).toEqual(CartMockData.postCartItem);
  }));

  it('move to cart from save for later', (async () => {
    component.isLoggedIn = true
    let id = 1
    let quantity = 2
    let bol = true
    await component.saveForLaterFn(id,quantity,bol)
    expect(component.saveForLaterRes).toEqual(CartMockData.postCartItem);
  }));

  it('post cart items', (async () => {
    component.isLoggedIn = true
    component.cartItems = [
      {
        in_cart: true,
        product_id: 31,
        quantity: 1 
      }
    ]
    await component.postCartItems()
    expect(component.postCartItemsRes).toEqual(CartMockData.postCartItemList);
  }));
});
