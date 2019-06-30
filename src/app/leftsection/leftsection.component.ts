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
  fnPriceQuoteHandler: Function;
  
  ngOnInit() {
    this.fnPriceQuoteHandler= 
              obj => this.priceQuoteHandler(obj);
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
                          'panelData':["1","2","3","4","5"]
                       },
                        {
                          'panelTitle':'price',
                          'panelType':'priceslider',
                          'panelData':{'callbackFunction':this.fnPriceQuoteHandler,
                                        'maxValue':500
                                        }
                       }]
                      }
         ]
  }
  priceQuoteHandler(e){
    console.log(e)
  }

}
