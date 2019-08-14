import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyDetails } from '../services/customer/company-details';
import { CompanyDetailsService } from '../services/customer/company-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  showSpinner: Boolean = false
  _customerId: string = ""
  editButtonShow: boolean = false
  companyDetails: CompanyDetails
  addressFormGroup: FormGroup // UI reactive Form Group variable
  private _companyDetailsService: CompanyDetailsService
  constructor(
    private router: Router,
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
    this.getCompanyDetails()
  }

  getCompanyDetails() {
    this._companyDetailsService.getCompanyDetails()
    .subscribe(data => {
      this.showSpinner = false
      if(data != null) {
        this.editButtonShow = true
        this.addressFormGroup.controls["name"].setValue(data.company_name)
        this.addressFormGroup.controls["add1"].setValue(data.addr_1)
        this.addressFormGroup.controls["add2"].setValue(data.addr_2)
        this.addressFormGroup.controls["town_city"].setValue(data.city)
        this.addressFormGroup.controls["postCode"].setValue(data.postcode)
        this.addressFormGroup.controls["country"].setValue(data.country)
        this.addressFormGroup.controls["county"].setValue(data.county)
        this._customerId = data.customer_id
      }
      else {
        this.editButtonShow = false
        this.addressFormGroup.controls["name"].setValue('')
        this.addressFormGroup.controls["add1"].setValue('')
        this.addressFormGroup.controls["add2"].setValue('')
        this.addressFormGroup.controls["town_city"].setValue('')
        this.addressFormGroup.controls["postCode"].setValue('')
        this.addressFormGroup.controls["country"].setValue('')
        this.addressFormGroup.controls["county"].setValue('')
      }
    })
  }

  putCompanyDetails() {
    this.showSpinner = true
    this.companyDetails = new CompanyDetails(  
      this.addressFormGroup.value.name,
      this.addressFormGroup.value.add1,
      this.addressFormGroup.value.town_city,
      this.addressFormGroup.value.county,
      this.addressFormGroup.value.country,
      this.addressFormGroup.value.postCode,
      this.addressFormGroup.value.add2
    )
    this._companyDetailsService.putCompanyDetails(this.companyDetails)
    .subscribe(data => {
      console.log(data)
      this.showSpinner = false
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
      formData.add2
    )
    this._companyDetailsService.postCompanyDetails(this.companyDetails)
    .subscribe(data => {
      this.showSpinner = false
      this.getCompanyDetails()
    //  this.router.navigate(['profile/companyDetails']);
    //  this.company_details_result = "Sucessfully posted customer company details and logged!";
    })
  }

  cancelAddAddress() {
    this.router.navigate(['profile/companyDetails']);
  }

  deleteCompanyDetails() {
    this.showSpinner = true
    this._companyDetailsService.deleteCompanyDetails()
    .subscribe(data => {
      this.getCompanyDetails()
    })
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
	}

}