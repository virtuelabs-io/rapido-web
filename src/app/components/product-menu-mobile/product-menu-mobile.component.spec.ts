import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuMobileComponent } from './product-menu-mobile.component';
import { MatTreeModule, MatIconModule } from '@angular/material';

describe('ProductMenuMobileComponent', () => {
  let component: ProductMenuMobileComponent;
  let fixture: ComponentFixture<ProductMenuMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTreeModule, MatIconModule ],
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
