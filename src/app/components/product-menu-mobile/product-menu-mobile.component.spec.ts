import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductMenuMobileComponent } from './product-menu-mobile.component';
import { MatTreeModule, MatIconModule } from '@angular/material';
import { Router, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('ProductMenuMobileComponent', () => {
  let component: ProductMenuMobileComponent;
  let fixture: ComponentFixture<ProductMenuMobileComponent>;
  let router: Router;

  // const routes: Routes = [
  //   { path: 'products', component: LogInComponent}
  // ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTreeModule, MatIconModule, RouterTestingModule, HttpClientModule ],
      declarations: [ ProductMenuMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
