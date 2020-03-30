import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { ForgotPasswordComponent } from "./forgot-password.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterTestingModule } from "@angular/router/testing"
import { HttpClientModule } from "@angular/common/http"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms"
import {
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatStepperModule,
} from "@angular/material"

describe("ForgotPasswordComponent", () => {
  let component: ForgotPasswordComponent
  let fixture: ComponentFixture<ForgotPasswordComponent>
  const formBuilder: FormBuilder = new FormBuilder()

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent)
    component = fixture.componentInstance
    component.registerFormGroup = new FormGroup({
      mobileNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.min(1000000000),
        Validators.max(9999999999),
      ]),
    })
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("Submit Button should be disabled when mobile number not entered", async(() => {
    component.ngOnInit()
    expect(component.registerFormGroup.valid).toBeFalsy()
    expect(
      component.registerFormGroup.controls["mobileNumber"].hasError("required")
    ).toBeTruthy()
  }))

  it("Mobile number is mandatory", async(() => {
    component.registerFormGroup.controls["mobileNumber"].setValue("1234567890")
    expect(
      component.registerFormGroup.controls["mobileNumber"].hasError("required")
    ).toBeFalsy()
  }))

  it("Mobile number should not contain characters", async(() => {
    component.registerFormGroup.controls["mobileNumber"].setValue("asd")
    expect(
      component.registerFormGroup.controls["mobileNumber"].hasError("pattern")
    ).toBeTruthy()
  }))

  it("Mobile number should contain 10 digits", async(() => {
    component.registerFormGroup.controls["mobileNumber"].setValue("12345")
    expect(
      component.registerFormGroup.controls["mobileNumber"].hasError("min")
    ).toBeTruthy()
  }))
})
