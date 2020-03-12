import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselFlipComponent } from './carousel-flip.component';

describe('CarouselFlipComponent', () => {
  let component: CarouselFlipComponent;
  let fixture: ComponentFixture<CarouselFlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselFlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
