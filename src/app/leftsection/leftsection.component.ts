import { Component, OnInit, Input } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';

@Component({
  selector: 'app-leftsection',
  templateUrl: './leftsection.component.html',
  styleUrls: ['./leftsection.component.scss']
})
export class LeftSectionComponent implements OnInit {

  // @Input() responseData:Object
  filterData: Object 
  constructor(private _searchItemService: SearchItemService ) { }
  fnPriceFilterHandler: Function;
  tags = []
  searchedText: string = ""

  ngOnInit() {
    // if(this.responseData)
    this._searchItemService.responsePoductListState.subscribe(respData => {
      this.updateProductControls(respData)
    })
    this._searchItemService.currentState.subscribe(query => {
      if (query.searchedText){
        this.searchedText = query.searchedText
      }})
  }

  updateProductControls(respData){
    let {hits} = respData
    if(hits){
    console.log(hits.hit)
    console.log(hits.hit[0].fields.tags)
    this.tags = hits.hit[0].fields.tags
  }
    this.fnPriceFilterHandler= obj => this.priceFilterData(obj);
    this.filterData = [
                      {
                        'headerText':'Show result for',
                         'panel':[ {
                           'panelTitle':this.searchedText,
                           'panelType':'link',
                           'panelData':this.tags
                        }]
                      },
                      {
                        'headerText':'Filter by',
                         'panel':[ 
                           {
                          'panelTitle':'Rating',
                          'panelType':'rating',
                          'panelData':["4","3","2","1"]
                       },
                        {
                          'panelTitle':'Price',
                          'panelType':'priceslider',
                          'panelData':{
                            'fnPriceFilterHandler':this.fnPriceFilterHandler,
                            'maxValue':500,//dynamic
                            'minValue':0//dynamic
                          }
                       },
                       {
                        'panelTitle':'Sort by',
                        'panelType':'sort',
                        'panelData':[
                          {desc:'Price: Low to High', key:'price asc'},
                          {desc:'Price: High to Low', key:'price desc'},
                          {desc:'Avg. Customer Review', key:'rating asc'},
                          {desc:'Newest Arrivals', key:'date asc'}
                        ]
                      }
                      ]}
                      /* {
                        'headertext':'sort by',
                         'panel':[ {
                           'paneltitle':'',
                           'paneltype':'link',
                           'paneldata':['price: low to high','price: high to low','avg. customer review','newest arrivals']
                        }]
                      } */
         ]
  }

  priceFilterData(range){
    // console.log(range.min,range.max)
    this.changeQuery({
        q:`(and ${this.searchedText} (range field=price [${range.min},${range.max}]))`,
        searchedText:this.searchedText
      })
  }

  onPressRating(val){
    this.changeQuery({
      q:`(and ${this.searchedText} (range field=rating [${val},${val+1}]))`
    })
  }

  onPressSort(data){
    this.changeQuery({sort:data})
  }

  onPressItem(data){
    this.changeQuery({
      q:data
    })
  }

  changeQuery(queryObj){
      this._searchItemService.changeState(queryObj)
  }

}
