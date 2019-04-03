import { Component, OnInit, NgModule } from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ForgotPasswordService } from '../services/authentication/forgot-password/forgot-password.service';

@NgModule({
  imports: [
    FormBuilder,
    Validators,
    FormGroup
  ]
})
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public ownerForm: FormGroup;
  private _forgotPasswordService: ForgotPasswordService
  _forgottenPassword: Boolean = false;
  errorResponse: string = ''
  successResponse: string = ''
  error: Boolean = false;
  success: Boolean = false;


  registerFormGroup: FormGroup
  codeConfirmationFormGroup: FormGroup
  newPasswordFormGroup: FormGroup

  mobileNumber: FormControl
  name: FormControl
  email: FormControl
  password: FormControl
  confirmPassword: FormControl
  termsAndConditions: FormControl
  communications: FormControl
  confirmationCode: FormControl

  constructor(private _formBuilder: FormBuilder,
    forgotPasswordService: ForgotPasswordService,
    ) { 
      this._forgotPasswordService = forgotPasswordService
    }

  ngOnInit() {
    this.mobileNumber = new FormControl('', [Validators.required]) // , Validators.pattern('^[0-9]+$')
    this.confirmationCode = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)])
    this.password = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('', [Validators.required]);

    this.registerFormGroup = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required,  ])
    }) // ,Validators.pattern('^[0-9]+$'), Validators.min(1000000000), Validators.max(9999999999)
    this.codeConfirmationFormGroup = this._formBuilder.group({
      mobileNumber: this.mobileNumber,
      confirmationCode: this.confirmationCode
    })
    this.newPasswordFormGroup = this._formBuilder.group({
      

      password: this.password,
      confirmPassword: this.confirmPassword
    })
    this.codeConfirmationFormGroup.get('mobileNumber').disable();

  }

  forgotPassword(){
    this.error = false
    this.success = false
    this._forgotPasswordService.username = this.mobileNumber.value
    console.log(this._forgotPasswordService.username)
    const promise = this._forgotPasswordService.forgotPassword()
    console.log(promise)
    promise.then(value => {
      this._forgottenPassword = true;
      this.success = true
      // this.successResponse = value._message
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._forgottenPassword = false;
      this.error = true
      this.errorResponse = error._message 
      console.log(error) // response from a graceful reject
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerFormGroup.controls[controlName].hasError(errorName);
  }
  createUser(evt){
    console.log(evt);
  } 

}
