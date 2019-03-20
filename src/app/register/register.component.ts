import { Component, OnInit, NgModule} from '@angular/core';
import { MatStepperModule } from '@angular/material';
import { Registration } from '../services/authentication/helpers/registration';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@NgModule({
  imports: [  FormBuilder, Validators, FormGroup ]
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  } 

}
