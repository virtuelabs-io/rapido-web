import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { SearchItemService } from '../../shared-services/search-item/search-item.services';
import { ProductsHierarchyService } from '../../services/products/products-hierarchy.service';
import { ProductsService } from '../../services/products/products.service';
import { Router } from '@angular/router';
import { Query } from 'src/app/services/products/query.interface'
import { Common } from 'src/app/utils/common'

 @Component({
  selector: 'app-leftsection',
  templateUrl: './leftsection.component.html',
  styleUrls: ['./leftsection.component.scss']
 })
 export class LeftSectionComponent implements OnInit, OnDestroy  {
 
  @Input() closeDialog: any
  filterData: any
  prevQuery: Query
  selections: Object
  private _productsHierarchyService: ProductsHierarchyService
  private _productsService: ProductsService
  fnPriceFilterHandler: Function;
  tags = []
  category: string = ""
  categories: any
  subcategories: any
  fieldsQuery: any
  searchedText: string = ""
  _searchItemServicecurrentState: any
  _searchItemServiceResponsePoductListState: any
  releatedSearch : any
 
  constructor(private _searchItemService: SearchItemService, 
    productsService: ProductsService,
    public router: Router,
    productsHierarchyService: ProductsHierarchyService) {
    this._productsHierarchyService = productsHierarchyService
    this._productsService = productsService
  }

  ngOnInit() {
    this.fieldsQuery = {
      price: {
        q: null,
        text: null
      },
      rating: {
        q: null,
        text: null
      }
    }
    let localFieldsQuery = localStorage.getItem('fieldsQuery')
    let localSearchedText = localStorage.getItem('searchedText')
    if(localFieldsQuery && localFieldsQuery !== '[object Object]'){
      this.fieldsQuery =  JSON.parse(localFieldsQuery);
    }
    if(localSearchedText){
      this.searchedText =  localSearchedText;
    }
    this._searchItemServiceResponsePoductListState =  this._searchItemService.responsePoductListState.subscribe(respData => {
      this.updateProductControls(respData)
    })
    
    this._searchItemServicecurrentState = this._searchItemService.currentState.subscribe(query => {
      if (query.searchedText) {
        this.searchedText = query.searchedText
        this.releatedSearch = query.releatedSearch
        if(query.fieldsQuery && typeof query.fieldsQuery === 'string'){
          this.fieldsQuery = JSON.parse(query.fieldsQuery)
        }else {
          this.fieldsQuery = query.fieldsQuery
        }
        this.prevQuery = query
      }
    })
  }
  
  updateProductControls(respData) {
    try{
    let { hits } = respData
    if (hits && hits.hit) {
      this.tags = hits.hit[0].fields.tags
      this.category = hits.hit[0].fields.category
        this._productsHierarchyService.get()
        .subscribe(data => {
          this.categories = data
          this.subcategories = this.categories[this.category]
        })
      
      this.fnPriceFilterHandler = obj => this.priceFilterData(obj);
      this.filterData = [
      {
          'headerText': 'Filter by',
          'expanded': 'true',
          'panel': [{
              'panelTitle': 'Rating',
              'panelType': 'rating',
              'panelData': ["4", "3", "2", "1"]
            },
            {
              'panelTitle': 'Price',
              'panelType': 'priceslider',
              'panelData': {
                'fnPriceFilterHandler': this.fnPriceFilterHandler,
                'maxValue': 500000, //dynamic
                'minValue': 0 //dynamic
              }
            }
          ]
        },
        {
          'headerText': '',
          'expanded': 'false',
          'panel': [{
            'panelTitle': 'Sort by',
            'panelType': 'sort',
            'panelData': [{
                desc: 'Price: Low to High',
                key: 'price asc'
              },
              {
                desc: 'Price: High to Low',
                key: 'price desc'
              },
              {
                desc: 'Rating: Low to High',
                key: 'rating asc'
              },
              {
                desc: 'Rating: High to Low',
                key: 'rating desc'
              }
            ]
          }]
        },
        {
          'headerText': 'Related searches',
          'expanded': 'false',
          'panel': [{
            'panelTitle': this.searchedText || '',
            'panelType': 'link',
            'panelData': this.tags
          }]
        }
      ]
    }
  }
  catch(e){
    console.log('something went wrong')
  }
  }
  
  priceFilterData(range) {
    let query = `(and '${this.searchedText + (this.releatedSearch ? ' '+ this.releatedSearch : '')}' (range field=price [${range.min}, ${range.max}]))`
    if (this.fieldsQuery.rating.q) {
      query = `(and '${this.searchedText}' (and (range field=rating [${this.fieldsQuery.rating.q},${Number(5)}]) (range field=price [${range.min},${range.max}])))`
    }
    this.fieldsQuery.price.q = `[${range.min},${range.max}]`
    this.fieldsQuery.price.text = ` $${range.min} - $${range.max}`
    this.updateFilterConditions({
      q: query,
      searchedText: this.searchedText,
      qdotparser: 'structured',
      parser: null,
      size:15,
      start:0,
      price:`[${range.min}, ${range.max}]`,
      rating:this.fieldsQuery.rating.q || ''
    })
  }
  
  onPressRating(val) {
    let query = `(and '${this.searchedText + (this.releatedSearch ? ' '+this.releatedSearch : '')}' (range field=rating [${val},${Number(5)}]))`
    if (this.fieldsQuery.price.q) {
      query = `(and '${this.searchedText}' (and (range field=rating [${val},${Number(5)}]) (range field=price ${this.fieldsQuery.price.q})))`
    }
    this.fieldsQuery.rating.q = val
    this.fieldsQuery.rating.text = ` ${val} +`
    this.updateFilterConditions({
      q: query,
      searchedText: this.searchedText,
      qdotparser: 'structured',
      parser: null,
      rating:val,
      price: this.fieldsQuery.price.q || ''
    })
  }
  
  onPressSort(data) {
    this.updateFilterConditions({
      sort: data
    })
  }
  
  onPressItem(data, subCategory) {
    if(subCategory){
      let prevSearchText = this.releatedSearch ? this.category + ' ' + this.releatedSearch : this.searchedText
      data = this.prevQuery.q.replace(prevSearchText, (this.category + ' ' + subCategory))
      this.releatedSearch = subCategory
    }else{
      data = this.searchedText
    }
    this.updateFilterConditions({
      q: data,
      sort: null,
      cursor: null,
      return: null,
      qdotparser: null,
      releatedSearch: this.releatedSearch,
      rating: this.fieldsQuery.rating.q,
      price: this.fieldsQuery.price.q
    })
  }
  
  updateFilterConditions(queryObj) {
    if (this.searchedText) {
      queryObj.fieldsQuery = this.fieldsQuery
      let qObject = {...this.prevQuery, ...queryObj}
      let urlParams = Common.setUrlParams(qObject)
      this.router.navigate(['/products'], { queryParams: urlParams })
      if (this.closeDialog) {
        localStorage.setItem('fieldsQuery', JSON.stringify(this.fieldsQuery));
         localStorage.setItem('searchedText', this.searchedText);
        this.closeDialog.close()
      }
    }
  }
  
  removeRating() {
    this.fieldsQuery.rating.q = null
    if(this.fieldsQuery && this.fieldsQuery.price){
      if (!this.fieldsQuery.price.q) {
          let qSearch = this.searchedText
          if(this.releatedSearch){
            qSearch = this.category +' '+  this.releatedSearch
          }
          this.onPressItem(qSearch, null)
      } else {
          let priceRange = this.fieldsQuery.price.q
          if(typeof this.fieldsQuery.price.q === 'string'){
            priceRange = JSON.parse(this.fieldsQuery.price.q)
          }
          if (priceRange){
            this.priceFilterData({
              min: priceRange[0],
              max: priceRange[1]
            })
          }
      }
    }
  }
  
  removePrice() {
    this.fieldsQuery.price.q = null
    if(this.fieldsQuery && this.fieldsQuery.price){
    if (!this.fieldsQuery.rating.q) {
      let qSearch = this.searchedText
      if(this.releatedSearch){
        qSearch = this.category +' '+  this.releatedSearch
      }
      this.onPressItem(qSearch, null)
    } else {
      this.onPressRating(this.fieldsQuery.rating.q)
    }
  }
  }
  
  removeReleatedSearch() {
    this.releatedSearch = null
    this.onPressItem(this.searchedText, null)
    // this.onPressItem(this.searchedText + ' ' + this.releatedSearch, null)
  }

  ngOnDestroy() {
    this._searchItemServicecurrentState.unsubscribe();
    this._searchItemServiceResponsePoductListState.unsubscribe();
  }
  
  }