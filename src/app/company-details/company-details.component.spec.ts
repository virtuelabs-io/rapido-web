import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CompanyDetailsComponent } from './company-details.component';
import { MatSnackBarModule, MatInputModule, MatCardModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule, BrowserAnimationsModule, MatInputModule, HttpClientModule, RouterTestingModule, MatCardModule, MatFormFieldModule,ReactiveFormsModule, MatProgressSpinnerModule, FormsModule ],
      declarations: [ CompanyDetailsComponent ]
    })
    .compileComponents();
    router = TestBed.get(Router);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
