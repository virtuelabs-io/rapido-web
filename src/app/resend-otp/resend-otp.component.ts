import { Component, OnInit, NgModule } from '@angular/core';
import { ResendOtpService } from '../shared-services/resend-otp/resend-otp.services';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ResendConfirmationCodeService } from '../services/authentication/resend-confirmation-code/resend-confirmation-code.service';
import { ConfirmRegistrationService } from '../services/authentication/confirm-registration/confirm-registration.service';

@NgModule({
	imports: [
		FormBuilder,
		Validators,
		FormGroup
	]
})

@Component({
  selector: 'app-resend-otp',
  templateUrl: './resend-otp.component.html',
  styleUrls: ['./resend-otp.component.scss']
})

export class ResendOtpComponent implements OnInit {
  countryCode: string = "+91"
  stepperIndex: number = 0
  confirmationCode: string = ""
  mobileNumber:string = ""
  otpSuccess: Boolean = false
  progressSpinner: Boolean = false
  wrongCodeMsg: string = ""
  _resentConfirmationCodeResponse: Boolean = false;
  otpReqFormGroup: FormGroup // UI reactive Form Group variable 
  private _resendConfirmationCodeService: ResendConfirmationCodeService
  private _confirmRegistrationService: ConfirmRegistrationService
  constructor(
    private _resendOtpService : ResendOtpService,
    confirmRegistrationService: ConfirmRegistrationService,
    resendConfirmationCodeService: ResendConfirmationCodeService
  ) { 
    this._confirmRegistrationService = confirmRegistrationService
    this._resendConfirmationCodeService = resendConfirmationCodeService
  }

  ngOnInit() {
    this._resendOtpService.currentNumber.subscribe(state => {
      this.mobileNumber = state
      console.log(this.mobileNumber)
    })
    // Instantiating form group and setting default values for reg form
		this.otpReqFormGroup = new FormGroup({
		mobileNumber: new FormControl(this.mobileNumber)
		})
  }

  confirmRegistration() {
	//	this.resetResponseMessages()
		this.progressSpinner = true
		this._confirmRegistrationService.username = [ this.countryCode , this.mobileNumber ].join("")// setting payload
		this._confirmRegistrationService.confirmRegistration(this.confirmationCode).
		then( _ => {
			this.stepperIndex = 2
			this.progressSpinner = false
		//	this.registrationConfirmed = true
		}).catch(error => {
			this.stepperIndex = 1
			this.wrongCodeMsg = error._data.message || error.message
			this.progressSpinner = false
		//	this.registrationConfirmed = false
		})
  }
  
  resendConfirmationCode() {
	//	this.resetResponseMessages()
		this.progressSpinner = true
		this._resendConfirmationCodeService.username = [ this.countryCode , this.mobileNumber ].join("")
		const promise = this._resendConfirmationCodeService.resendConfirmationCode()
		promise.then( _ => {
      this.otpSuccess = true
			this.progressSpinner = false
			this._resentConfirmationCodeResponse = true
		}).catch(error => {
      this.otpSuccess = false
			this.progressSpinner = false
			this._resentConfirmationCodeResponse = false
			this.wrongCodeMsg = error._data.message || error.message
		})
	}
}
