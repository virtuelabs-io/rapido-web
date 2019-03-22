import { Component, OnInit, NgModule} from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.mobileNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    this.name = new FormControl('', [Validators.required, Validators.maxLength(20)])
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.password = new FormControl('', [Validators.required])
    this.confirmPassword = new FormControl('', [Validators.required])
    this.termsAndConditions = new FormControl('', [Validators.required])
    this.communications = new FormControl('', [Validators.required])
    this.confirmationCode = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])

    this.registerFormGroup = this._formBuilder.group({
      mobileNumber: this.mobileNumber,
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      termsAndConditions: this.termsAndConditions,
      communications: this.communications
    })
    this.codeConfirmationFormGroup = this._formBuilder.group({
      mobileNumber: this.mobileNumber,
      confirmationCode: this.confirmationCode
    })
  }

  registerUser(){
    console.log("Executed", this.registerFormGroup)
  }

  confirmUser(){

  }

  // getErrorMessage() {
  //   this._registerFormGroup.get()
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //       this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }
  // getMobileErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value Anirup' :'';
  // }
  // getPasswordErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :'';
  // }

}
