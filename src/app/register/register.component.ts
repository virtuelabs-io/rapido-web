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
  _confirmationCode: string ="";
  private _confirmRegistrationService: ConfirmRegistrationService
  private _resendConfirmationCodeService: ResendConfirmationCodeService
  _confirmRegistrationResponse: Boolean = false;
  wrongCode: Boolean = false
  wrongCodeMsg: string = ""
  otpSuccess: Boolean = false
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
  confirmationCode: FormControl

  hidePwd = true
  hideConfirmPwd = true
  _mobilePrefix = "+91"
  _stepperIndex = 0 
  _regFailed = ""

  _registration: Registration = new Registration(
    // "7032908112",
    // "reddy.horcrux@gmail.com",
    // "Sangram Reddy",
    // "Anirup123",
    // "true",
    // "true",
    // "true",
    // "true",
    // "true"
  );
  
  _userRegisteredResponse: Boolean = false;
  _progressSpinner: Boolean = false

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

    // stepper 2# -> codeConfirmationFormGroup  
    /* this.codeConfirmationFormGroup = this._formBuilder.group({
      mobileNumberConfirm:  new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(9999999999)]),
      confirmationCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)])
    })
    this.codeConfirmationFormGroup.get('mobileNumberConfirm').disable(); */

  }

  validateAreEqual(fieldControl: FormControl) {
    let confirmValue = fieldControl && fieldControl.value
    let pwdValue = this.registerFormGroup && this.registerFormGroup.controls && this.registerFormGroup.controls['password'].value
    return  confirmValue === pwdValue ? null : {
        NotEqual: true
    };
  }

  registerUser(formData){
    this._progressSpinner = true
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
      this._progressSpinner = false
      this._stepperIndex = 1
      this.otpSuccess = true
      console.log(value) // response from successfull resolve
      console.log(this._profileService.cognitoUser); // updated user profile
    }).catch(error => {
      this._userRegisteredResponse = false
      this._progressSpinner = false
      this._stepperIndex = 0
      this.otpSuccess= false
      this._regFailed = error.data.message
      console.log(error) // response from a graceful reject
    })

    // const promise = this._signUpService.signUp()
    // promise.then(value => {
    //   this._userRegisteredResponse = true
    //   this._progressSpinner = false
    //   this._stepperIndex = 1
    //   this.otpSuccess = true
    //   console.log(value) // response from successfull resolve
    //   console.log(this._profileService.cognitoUser); // updated user profile
    // }).catch(error => {
    //   this._userRegisteredResponse = false
    //   this._progressSpinner = false
    //   this._stepperIndex = 0
    //   this.otpSuccess= false
    //   this._regFailed = error.data.message
    //   console.log(error) // response from a graceful reject
    // })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerFormGroup.controls[controlName].hasError(errorName)
  }
  
  public passwordMismatch = (password: string, confirmPassword: string) =>{
    return password !== confirmPassword
  }
 
  confirmRegistration(){
    this._progressSpinner = true
    this._confirmRegistrationService.username = this._registration.phone_number
    this._confirmRegistrationService.confirmRegistration(this._confirmationCode).
    then( _ => {
      this.wrongCode = false
      this._stepperIndex = 2
      this._progressSpinner = false
      this._confirmRegistrationResponse = true
    }).catch(error => {
      this.wrongCode = true
      this._stepperIndex = 1
      this.wrongCodeMsg = error._data.message || error.message
      this._progressSpinner = false
      this._confirmRegistrationResponse = false
    })
  }

  resendConfirmationCode(){
    this._progressSpinner = true
    this._resendConfirmationCodeService.username = this._registration.phone_number
    const promise = this._resendConfirmationCodeService.resendConfirmationCode()
    promise.then(value => {
      this._progressSpinner = false
      this._resentConfirmationCodeResponse = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._progressSpinner = false
      this._resentConfirmationCodeResponse = false;
      console.log(error) // response from a graceful reject
    })
  }

}