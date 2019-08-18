import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAddressComponent } from './edit-address.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressSpinnerModule, MatFormFieldModule,  MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressDetailsMockService } from '../services/customer/address-details.mock.service';
import { AddressDetailsService } from '../services/customer/address-details.service';
import { Router, Routes } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { Location } from '@angular/common';

describe('EditAddressComponent', () => {
  let addressDetailsMockService: AddressDetailsService = new AddressDetailsMockService()
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;
  let router: Router

  const routes: Routes = [
    { path: 'profile/address', component: AddressComponent},
    { path: 'profile/address/editAddress/:id', component: EditAddressComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        FormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AddressComponent,
        EditAddressComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router)
    fixture = TestBed.createComponent(EditAddressComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    component._addressDetailsService = addressDetailsMockService
    fixture.detectChanges();
  });

  it('should not create', () => {
    expect(component).toBeTruthy();
  });

  it('Mandatory fields during edit Address', async(() => {
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
  }));

  it('Save Address sucessfully', async(() => {
    console.log()
    component.id = 1
    expect(component.saveAddress()).toBeUndefined()
    expect(component.showSpinner).toBeFalsy()
  }));
});
