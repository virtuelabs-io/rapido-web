import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from 'src/app/components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {   CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CarouselFlipComponent } from './carousel-flip.component';
import { MatSnackBarModule } from '@angular/material';

describe('CarouselFlipComponent', () => {
  let component: CarouselFlipComponent;
  let fixture: ComponentFixture<CarouselFlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule, MatSnackBarModule ],
      declarations: [ CarouselFlipComponent, HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoggedIn = true
    expect(component).toBeTruthy();
  });
});
