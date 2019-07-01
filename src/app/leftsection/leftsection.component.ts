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
  fnPriceFilterHandler: Function;
  
  ngOnInit() {
    this.fnPriceFilterHandler= 
              obj => this.priceFilterData(obj);
    this.filterData = [
                      {
                        'headerText':'show result for',
                         'panel':[ {
                           'panelTitle':'watches',
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
                          'panelData':["4","3","2","1"]
                       },
                        {
                          'panelTitle':'price',
                          'panelType':'priceslider',
                          'panelData':{
                            'fnPriceFilterHandler':this.fnPriceFilterHandler,
                            'maxValue':500,
                            'minValue':500
                          }
                       }]
                      }
         ]
  }
  priceFilterData(range){
    console.log(range.min,range.max)
  }
  onPressRating(value){
    console.log(value)
  }
  onPressItem(eve){
    console.log(eve)
  }

}
