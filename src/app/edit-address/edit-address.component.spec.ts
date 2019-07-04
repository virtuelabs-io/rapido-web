import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAddressComponent } from './edit-address.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressSpinnerModule, MatFormFieldModule,  MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('EditAddressComponent', () => {
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MatProgressSpinnerModule, BrowserAnimationsModule, HttpClientModule, MatCardModule, FormsModule, RouterTestingModule, MatFormFieldModule, MatInputModule ],
      declarations: [ EditAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not create', () => {
    expect(component).toBeTruthy();
  });

  /*it('Mandatory fields during edit Address', async(() => {
    component.id = 48
    component.addressFormGroup.controls['name'].setValue("Sam")
    component.addressFormGroup.controls['add1'].setValue("xyz")
    component.addressFormGroup.controls['add2'].setValue("abc cdf")
    component.addressFormGroup.controls['town_city'].setValue("Charles Land")
    component.addressFormGroup.controls['postCode'].setValue("12345")
    component.addressFormGroup.controls['county'].setValue("UK County")
    component.addressFormGroup.controls['country'].setValue("UK")

    expect(component.addressFormGroup.controls['name'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['add1'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['add2'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['town_city'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['postCode'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['county'].hasError('required')).toBeFalsy()
    expect(component.addressFormGroup.controls['country'].hasError('required')).toBeFalsy()
  }));*/
});