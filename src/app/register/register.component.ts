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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    //  dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(10)])
    });





     this.mobileNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    // this.name = new FormControl('', [Validators.required, Validators.maxLength(20)])
    // this.email = new FormControl('', [Validators.required, Validators.email])
    // this.password = new FormControl('', [Validators.required])
    // this.confirmPassword = new FormControl('', [Validators.required])
    // this.termsAndConditions = new FormControl('', [Validators.required])
    // this.communications = new FormControl('', [Validators.required])
     this.confirmationCode = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])

    this.registerFormGroup = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl('', [Validators.required]),
      communications: new FormControl('', [Validators.required])
    })
    this.codeConfirmationFormGroup = this._formBuilder.group({
      mobileNumber: this.mobileNumber,
      confirmationCode: this.confirmationCode
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerFormGroup.controls[controlName].hasError(errorName);
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
