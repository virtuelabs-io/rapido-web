import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyDetails } from '../services/customer/company-details';
import { CompanyDetailsService } from '../services/customer/company-details.service';

@Component({
  selector: 'app-edit-company-details',
  templateUrl: './edit-company-details.component.html',
  styleUrls: ['./edit-company-details.component.scss']
})
export class EditCompanyDetailsComponent implements OnInit {
  showSpinner: Boolean = false
  _customerId: string = ""
  addressFormGroup: FormGroup // UI reactive Form Group variable
  private _companyDetailsService: CompanyDetailsService
  constructor(
    companyDetailsService: CompanyDetailsService
  ) { 
    this._companyDetailsService = companyDetailsService
  }

  ngOnInit() {
    this.showSpinner = true
    this.addressFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      add1: new FormControl('', [Validators.required]),
      add2: new FormControl('', [Validators.required]),
      town_city: new FormControl('', [Validators.required]),
      postCode: new FormControl('', [Validators.required]),
      county: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    })
    this._companyDetailsService.getCompanyDetails()
    .subscribe(data => {
      console.log(data)
     // this.company_details_result = "Sucessfully fetched customer company details and logged!";
      this.addressFormGroup.controls["name"].setValue(data.company_name)
      this.addressFormGroup.controls["add1"].setValue(data.addr_1)
      this.addressFormGroup.controls["add2"].setValue(data.addr_2)
      this.addressFormGroup.controls["town_city"].setValue(data.city)
      this.addressFormGroup.controls["postCode"].setValue(data.postcode)
      this.addressFormGroup.controls["country"].setValue(data.country)
      this.addressFormGroup.controls["county"].setValue(data.county)
      this._customerId = data.customer_id
      this.showSpinner = false
    })
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
	}
}
