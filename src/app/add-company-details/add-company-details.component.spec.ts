import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCompanyDetailsComponent } from './add-company-details.component';
import { MatProgressSpinnerModule , MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule, MatCardModule, MatExpansionModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RouterTestingModule } from '@angular/router/testing';

describe('AddCompanyDetailsComponent', () => {
  let component: AddCompanyDetailsComponent;
  let fixture: ComponentFixture<AddCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ReactiveFormsModule, MatProgressSpinnerModule, FormsModule, MatFormFieldModule, MatCardModule,MatInputModule, HttpClientModule, BrowserAnimationsModule ],
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

  it('Mandatory fields during add Company Details', async(() => {
    component.addressFormGroup.controls['name'].setValue("Sam")
    component.addressFormGroup.controls['add1'].setValue("xyz")
    component.addressFormGroup.controls['add2'].setValue("abc cdf")
    component.addressFormGroup.controls['town_city'].setValue("Charles Land")
    component.addressFormGroup.controls['county'].setValue("UK COunty")
    component.addressFormGroup.controls['postCode'].setValue("12345")
    component.addressFormGroup.controls['country'].setValue("UK")

    expect(component.addressFormGroup.controls['name'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['add1'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['add2'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['town_city'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['postCode'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['county'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['country'].hasError('required')).toBeFalsy()
  }));
});