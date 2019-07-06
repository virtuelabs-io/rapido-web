import { Component, OnInit } from '@angular/core';
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
  hide_plus_card: Boolean = true
  company_detail_not_reg: Boolean = false
  companyItems: any
  private _companyDetailsService: CompanyDetailsService
  constructor(
    private router: Router,
    companyDetailsService: CompanyDetailsService
  ) { 
    this._companyDetailsService = companyDetailsService
    this.getCompanyDetails()
  }

  ngOnInit() {
    this.showSpinner = true
    this.getCompanyDetails()
  }

  getCompanyDetails() {
    this._companyDetailsService.getCompanyDetails()
    .subscribe(data => {
      this.showSpinner = false
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
    this.hide_plus_card = true
    this._companyDetailsService.deleteCompanyDetails()
    .subscribe(data => {
      this.getCompanyDetails()
    })
  }

  addressEdit() {
    this.router.navigate(['profile/companyDetails/edit'])
  }

}