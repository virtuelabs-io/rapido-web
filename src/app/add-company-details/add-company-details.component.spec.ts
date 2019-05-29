import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddCompanyDetailsComponent } from './add-company-details.component';
import { MatMenuModule , MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule, MatCardModule, MatExpansionModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('AddCompanyDetailsComponent', () => {
  let component: AddCompanyDetailsComponent;
  let fixture: ComponentFixture<AddCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatFormFieldModule, MatCardModule,MatInputModule, HttpClientModule, BrowserAnimationsModule ],
      declarations: [ AddCompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
