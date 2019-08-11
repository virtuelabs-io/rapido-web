import { Component, OnInit, Input } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';

@Component({
  selector: 'app-leftsection',
  templateUrl: './leftsection.component.html',
  styleUrls: ['./leftsection.component.scss']
})
export class LeftSectionComponent implements OnInit {

  @Input() closeDialog:any
  filterData: Object 
  prevQuery: Object 
  selections: Object 
  constructor(private _searchItemService: SearchItemService ) { }
  fnPriceFilterHandler: Function;
  tags = []
  fieldsQuery: any
  searchedText: string = ""

  ngOnInit() {
    this._searchItemService.responsePoductListState.subscribe(respData => {
      this.updateProductControls(respData)
    })
    this._searchItemService.currentState.subscribe(query => {
      if (query.searchedText){
        this.searchedText = query.searchedText
        this.prevQuery = query
      }
    })
    this.fieldsQuery = {
      price:{
        q:null,
        text:null
      },
      rating:{
        q:null,
        text:null
      }
    }
  }

  updateProductControls(respData){
    let {hits} = respData
    if(hits && hits.hit ){
    this.tags = hits.hit[0].fields.tags
    this.fnPriceFilterHandler= obj => this.priceFilterData(obj);
    this.filterData = [
                      {
                        'headerText':'Filter by',
                        'expanded': 'true',
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
                          {desc:'Avg. Customer Review', key:'rating asc'}
                          // {desc:'Newest Arrivals', key:'date asc'}
                        ]
                      }
                      ]},
                      {
                        'headerText':'Show related types',
                        'expanded': 'false',
                         'panel':[ {
                           'panelTitle':this.searchedText || '',
                           'panelType':'link',
                           'panelData':this.tags
                        }]
                      },
         ]
        }
  }

  priceFilterData(range){
    let query = `(and '${this.searchedText}' (range field=price [${range.min}, ${range.max}]))`
    if(this.fieldsQuery.rating.q){
        query = `(and '${this.searchedText}' (and (range field=rating [${this.fieldsQuery.rating.q},${Number(5)}]) (range field=price [${range.min},${range.max}])))`
      }
      this.fieldsQuery.price.q = `[${range.min},${range.max}]`
      this.fieldsQuery.price.text = ` $${range.min} - ${range.max}`
      this.updateFilterConditions({
        q:query,
        searchedText:this.searchedText,
        qdotparser:'structured',
        parser:null
      })
  }

  onPressRating(val){
    let query = `(and '${this.searchedText}' (range field=rating [${val},${Number(5)}]))`
    if(this.fieldsQuery.price.q){
        query = `(and '${this.searchedText}' (and (range field=rating [${val},${Number(5)}]) (range field=price ${this.fieldsQuery.price.q})))`
      }
      this.fieldsQuery.rating.q = val
      this.fieldsQuery.rating.text = ` ${val} - ${Number(5)}`
      this.updateFilterConditions({
        q:query,
        searchedText:this.searchedText,
        qdotparser:'structured',
        parser:null
      })
  }

  onPressSort(data){
    this.updateFilterConditions({
      sort:data,
      qdotparser: null,
      q:this.searchedText
    })
  }

  onPressItem(data){
    this.updateFilterConditions({
      q:data
    })
  }

  updateFilterConditions(queryObj){
    if(this.searchedText){
      this._searchItemService.changeState(queryObj)
      if(this.closeDialog) {
        this.closeDialog.close()
      }
    }
  }

  removeRating(){
     this.fieldsQuery.rating.q = null
     let priceRange = JSON.parse(this.fieldsQuery.rating.q) 
     if(priceRange)
     this.priceFilterData({min:priceRange[0], max:priceRange[1]})
  }
  
  removePrice(){
    this.fieldsQuery.price.q = null
    this.onPressRating(this.fieldsQuery.rating.q)
  }

}
