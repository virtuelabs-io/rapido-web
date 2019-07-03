import { Component, OnInit } from '@angular/core';
import { CompanyDetails } from '../services/customer/company-details';
import { CompanyDetailsService } from '../services/customer/company-details.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  hide_plus_card: Boolean = true
  company_details_result: string
  company_detail_not_reg: Boolean = false
  companyItems: any
  /*companyItems = 
  {
    company_name: "",
    addr_1: "",
    addr_2: "",
    city: "",
    postcode: "",
    country: "",
    county:"",
    customer_id:""

  }*/
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
      console.log("company details fetched !")
      console.log(data)
      this.companyItems = data
     /* this.companyItems.addr_1 = data.addr_1
      this.companyItems.addr_2 = data.addr_2
      this.companyItems.city = data.city
      this.companyItems.company_name = data.company_name
      this.companyItems.country = data.country
      this.companyItems.county = data.county
      this.companyItems.customer_id = data.customer_id
      this.companyItems.postcode = data.postcode*/
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
    this._companyDetailsService.deleteCompanyDetails()
    .subscribe(data => {
      this.getCompanyDetails()
      console.log(data)
      this.company_details_result = "Sucessfully deleted customer company details and logged!";
    })
  }

}