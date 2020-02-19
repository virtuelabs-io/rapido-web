import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuMobileComponent } from './product-menu-mobile.component';

describe('ProductMenuMobileComponent', () => {
  let component: ProductMenuMobileComponent;
  let fixture: ComponentFixture<ProductMenuMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
