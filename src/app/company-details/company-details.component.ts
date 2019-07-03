import { Component, OnInit } from '@angular/core';
import { CompanyDetails } from '../services/customer/company-details';
import { CompanyDetailsService } from '../services/customer/company-details.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  showSpinner: Boolean = false
  hide_plus_card: Boolean = true
  company_details_result: string
  company_detail_not_reg: Boolean = false
  companyItems: any
  private _companyDetailsService: CompanyDetailsService
  constructor(
    companyDetailsService: CompanyDetailsService
  ) { 
    this._companyDetailsService = companyDetailsService
    this.getCompanyDetails()
  }

  ngOnInit() {
    this.getCompanyDetails()
  }

  getCompanyDetails() {
    this._companyDetailsService.getCompanyDetails()
    .subscribe(data => {
      this.showSpinner = false
      console.log("company details fetched !")
      console.log(data)
      this.companyItems = data
      if(!data) {
        this.hide_plus_card = true
        this.company_detail_not_reg = false
      }
      else {
        this.hide_plus_card = false
        this.company_detail_not_reg = true
      }
    })
  }

  deleteCompanyDetails() {
    this.showSpinner = true
    this._companyDetailsService.deleteCompanyDetails()
    .subscribe(data => {
      this.getCompanyDetails()
      console.log(data)
      this.company_details_result = "Sucessfully deleted customer company details and logged!";
    })
  }

}