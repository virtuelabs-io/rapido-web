import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeCardComponent } from './home-card.component';
import { HomeComponent } from 'src/app/home/home.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { CarouselScrollComponent } from '../carousel-scroll/carousel-scroll.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeCardComponent', () => {
  let component: HomeCardComponent;
  let fixture: ComponentFixture<HomeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ HomeCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
