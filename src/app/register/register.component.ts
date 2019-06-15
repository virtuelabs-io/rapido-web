import { Component, OnInit, NgModule} from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SignUpService } from '../services/authentication/sign-up/sign-up.service';
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

	// Service classes
	private _confirmRegistrationService: ConfirmRegistrationService
	private _resendConfirmationCodeService: ResendConfirmationCodeService
	private _signUpService: SignUpService
	_registration: Registration = new Registration();

	// response data/flag to show/handle in UI
	registrationConfirmed: Boolean = false;
	_resentConfirmationCodeResponse: Boolean = false;

	registerFormGroup: FormGroup // UI reactive Form Group variable 
	mobilePrefix = "+91"
	stepperIndex = 0 // Set default active stepper
	regFailedResponse = ""
	confirmationCode: string = "";

	// UI toggle variables
	hidePwd = true // to show password
	hideConfirmPwd = true // to hide password
	wrongCodeMsg: string = ""
	otpSuccess: Boolean = false
	progressSpinner: Boolean = false

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
			mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1000000000), Validators.max(9999999999)]), // Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(9999999999)
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

  // Confirm password and password matching custom validator
	validateAreEqual(fieldControl: FormControl) {
		let confirmValue = fieldControl && fieldControl.value
		let pwdValue = this.registerFormGroup && this.registerFormGroup.controls && this.registerFormGroup.controls['password'].value
		return confirmValue === pwdValue ? null : {
			NotEqual: true
		};
	}

  // Onclick register/submit of first stepper section
	registerUser(formData) {
		this.resetResponseMessages()
    this.progressSpinner = true
    // mapping input values
		this._registration = new Registration(
			['+91' , formData.mobileNumber].join(""),
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
    // preapare payload data
		this._signUpService.signUpData = {
			phone_number: this._registration.phone_number,
			password: this._registration.password,
			attributeList: this._registration.attributeList
		}
    // call Sign Up Service api
		this._signUpService.signUp().
		then( _ => {
			this.progressSpinner = false
			this.stepperIndex = 1
			this.otpSuccess = true
		}).catch(error => {
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
	public passwordMismatch = (password: string, confirmPassword: string) => {
		return password !== confirmPassword
	}

  // for otp confirmation
	confirmRegistration() {
		this.resetResponseMessages()
		this.progressSpinner = true
		this._confirmRegistrationService.username = this._registration.phone_number // setting payload
		this._confirmRegistrationService.confirmRegistration(this.confirmationCode).
		then( _ => {
			this.stepperIndex = 2
			this.progressSpinner = false
			this.registrationConfirmed = true
		}).catch(error => {
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
		promise.then( _ => {
			this.progressSpinner = false
			this._resentConfirmationCodeResponse = true;
		}).catch(error => {
			this.progressSpinner = false
			this._resentConfirmationCodeResponse = false;
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