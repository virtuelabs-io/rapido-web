import { Component, OnInit, NgModule} from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SignUpService } from '../services/authentication/sign-up/sign-up.service';
import { ProfileService } from '../services/authentication/profile/profile.service';

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
    "7032908112",
    "reddy.horcrux@gmail.com",
    "Sangram Reddy",
    "Anirup123",
    "true",
    "true",
    "true",
    "true",
    "true"
  );
  
  _userRegisteredResponse: Boolean = false;

  private _signUpService: SignUpService

  constructor(
    private _formBuilder: FormBuilder,
    signUpService: SignUpService,
    profileService: ProfileService
    ) { 
    this._signUpService = signUpService
    this._profileService = profileService
  }

  ngOnInit() {
     this.mobileNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
     this.confirmationCode = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)])

    this.registerFormGroup = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required ]), // Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(9999999999)
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl('', [Validators.required]),
      communications: new FormControl('', [Validators.required])
    })
    this.codeConfirmationFormGroup = this._formBuilder.group({
      mobileNumber: [this.mobileNumber],
      confirmationCode: this.confirmationCode
    })
    this.codeConfirmationFormGroup.get('mobileNumber').disable();

  }

  registerUser(evt){
    this._registration._attributeList.length = 0
    this._registration.createAttributeList()
    this._signUpService.signUpData = {
      phone_number: this._registration.phone_number,
      password: this._registration.password,
      attributeList: this._registration.attributeList
    }

    const promise = this._signUpService.signUp()
    promise.then(value => {
      this._userRegisteredResponse = true
      this._stepperIndex = 1
      console.log(value) // response from successfull resolve
      console.log(this._profileService.cognitoUser); // updated user profile
    }).catch(error => {
      this._userRegisteredResponse = false
      this._stepperIndex = 0
      this._regFailed = error.data.message
      console.log(error) // response from a graceful reject
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerFormGroup.controls[controlName].hasError(errorName);
  }

  stepClick (evt) {
    console.log(evt);
  }  

}
