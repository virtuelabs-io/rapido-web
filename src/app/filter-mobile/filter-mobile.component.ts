import { Component, OnInit } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';

@Component({
  selector: 'app-filter-mobile',
  templateUrl: './filter-mobile.component.html',
  styleUrls: ['./filter-mobile.component.scss']
})
export class FilterMobileComponent implements OnInit {

  
  filterData: Object 
  constructor(private _searchItemService: SearchItemService ) { }
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
                            'minValue':0
                          }
                       }]
                      }
         ]
  }
  priceFilterData(range){
    console.log(range.min,range.max)
  }
  onPressRating(value){
    
    this.changeQuery({q:'watches',sort:'desc'})
  }
  onPressItem(eve){
    console.log(eve)
  }
  changeQuery(queryObj){
      this._searchItemService.changeState(queryObj)
  }





}
