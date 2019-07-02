import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddAddressComponent } from './add-address.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatProgressSpinnerModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';

describe('AddAddressComponent', () => {
  let component: AddAddressComponent;
  let fixture: ComponentFixture<AddAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MatProgressSpinnerModule, FormsModule, MatFormFieldModule, MatCardModule, RouterTestingModule, HttpClientModule, MatInputModule, BrowserAnimationsModule ],
      declarations: [ AddAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Mandatory fields during add Address', async(() => {
    component.addressFormGroup.controls['name'].setValue("Sam")
    component.addressFormGroup.controls['add1'].setValue("xyz")
    component.addressFormGroup.controls['add2'].setValue("abc cdf")
    component.addressFormGroup.controls['town_city'].setValue("Charles Land")
    component.addressFormGroup.controls['postCode'].setValue("12345")
    component.addressFormGroup.controls['country'].setValue("UK")

    expect(component.addressFormGroup.controls['name'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['add1'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['add2'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['town_city'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['postCode'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['country'].hasError('required')).toBeFalsy()
  }));
});
