import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AddressComponent } from "./address.component";
import { HttpClientModule } from "@angular/common/http";
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatFormFieldModule,
} from "@angular/material";
import { LogInComponent } from "../log-in/log-in.component";
import { Router, Routes } from "@angular/router";
import { EditAddressComponent } from "../edit-address/edit-address.component";
import { AddressDetailsMockService } from "../../services/customer/address-details.mock.service";
import { AddressDetailsService } from "../../services/customer/address-details.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Common } from "src/app/utils/common";
import { AddressDetailsMockData } from "src/app/services/customer/address-details.mock.data";
import { Location } from "@angular/common";

describe("AddressComponent", () => {
  let addressDetailsMockService: AddressDetailsService = new AddressDetailsMockService();
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: "login", component: LogInComponent },
    { path: "profile/address", component: AddressComponent },
    {
      path: "profile/address/editAddress/:id",
      component: EditAddressComponent,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        MatProgressSpinnerModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [AddressComponent, LogInComponent, EditAddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AddressComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    component._addressDetailsService = addressDetailsMockService;
    fixture.detectChanges();
  });

  it("should create", () => {
    component.isLoggedIn = true;
    expect(component).toBeTruthy();
  });

  it("should fetch address/s if present", () => {
    component.isLoggedIn = true;
    component.getAddressList();
    expect(component.address).toEqual(AddressDetailsMockData.addressList);
  });

  it("delete functionality", () => {
    component.isLoggedIn = true;
    component.addressDelete(1);
    expect(component.delRes).toEqual(AddressDetailsMockData.deleteAddress);
  });

  it("route to edit component", fakeAsync(() => {
    component.addressEdit(1);
    tick();
    expect(location.path()).toEqual("/profile/address/editAddress/1");
  }));

  it("should map the fetched data to the UI control", () => {
    component.isLoggedIn = true;
    component.getAddressList();
    expect(component.address[0].full_name).toEqual(
      AddressDetailsMockData.addressList[0].full_name
    );
    expect(component.address[0].addr_1).toEqual(
      AddressDetailsMockData.addressList[0].addr_1
    );
    expect(component.address[0].addr_2).toEqual(
      AddressDetailsMockData.addressList[0].addr_2
    );
    expect(component.address[0].city).toEqual(
      AddressDetailsMockData.addressList[0].city
    );
    expect(component.address[0].county).toEqual(
      AddressDetailsMockData.addressList[0].county
    );
    expect(component.address[0].postcode).toEqual(
      AddressDetailsMockData.addressList[0].postcode
    );
    expect(component.address[0].country).toEqual(
      AddressDetailsMockData.addressList[0].country
    );
  });
});
