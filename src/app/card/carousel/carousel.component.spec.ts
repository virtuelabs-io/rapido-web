import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import {   CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from 'src/app/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule ],
      declarations: [ CarouselComponent, HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
