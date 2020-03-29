import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { CompanyDetailsComponent } from "./company-details.component";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatSnackBarModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router, Routes } from "@angular/router";
import { LogInComponent } from "../log-in/log-in.component";
import { CompanyDetailsMockData } from "src/app/services/customer/company-details.mock.data";
import { CompanyDetailsMockService } from "../../services/customer/company-details.mock.service";
import { CompanyDetailsService } from "../../services/customer/company-details.service";
import { Location } from "@angular/common";
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

describe("CompanyDetailsComponent", () => {
  let companyDetailsMockService: CompanyDetailsService = new CompanyDetailsMockService();
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;
  let router: Router;
  let location: Location;
  const routes: Routes = [
    { path: "login", component: LogInComponent },
    { path: "profile/companyDetails", component: CompanyDetailsComponent },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatInputModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        FormsModule,
      ],
      declarations: [
        ConfirmationDialogComponent,
        CompanyDetailsComponent,
        LogInComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [ConfirmationDialogComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(CompanyDetailsComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    component._companyDetailsService = companyDetailsMockService;
    fixture.detectChanges();
  });

  it("should create", () => {
    component.isLoggedIn = true;
    expect(component).toBeTruthy();
  });

  it("should fetch company details if present", () => {
    component.isLoggedIn = true;
    component.getCompanyDetails();
    expect(component.addressFormGroup.controls["name"].value).toEqual(
      CompanyDetailsMockData.company.company_name
    );
    expect(component.addressFormGroup.controls["add1"].value).toEqual(
      CompanyDetailsMockData.company.addr_1
    );
    expect(component.addressFormGroup.controls["add2"].value).toEqual(
      CompanyDetailsMockData.company.addr_2
    );
    expect(component.addressFormGroup.controls["town_city"].value).toEqual(
      CompanyDetailsMockData.company.city
    );
    expect(component.addressFormGroup.controls["postCode"].value).toEqual(
      CompanyDetailsMockData.company.postcode
    );
    expect(component.addressFormGroup.controls["country"].value).toEqual(
      CompanyDetailsMockData.company.country
    );
    expect(component.addressFormGroup.controls["county"].value).toEqual(
      CompanyDetailsMockData.company.county
    );
  });

  it("should post company details", () => {
    component.addressFormGroup.controls["name"].setValue(
      "XYZ Company Pvt Ltd."
    );
    component.addressFormGroup.controls["add1"].setValue("add1");
    component.addressFormGroup.controls["add2"].setValue("add2");
    component.addressFormGroup.controls["town_city"].setValue("town");
    component.addressFormGroup.controls["postCode"].setValue("12345");
    component.addressFormGroup.controls["country"].setValue("country");
    component.addressFormGroup.controls["county"].setValue("county");
    component.postCompanyDetails(component.addressFormGroup);
    expect(component.postRes).toEqual(
      CompanyDetailsMockData.postCompanyDetails
    );
  });

  it("delete company details", () => {
    component.isLoggedIn = true;
    component.deleteCompanyDetails();
    expect(component.deleteRes).toBeTruthy(
      CompanyDetailsMockData.deleteCompany
    );
  });

  it("update company details", () => {
    component.isLoggedIn = true;
    component.addressFormGroup.controls["name"].setValue(
      "XYZ Company Pvt Ltd."
    );
    component.addressFormGroup.controls["add1"].setValue("add1");
    component.addressFormGroup.controls["add2"].setValue("add2");
    component.addressFormGroup.controls["town_city"].setValue("town");
    component.addressFormGroup.controls["postCode"].setValue("12345");
    component.addressFormGroup.controls["country"].setValue("country");
    component.addressFormGroup.controls["county"].setValue("county");
    component.modalSave();
    expect(component.putRes).toBeTruthy(
      CompanyDetailsMockData.putComapnyDetails
    );
  });
});
