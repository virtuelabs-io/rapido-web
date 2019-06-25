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
                           'panelType':'Link',
                           'panelData':[]
                        }]
                      },
                      {
                        'headerText':'filter by',
                         'panel':[ 
                           {
                          'panelTitle':'average rating',
                          'panelType':'rating',
                          'panelData':['1','2','3','4','5']
                       },
                        {
                          'panelTitle':'price',
                          'panelType':'price',
                          'panelData':['range1','range2']
                       }]
                      }
         ]
  }

}
