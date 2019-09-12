import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewsComponent } from './customer-reviews.component';

describe('CustomerReviewsComponent', () => {
  let component: CustomerReviewsComponent;
  let fixture: ComponentFixture<CustomerReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
