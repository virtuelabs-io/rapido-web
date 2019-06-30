import { Component, OnInit } from '@angular/core';
// import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-leftsection',
  templateUrl: './leftsection.component.html',
  styleUrls: ['./leftsection.component.scss']
})
export class LeftSectionComponent implements OnInit {

  filterData: Object 
  constructor() { }

  ngOnInit() {
    this.filterData = [
                      {
                        'headerText':'show result for',
                         'panel':[ {
                           'panelTitle':'painting',
                           'panelType':'link',
                           'panelData':['Sand','Tools']
                        }]
                      },
                      {
                        'headerText':'filter by',
                         'panel':[ 
                           {
                          'panelTitle':'rating',
                          'panelType':'rating',
                          'panelData':[]
                       },
                        {
                          'panelTitle':'price',
                          'panelType':'priceslider',
                          'panelData':[]
                       }]
                      }
         ]
  }

}
