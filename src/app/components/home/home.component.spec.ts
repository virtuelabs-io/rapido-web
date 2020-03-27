import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { OrdersMockData } from 'src/app/services/orders/orders.mock.data';
import { OrdersMockService } from '../../services/orders/orders.mock.service';
import { Order } from 'src/app/services/orders/order';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let ordersMockService: OrdersService = new OrdersMockService()

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ HomeComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component._orderService = ordersMockService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('frequently bought products',(async () => {
    await component.getFrequentlyBought()
    expect(component.freqBoughtSet).toEqual(OrdersMockData.frequentlyBoughtSet);
  }));
  
  it('frequently bought products',(async () => {
    await component.getFrequentlyBoughtByMe()
    expect(component.freqBoughtSet).toEqual(OrdersMockData.frequentlyBoughtByMeSet);
  }));
});
