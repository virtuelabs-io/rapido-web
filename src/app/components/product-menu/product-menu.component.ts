import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent implements OnInit {
  productCategories = []
  constructor() { }

  ngOnInit() {
    this.productCategories = [{
      'title':'Building Material',
      details: 
        [
          {
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
      details: 
        [
          {
            'header': 'Access Panels',
            data: [
              {
              'title': 'Accoustic'
              },{
                'title': 'Airtight'
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
              }
            ]
          },{
            'header': 'Access Panels',
            data: [
              {
              'title': 'Accoustic'
              }
            ]
          }
          
        ]
    },{
      'title':'Ceilings'
    },{
      'title':'Roofing'
    },{
      'title':'Commercials'
    },{
      'title':'Paints'
    },{
      'title':'Interiors'
    }]
  }

}
