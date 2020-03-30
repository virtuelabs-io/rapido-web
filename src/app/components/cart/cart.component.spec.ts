import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing'
import {
  MatStepperModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material'
import { CartComponent } from './cart.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, Routes } from '@angular/router'
import { LogInComponent } from '../log-in/log-in.component'
import { CartMockService } from 'src/app/services/cart/cart.mock.service'
import { CartService } from 'src/app/services/cart/cart.service'
import { CheckoutComponent } from '../checkout/checkout.component'
import { CartMockData } from 'src/app/services/cart/cart.mock.data'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { GuestCartMockData } from 'src/app/services/guests/guest-cart.mock.data'
import { GuestCartMockService } from 'src/app/services/guests/guest-cart.mock.service'
import { GuestCartService } from 'src/app/services/guests/guest-cart.service'
import { Location } from '@angular/common'

describe('CartComponent', () => {
  let cartMockService: CartService = new CartMockService()
  let guestCartMockService: GuestCartService = new GuestCartMockService()
  let component: CartComponent
  let fixture: ComponentFixture<CartComponent>
  let router: Router
  let location: Location

  const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'cart/checkout', component: CheckoutComponent }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatStepperModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        MatSnackBarModule,
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [CartComponent, LogInComponent, CheckoutComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(CartComponent)
    fixture.ngZone.run(() => {
      router.initialNavigation()
    })
    component = fixture.componentInstance
    component._cartService = cartMockService
    component._guestCartService = guestCartMockService
    fixture.detectChanges()
  })

  it('should create', () => {
    component.isLoggedIn = true
    expect(component).toBeTruthy()
  })

  it('fetch cart items if present', async () => {
    component.isLoggedIn = true
    await component.getCartItems()
    expect(component.fetchRes).toEqual(CartMockData.getCartItems)
  })

  it('fetch cart items if user is not logged in', async () => {
    component.isLoggedIn = false
    await component.getCartItems()
    expect(component.fetchRes).toEqual(GuestCartMockData.getCartItems)
  })

  it('delete from cart', async () => {
    component.isLoggedIn = true
    let id = 1
    await component.deleteCartItem(id)
    expect(component.deleteRes).toEqual(CartMockData.deleteCartItem)
  })

  it('delete from cart if user is not logged in', async () => {
    component.isLoggedIn = false
    let id = 1
    await component.deleteCartItem(id)
    expect(component.deleteRes).toEqual(GuestCartMockData.deleteCartItem)
  })

  it('move to save for later', async () => {
    component.isLoggedIn = true
    let id = 1
    let quantity = 2
    let bol = false
    await component.saveForLaterFn(id, quantity, bol)
    expect(component.saveForLaterRes).toEqual(CartMockData.postCartItem)
  })

  it('move to save for later when not logged in', fakeAsync(() => {
    component.isLoggedIn = false
    let id = 1
    let quantity = 2
    let bol = false
    component.saveForLaterFn(id, quantity, bol)
    tick()
    expect(location.path()).toEqual('/login')
  }))

  it('move to cart from save for later', async () => {
    component.isLoggedIn = true
    let id = 1
    let quantity = 2
    let bol = true
    await component.saveForLaterFn(id, quantity, bol)
    expect(component.saveForLaterRes).toEqual(CartMockData.postCartItem)
  })

  it('post cart items', async () => {
    component.isLoggedIn = true
    component.cartItems = [
      {
        in_cart: true,
        product_id: 31,
        quantity: 1
      }
    ]
    await component.postCartItems()
    expect(component.postCartItemsRes).toEqual(CartMockData.postCartItemList)
  })

  it('post cart items when not logged in', async () => {
    component.isLoggedIn = false
    component.cartItems = [
      {
        in_cart: true,
        product_id: 31,
        quantity: 1
      }
    ]
    await component.postCartItems()
    expect(component.postCartItemsRes).toEqual(CartMockData.postCartItemList)
  })

  it('bind the cart details to the UI controls', async () => {
    component.isLoggedIn = true
    await component.getCartItems()
    expect(component.fetchRes[0].cartItem.quantity).toEqual(
      component.cartItems[0].quantity
    )
    expect(
      parseFloat(component.fetchRes[0].itemDetails.price).toFixed(2)
    ).toEqual(component.cartItems[0].amount)
    expect(component.fetchRes[0].itemDetails.name).toEqual(
      component.cartItems[0].title
    )
  })

  it('bind the cart details to the UI controls when not logged in', async () => {
    component.isLoggedIn = false
    await component.getCartItems()
    expect(component.fetchRes[0].guestCartItem.quantity).toEqual(
      component.cartItems[0].quantity
    )
    expect(
      parseFloat(component.fetchRes[0].itemDetails.price).toFixed(2)
    ).toEqual(component.cartItems[0].amount)
    expect(component.fetchRes[0].itemDetails.name).toEqual(
      component.cartItems[0].title
    )
  })

  it('Minimum quantity check in cart', async () => {
    component.isLoggedIn = true
    await component.getCartItems()
    component.quantityChange(1, 0)
    expect(component.cartItems[0].quantity).toEqual(1)
  })

  it('Minimum quantity check in cart when not logged in', async () => {
    component.isLoggedIn = false
    await component.getCartItems()
    component.quantityChange(1, 0)
    expect(component.cartItems[0].quantity).toEqual(1)
  })

  it('negative quntity check for the cart items', async () => {
    component.isLoggedIn = true
    await component.getCartItems()
    component.quantityChange(1, 2)
    expect(component.cartAmount).toEqual(32998.0)
  })

  it('negative quntity check for the cart items when not logged in', async () => {
    component.isLoggedIn = false
    await component.getCartItems()
    component.quantityChange(1, 2)
    expect(component.cartAmount).toEqual(32998.0)
  })
})
