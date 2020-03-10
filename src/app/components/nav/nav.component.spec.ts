import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TopnavComponent } from '../topnav/topnav.component';
import { MatSnackBarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTreeModule } from '@angular/material';
describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  MatSnackBarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, HttpClientTestingModule,
        BrowserAnimationsModule,  FormsModule, RouterModule.forRoot([]), MatTreeModule ],
      declarations: [ NavComponent, TopnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
