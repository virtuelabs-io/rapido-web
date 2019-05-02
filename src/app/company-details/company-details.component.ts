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
  companyItems = 
  {
    organisation: "",
    add1: "",
    add2: "",
    town_city: "",
    postcode: "",
    country: "",
    customer_id:""

  }
  private _companyDetailsService: CompanyDetailsService
  constructor(
    companyDetailsService: CompanyDetailsService
  ) { 
    this._companyDetailsService = companyDetailsService
  }

  ngOnInit() {
    this._companyDetailsService.getCompanyDetails()
    .subscribe(data => {
      console.log("company details fetched !")
      console.log(data)
      this.companyItems.add1 = data.addr_1
      this.companyItems.add2 = data.addr_2
      this.companyItems.town_city = data.city
      this.companyItems.organisation = data.company_name
      this.companyItems.country = data.country
      //this.companyItems.add1 = data.county
      this.companyItems.customer_id = data.customer_id
      this.companyItems.postcode = data.postcode
      this.hide_plus_card = false
    })
  }

}
