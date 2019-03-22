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
     this.mobileNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
     this.confirmationCode = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)])

    this.registerFormGroup = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
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

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerFormGroup.controls[controlName].hasError(errorName);
  }
  createUser(evt){
    console.log(evt);
  }


}
