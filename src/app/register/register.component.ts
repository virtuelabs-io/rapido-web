import { Component, OnInit, NgModule} from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@NgModule({
  imports: [
    FormBuilder,
    Validators,
    FormGroup,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule
  ]
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public ownerForm: FormGroup;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  hide = true;

  // email = new FormControl('', [Validators.required, Validators.email]);
  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //       this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }
  // mobileNumber = new FormControl('', [Validators.required, Validators.email]);
  // getMobileErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value Anirup' :'';
  // }
  // password = new FormControl('', [Validators.required, Validators.email]);
  // getPasswordErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :'';
  // }
  profileForm = new FormGroup({
    mobileNumber: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    alert("test");
  }

  _registration: Registration = new Registration(
    "+447783307487",
    "reddy.horcrux@gmail.com",
    "Sangram Reddy",
    "Sangram1992",
    "true",
    "true",
    "true",
    "true",
    "true"
  );

  _userRegisteredResponse: Boolean = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this._formBuilder.group({
      mobileNumber: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [ '', [ Validators.required, Validators.email ] ]
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  } 

}
