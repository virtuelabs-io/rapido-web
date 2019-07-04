import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';
import { EditCompanyDetailsComponent } from './edit-company-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('EditCompanyDetailsComponent', () => {
  let component: EditCompanyDetailsComponent;
  let fixture: ComponentFixture<EditCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, MatInputModule, HttpClientModule, RouterTestingModule, MatCardModule, MatFormFieldModule,ReactiveFormsModule, MatProgressSpinnerModule, FormsModule  ],
      declarations: [ EditCompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
