import { Component, OnInit, NgModule } from "@angular/core"
import { Registration } from "../../services/authentication/helpers/registration"
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms"
import { SignUpService } from "../../services/authentication/sign-up/sign-up.service"
import { ConfirmRegistrationService } from "../../services/authentication/confirm-registration/confirm-registration.service"
import { ResendConfirmationCodeService } from "../../services/authentication/resend-confirmation-code/resend-confirmation-code.service"
import { Constants } from "../../utils/constants"

@NgModule({
  imports: [FormBuilder, Validators, FormGroup],
})
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  // response data/flag to show/handle in UI
  registrationConfirmed: Boolean = false
  _resentConfirmationCodeResponse: Boolean = false
  countryCode: string = Constants.DEFAULT_PHONE_CODE
  stepperIndex: number = 0 // Set default active stepper
  regFailedResponse: string = ""
  confirmationCode: string = ""
  // UI toggle variables
  hidePwd: Boolean = true // to show password
  hideConfirmPwd: Boolean = true // to hide password
  wrongCodeMsg: string = ""
  otpSuccess: Boolean = false
  progressSpinner: Boolean = false //TODO: make it button specific.
  // Service classes
  private _confirmRegistrationService: ConfirmRegistrationService
  private _resendConfirmationCodeService: ResendConfirmationCodeService
  private _signUpService: SignUpService
  _registration: Registration = new Registration()
  registerFormGroup: FormGroup // UI reactive Form Group variable

  constructor(
    signUpService: SignUpService,
    confirmRegistrationService: ConfirmRegistrationService,
    resendConfirmationCodeService: ResendConfirmationCodeService
  ) {
    this._signUpService = signUpService
    this._confirmRegistrationService = confirmRegistrationService
    this._resendConfirmationCodeService = resendConfirmationCodeService
  }

  ngOnInit() {
    // Instantiating form group and setting default values for reg form
    this.registerFormGroup = new FormGroup({
      mobileNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.min(1000000000),
        Validators.max(9999999999),
      ]), // Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(9999999999)
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(3),
        Validators.pattern("[a-zA-Z][a-zA-Z ]+"),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
        ),
      ]),
      confirmPassword: new FormControl("", [
        Validators.compose([
          Validators.required,
          this.validateAreEqual.bind(this),
        ]),
      ]),
      termsAndConditions: new FormControl(false, Validators.pattern("true")),
      communications: new FormControl(false),
    })
  }

  // Onclick register/submit of first stepper section
  registerUser(formData) {
    if (this.passwordMismatch()) {
      this.regFailedResponse = Constants.PASSWORD_MISMATCH_ERROR
      throw Error(Constants.PASSWORD_MISMATCH_ERROR)
    }
    this.resetResponseMessages()
    this.progressSpinner = true
    // mapping input values
    this._registration = new Registration(
      [this.countryCode, formData.mobileNumber].join(""),
      formData.email,
      formData.name,
      formData.password,
      formData.termsAndConditions.toString(),
      formData.communications.toString(),
      "true",
      "true"
    )
    this._registration._attributeList.length = 0
    this._registration.createAttributeList()
    // preapare payload data
    this._signUpService.signUpData = {
      phone_number: this._registration.phone_number,
      password: this._registration.password,
      attributeList: this._registration.attributeList,
    }
    // call Sign Up Service api
    this._signUpService
      .signUp()
      .then((_) => {
        this.progressSpinner = false
        this.stepperIndex = 1
        this.otpSuccess = true
      })
      .catch((error) => {
        this.progressSpinner = false
        this.stepperIndex = 0
        this.otpSuccess = false
        this.regFailedResponse = error.data.message
      })
  }

  // Form control show/hide error messages
  public hasError = (controlName: string, errorName: string) => {
    return this.registerFormGroup.controls[controlName].hasError(errorName)
  }

  // show/hide password mismatch error message
  public passwordMismatch = () => {
    return (
      this.registerFormGroup.controls["password"].value !==
      this.registerFormGroup.controls["confirmPassword"].value
    )
  }

  // Confirm password and password matching custom validator
  validateAreEqual() {
    let confirmValue =
      this.registerFormGroup &&
      this.registerFormGroup.controls &&
      this.registerFormGroup.controls["confirmPassword"].value
    let pwdValue =
      this.registerFormGroup &&
      this.registerFormGroup.controls &&
      this.registerFormGroup.controls["password"].value
    return confirmValue === pwdValue
      ? null
      : {
          NotEqual: true,
        }
  }

  // for otp confirmation
  confirmRegistration() {
    this.resetResponseMessages()
    this.progressSpinner = true
    this._confirmRegistrationService.username = this._registration.phone_number // setting payload
    this._confirmRegistrationService
      .confirmRegistration(this.confirmationCode)
      .then((_) => {
        this.stepperIndex = 2
        this.progressSpinner = false
        this.registrationConfirmed = true
      })
      .catch((error) => {
        this.stepperIndex = 1
        this.wrongCodeMsg = error._data.message || error.message
        this.progressSpinner = false
        this.registrationConfirmed = false
      })
  }

  resendConfirmationCode() {
    this.resetResponseMessages()
    this.progressSpinner = true
    this._resendConfirmationCodeService.username = this._registration.phone_number
    const promise = this._resendConfirmationCodeService.resendConfirmationCode()
    promise
      .then((_) => {
        this.progressSpinner = false
        this._resentConfirmationCodeResponse = true
      })
      .catch((error) => {
        this.progressSpinner = false
        this._resentConfirmationCodeResponse = false
        this.wrongCodeMsg = error._data.message || error.message
      })
  }

  // resets all response alerts boxes
  resetResponseMessages() {
    this.registrationConfirmed = null
    this._resentConfirmationCodeResponse = null
    this.wrongCodeMsg = null
    this.regFailedResponse = null
    this.otpSuccess = null
  }
}
