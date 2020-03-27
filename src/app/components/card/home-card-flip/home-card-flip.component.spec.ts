import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeCardFlipComponent } from './home-card-flip.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { ProductResultsComponent } from '../../product-results/product-results.component';
import {Location} from "@angular/common";

describe('HomeCardFlipComponent', () => {
  let component: HomeCardFlipComponent;
  let fixture: ComponentFixture<HomeCardFlipComponent>;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: 'products', component: ProductResultsComponent}
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      declarations: [ HomeCardFlipComponent, ProductResultsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HomeCardFlipComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('routing to the selected product based on the query', fakeAsync(() => {
    let query = 'Watches'
    component.cardClick(query)
    tick()
    expect(location.path()).toEqual('/products?q=Watches');
  }));
});
