import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddressComponent } from './address.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { LogInComponent } from '../log-in/log-in.component';
import { Router, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let router: Router;

  const routes: Routes = [
    { path: 'login', component: LogInComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule.withRoutes(routes), MatProgressSpinnerModule, RouterTestingModule, HttpClientModule ],
      declarations: [ AddressComponent, LogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    router.initialNavigation();
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
