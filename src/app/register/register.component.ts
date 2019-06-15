import { Component, OnInit, NgModule} from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SignUpService } from '../services/authentication/sign-up/sign-up.service';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { ConfirmRegistrationService } from '../services/authentication/confirm-registration/confirm-registration.service';
import { ResendConfirmationCodeService } from '../services/authentication/resend-confirmation-code/resend-confirmation-code.service';

@NgModule({
  imports: [
    FormBuilder,
    Validators,
    FormGroup
  ]
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  _profileService: ProfileService;
  private _confirmRegistrationService: ConfirmRegistrationService
  private _resendConfirmationCodeService: ResendConfirmationCodeService
  _confirmRegistrationResponse: Boolean = false;
  _resentConfirmationCodeResponse: Boolean = false;

  public ownerForm: FormGroup;
  registerFormGroup: FormGroup
  codeConfirmationFormGroup: FormGroup
  mobileNumber: FormControl
  name: FormControl
  email: FormControl
  password: FormControl
  confirmPassword: FormControl
  termsAndConditions: FormControl
  communications: FormControl

  _mobilePrefix = "+91"
  _stepperIndex = 1 
  _regFailed = ""
  confirmationCode: string ="";

  _registration: Registration = new Registration();
  _userRegisteredResponse: Boolean = false;
  progressSpinner: Boolean = false

  // UI toggle variables
  hidePwd = true  // 
  hideConfirmPwd = true
  wrongCodeMsg: string = ""
  otpSuccess: Boolean = false


  private _signUpService: SignUpService

  constructor(
    private _formBuilder: FormBuilder,
    signUpService: SignUpService,
    profileService: ProfileService,
    confirmRegistrationService: ConfirmRegistrationService,
    resendConfirmationCodeService: ResendConfirmationCodeService
    ) { 
    this._signUpService = signUpService
    this._profileService = profileService
    this._confirmRegistrationService = confirmRegistrationService
    this._resendConfirmationCodeService = resendConfirmationCodeService
  }

  ngOnInit() {
    this.registerFormGroup = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(9999999999) ]), // Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(9999999999)
      name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]), // Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!^\d\w].{8,25}$')
      confirmPassword: new FormControl(
        '', [Validators.compose(
            [Validators.required, this.validateAreEqual.bind(this)]
        )]),
      termsAndConditions: new FormControl(false, Validators.pattern('true')),
      communications: new FormControl(false)
    })
  }

  validateAreEqual(fieldControl: FormControl) {
    let confirmValue = fieldControl && fieldControl.value
    let pwdValue = this.registerFormGroup && this.registerFormGroup.controls && this.registerFormGroup.controls['password'].value
    return  confirmValue === pwdValue ? null : {
        NotEqual: true
    };
  }

  registerUser(formData){
    this.resetResponseMessages()
    this.progressSpinner = true
    this._registration = new Registration(
      '+91'+formData.mobileNumber,
      formData.email,
      formData.name,
      formData.password,
      formData.termsAndConditions.toString(),
      formData.communications.toString(),
      "true",
      "true"
    );
    this._registration._attributeList.length = 0
    this._registration.createAttributeList()
    this._signUpService.signUpData = {
      phone_number: this._registration.phone_number,
      password: this._registration.password,
      attributeList: this._registration.attributeList
    }

    this._signUpService.signUp().
    then(value => {
      this._userRegisteredResponse = true
      this.progressSpinner = false
      this._stepperIndex = 1
      this.otpSuccess = true
    }).catch(error => {
      this._userRegisteredResponse = false
      this.progressSpinner = false
      this._stepperIndex = 0
      this.otpSuccess= false
      this._regFailed = error.data.message
      console.log(error) // response from a graceful reject
    })

   }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerFormGroup.controls[controlName].hasError(errorName)
  }
  
  public passwordMismatch = (password: string, confirmPassword: string) =>{
    return password !== confirmPassword
  }
 
  confirmRegistration(){
    this.resetResponseMessages()
    this.progressSpinner = true
    this._confirmRegistrationService.username = this._registration.phone_number
    this._confirmRegistrationService.confirmRegistration(this.confirmationCode).
    then( _ => {
      this._stepperIndex = 2
      this.progressSpinner = false
      this._confirmRegistrationResponse = true
    }).catch(error => {
      this._stepperIndex = 1
      this.wrongCodeMsg = error._data.message || error.message
      this.progressSpinner = false
      this._confirmRegistrationResponse = false
    })
  }

  resendConfirmationCode(){
    this.resetResponseMessages()
    this.progressSpinner = true
    this._resendConfirmationCodeService.username = this._registration.phone_number
    const promise = this._resendConfirmationCodeService.resendConfirmationCode()
    promise.then(value => {
      this.progressSpinner = false
      this._resentConfirmationCodeResponse = true;
    }).catch(error => {
      this.progressSpinner = false
      this._resentConfirmationCodeResponse = false;
      this.wrongCodeMsg = error._data.message || error.message
    })
  }

  resetResponseMessages(){
    this._confirmRegistrationResponse = null
    this._resentConfirmationCodeResponse = null
    this.wrongCodeMsg = null
    this._regFailed = null
    this.otpSuccess = null
  }

}