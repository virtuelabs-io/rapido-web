import { Component, OnInit } from '@angular/core';
import { CompanyDetails } from '../services/customer/company-details';
import { CompanyDetailsService } from '../services/customer/company-details.service';

@Component({
  selector: 'app-add-company-details',
  templateUrl: './add-company-details.component.html',
  styleUrls: ['./add-company-details.component.scss']
})
export class AddCompanyDetailsComponent implements OnInit {
  company_details_result: string;
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
  companyDetails: CompanyDetails
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
      this.company_details_result = "Sucessfully fetched customer company details and logged!";
    })
  }
  postCompanyDetails(){
    this.companyDetails = new CompanyDetails(
      this.companyItems.organisation,
      this.companyItems.add1,
      this.companyItems.town_city,
      "",//county
      this.companyItems.country,
      this.companyItems.postcode,
      this.companyItems.add2,
      this.companyItems.customer_id
    )
    console.log(this.companyDetails)
    this._companyDetailsService.postCompanyDetails(this.companyDetails)
    .subscribe(data => {
      console.log(data)
      this.company_details_result = "Sucessfully posted customer company details and logged!";
    })
  }

}
