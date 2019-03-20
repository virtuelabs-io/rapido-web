import { Component, OnInit, NgModule} from '@angular/core';
import { MatStepperModule } from '@angular/material';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@NgModule({
  imports: [ MatStepperModule, FormBuilder, Validators, FormGroup ]
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