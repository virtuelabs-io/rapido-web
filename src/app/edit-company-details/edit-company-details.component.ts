import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-company-details',
  templateUrl: './edit-company-details.component.html',
  styleUrls: ['./edit-company-details.component.scss']
})
export class EditCompanyDetailsComponent implements OnInit {
  showSpinner: Boolean = false
  addressFormGroup: FormGroup // UI reactive Form Group variable
  constructor() { }

  ngOnInit() {
    this.addressFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      add1: new FormControl('', [Validators.required]),
      add2: new FormControl('', [Validators.required]),
      town_city: new FormControl('', [Validators.required]),
      postCode: new FormControl('', [Validators.required]),
      county: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    })
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
	}
}
