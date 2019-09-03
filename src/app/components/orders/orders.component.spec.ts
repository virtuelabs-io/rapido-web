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
import {Location} from "@angular/common";
import { OrderDetailsComponent } from '../order-details/order-details.component';

describe('OrdersComponent', () => {
  let ordersMockService: OrdersService = new OrdersMockService()
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: 'login', component: LogInComponent},
    { path: 'orders/:id/details', component: OrderDetailsComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule.withRoutes(routes), HttpClientModule ],
      declarations: [ OrdersComponent, LogInComponent, OrderDetailsComponent ]
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
    await component.cancelOrder(id)
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
    expect(component.fetchOrdersRes.orderItemsObject[13][1].order_price).toEqual(component.orders[13].price)
    expect(component.fetchOrdersRes.products[1].name).toEqual(component.products[1].name)
  }));
});
