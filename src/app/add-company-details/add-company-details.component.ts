import { Component, OnInit } from '@angular/core';
import { CompanyDetails } from '../services/customer/company-details';
import { CompanyDetailsService } from '../services/customer/company-details.service';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company-details',
  templateUrl: './add-company-details.component.html',
  styleUrls: ['./add-company-details.component.scss']
})
export class AddCompanyDetailsComponent implements OnInit {
  company_details_result: string
  showSpinner: Boolean = false
  addressFormGroup: FormGroup // UI reactive Form Group variable
  companyDetails: CompanyDetails
  private _companyDetailsService: CompanyDetailsService
  constructor(
    private router: Router,
    companyDetailsService: CompanyDetailsService
  ) { 
    this._companyDetailsService = companyDetailsService
  }

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
  postCompanyDetails(formData) {
    this.showSpinner = true
    this.companyDetails = new CompanyDetails(
      formData.name,
      formData.add1,
      formData.town_city,
      formData.county,
      formData.country,
      formData.postCode,
      formData.add2,
      ""
    )
    console.log(this.companyDetails)
    this._companyDetailsService.postCompanyDetails(this.companyDetails)
    .subscribe(data => {
      this.router.navigate(['profile/companyDetails']);
      this.company_details_result = "Sucessfully posted customer company details and logged!";
    })
  }

  cancelAddAddress() {
    this.router.navigate(['profile/companyDetails']);
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
	}
}
