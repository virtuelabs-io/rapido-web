import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductMenuMobileComponent } from './product-menu-mobile.component';
import { MatTreeModule, MatIconModule } from '@angular/material';
import { Router, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductResultsComponent } from '../product-results/product-results.component';
import {Location} from "@angular/common";
import { LeftSectionComponent } from '../leftsection/leftsection.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProductMenuMobileComponent', () => {
  let component: ProductMenuMobileComponent;
  let fixture: ComponentFixture<ProductMenuMobileComponent>;
  let router: Router;
  let location: Location;

   const routes: Routes = [
     { path: 'products', component: ProductResultsComponent }
   ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTreeModule, MatIconModule, RouterTestingModule.withRoutes(routes), HttpClientModule ],
      declarations: [ ProductMenuMobileComponent, ProductResultsComponent, LeftSectionComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ProductMenuMobileComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('route to product card page', fakeAsync(() => {
    component.handleNavigation('plastic')
    tick()
    expect(location.path()).toEqual('/products?q=plastic');
  }));
});
