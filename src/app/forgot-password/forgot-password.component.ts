import { Component, OnInit, NgModule } from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ForgotPasswordService } from '../services/authentication/forgot-password/forgot-password.service';
import { Constants } from '../utils/constants';

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
  private _forgotPasswordService: ForgotPasswordService
  errorResponse: string = ''
  successResponse: string = ''
  error: Boolean = false
  success: Boolean = false
  countryCode: string = Constants.INDIA_PHONE_CODE
  //countryCode: string = Constants.DEFAULT_PHONE_CODE
  registerFormGroup: FormGroup 
  mobileNumber: FormControl
  constructor(private _formBuilder: FormBuilder,
    forgotPasswordService: ForgotPasswordService,
    ) { 
      this._forgotPasswordService = forgotPasswordService
    }

  ngOnInit() {
    this.registerFormGroup = new FormGroup({
      mobileNumber: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1000000000), Validators.max(9999999999) ])
    })
  }

  forgotPassword() {
    this.error = false
    this.success = false
    this._forgotPasswordService.username = [this.countryCode ,this.registerFormGroup.value.mobileNumber].join("");
    const promise = this._forgotPasswordService.forgotPassword()
    promise.then( _ => {
      this.success = true
      this.successResponse = Constants.PASSWORD_CHANGED_SUCCESS_MESSAGE // value.message
    }).catch(error => {
      this.error = true
      this.errorResponse = error._message 
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerFormGroup.controls[controlName].hasError(errorName);
  }
}
