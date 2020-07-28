import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from './orders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LogInComponent } from '../log-in/log-in.component';
import { Router, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdersMockData } from 'src/app/services/orders/orders.mock.data';
import { OrdersMockService } from '../../services/orders/orders.mock.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Location } from "@angular/common";
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { EditReviewComponent } from '../edit-review/edit-review.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateReviewComponent } from '../create-review/create-review.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartMockService } from 'src/app/services/cart/cart.mock.service';

describe('OrdersComponent', () => {
  let cartMockService: CartService = new CartMockService()
  let ordersMockService: OrdersService = new OrdersMockService()
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: 'login', component: LogInComponent},
    { path: 'orders/:id/details', component: OrderDetailsComponent},
    { path: 'review/edit/review/:id', component: EditReviewComponent},
    { path: 'review/create/product/:id', component: CreateReviewComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  MatSnackBarModule, ReactiveFormsModule, BrowserAnimationsModule, MatDialogModule, FormsModule, RouterTestingModule.withRoutes(routes), HttpClientModule ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ OrdersComponent, LogInComponent, OrderDetailsComponent, ConfirmationDialogComponent, EditReviewComponent, CreateReviewComponent ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: { entryComponents: [ ConfirmationDialogComponent ] }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(OrdersComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    component._orderService = ordersMockService
    component.cartService = cartMockService
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoggedIn = true
    expect(component).toBeTruthy();
  });

  it('should fetch order/s if present',(async () => {
    component.isLoggedIn = true
    await component.getOrders()
    expect(component.fetchOrdersRes).toEqual(OrdersMockData.orders);
  }));

  it('cancel order',(async () => {
    let id = 13
    component.isLoggedIn = true
    await component.yesModalAction(id)
    expect(component.cancelOrderRes).toEqual(OrdersMockData.deleteOrder);
  }));

  it('route to order details component',  fakeAsync(() => {
    component.orderDetails(13);
    tick();
    expect(location.path()).toEqual('/orders/13/details')
  }));

  it('map the fetched orders to the UI controls',(async () => {
    component.isLoggedIn = true
    await component.getOrders()
    expect(component.fetchOrdersRes.orderItemsObject[13][1].order_price_total).toEqual(component.orders[13].price)
    expect(component.fetchOrdersRes.products[1].name).toEqual(component.products[1].name)
  }));

  it('route to Edit Review component from Orders component',  fakeAsync(() => {
    component.isLoggedIn = true
    let data = [
      {
        id: 8
      }
    ]
    let productId = 51
    component.handleReviewNavigation(data, productId)
    tick()
    expect(location.path()).toEqual('/review/edit/review/8')
  }));

  it('route to Create Review component from Orders component',  fakeAsync(() => {
    component.isLoggedIn = true
    let data = []
    let productId = 51
    component.handleReviewNavigation(data, productId)
    tick()
    expect(location.path()).toEqual('/review/create/product/51')
  }));

  it('repeat order functionality',(async () => {
    component.isLoggedIn = true
    component.newItemsToCart = [{
      "id": 1,
      "quantity": 3
    }]
    await component.postCartItems()
    expect(component.postCartItemRes).toEqual(OrdersMockData.postCartItemList)
  }));
});