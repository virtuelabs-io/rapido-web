import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from '../../../../src/app/utils/common';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent implements OnInit {
  productCategories = []
  productObject = []
  disclaimerReq: Boolean
  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.productObject = [{
      'header': 'Access Panels',
      data: [
        {
        'title': 'Accoustic'
        },{
          'title': 'Airtight'
        }
      ]
    },{
      'header': 'Membranes',
      data: [
        {
        'title': 'Breather'
        },{
          'title': 'DPC'
        },{
          'title': 'DPM'
        }
      ]
    },{
      'header': 'Access Panels',
      data: [
        {
        'title': 'Accoustic'
        }
      ]
    }]
    this.disclaimerReq =  Constants.environment.name !== "PROD" ? true : false
    this.productCategories = [{
      'title':'Building Material',
      details: 
        [
          {
            'header': 'Access Panels',
            data: [
              {
              'title': 'Watches'
              },{
                'title': 'Airtight'
              },{
                'title': 'Budget'
              },{
                'title': 'Ceramic Tile'
              },{
                'title': 'Circular'
              },{
                'title': 'Fire Rated'
              },{
                'title': 'Plastic'
              },{
                'title': 'Plasterboard Door'
              },{
                'title': 'Accoustic'
              },{
                  'title': 'Airtight'
              },{
                  'title': 'Budget'
              },{
                  'title': 'Ceramic Tile'
              }
            ]
          },
          {
            'header': 'Membranes',
            data: [
              {
              'title': 'Breather'
              },{
                'title': 'DPC'
              },{
                'title': 'DPM'
              },{
                'title': 'Gas'
              },{
                'title': 'Geotextile'
                },{
                  'title': 'Polythelene'
                },{
                  'title': 'Tanking'
                },{
                  'title': 'Gas'
                },
            ]
          },{
            'header': 'Access Panels',
            data: [
              {
              'title': 'Accoustic'
              },{
                'title': 'Airtight'
              },{
                'title': 'Budget'
              },{
                'title': 'Ceramic Tile'
              },{
                'title': 'Circular'
              },{
                'title': 'Fire Rated'
              },{
                'title': 'Plastic'
              },{
                'title': 'Plasterboard Door'
              }
            ]
          },
          {
            'header': 'Membranes',
            data: [
              {
              'title': 'Breather'
              },{
                'title': 'DPC'
              },{
                'title': 'DPM'
              },{
                'title': 'Gas'
              },{
                'title': 'Geotextile'
                },{
                  'title': 'Polythelene'
                },{
                  'title': 'Tanking'
                },{
                  'title': 'Gas'
                }
            ]
          }
          
        ]
    },
    {
      'title':'Insulation',
      details: this.productObject
        
    },{
      'title':'Ceilings',
      details: this.productObject
    },{
      'title':'Roofing',
      details: this.productObject
    },{
      'title':'Commercials',
      details: this.productObject
    },{
      'title':'Paints',
      details: this.productObject
    },{
      'title':'Interiors',
      details: this.productObject
    }]
  }

  handleNavigation(searchedText) {
    let qObject = Common.searchProducts(searchedText)
    if(qObject){
      this.ngZone.run(() => this.router.navigate(['/products'], { queryParams: qObject })).then()
    }
  }
}
