import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselScrollComponent } from './carousel-scroll.component';

describe('CarouselScrollComponent', () => {
  let component: CarouselScrollComponent;
  let fixture: ComponentFixture<CarouselScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
