import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { SearchItemService } from '../../shared-services/search-item/search-item.services';
import { ProductsHierarchyService } from '../../services/products/products-hierarchy.service';
import { ProductsService } from '../../services/products/products.service';
import { Router } from '@angular/router';

 @Component({
  selector: 'app-leftsection',
  templateUrl: './leftsection.component.html',
  styleUrls: ['./leftsection.component.scss']
 })
 export class LeftSectionComponent implements OnInit, OnDestroy  {
 
  @Input() closeDialog: any
  filterData: any
  prevQuery: Object
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
        this.prevQuery = query
      }
    })
  }
  
  updateProductControls(respData) {
    let {
      hits
    } = respData
    if (hits && hits.hit) {
      this.tags = hits.hit[0].fields.tags
      this.category = hits.hit[0].fields.category
      // if(this.subcategories){
        this._productsHierarchyService.get()
        .subscribe(data => {
          this.categories = data
          this.subcategories = this.categories[this.category]
        })
      // }
      
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
      start:0
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
      size:15,
      start:0
    })
  }
  
  onPressSort(data) {
    this.updateFilterConditions({
      sort: data
    })
  }
  
  onPressItem(data, subCategory) {
    if(subCategory){
      data = data + ' ' + subCategory 
      this.releatedSearch = subCategory
    }
    this.updateFilterConditions({
      q: data,
      sort: null,
      cursor: null,
      return: null,
      qdotparser: null
    })
  }
  
  updateFilterConditions(queryObj) {
    if (this.searchedText) {
      let queryParams = this._productsService.buildQuery({...this.prevQuery, ...queryObj})
      this.router.navigate(['/products'], { queryParams: { search: decodeURIComponent(queryParams) } })
      if (this.closeDialog) {
        localStorage.setItem('fieldsQuery', JSON.stringify(this.fieldsQuery));
         localStorage.setItem('searchedText', this.searchedText);
        this.closeDialog.close()
      }
    }
  }
  
  removeRating() {
    this.fieldsQuery.rating.q = null
    if (!this.fieldsQuery.price.q && !this.fieldsQuery.rating.q) {
      this.onPressItem(this.searchedText, null)
    } else {
      let priceRange = JSON.parse(this.fieldsQuery.price.q)
      if (priceRange)
        this.priceFilterData({
          min: priceRange[0],
          max: priceRange[1]
        })
    }
  }
  
  removePrice() {
    this.fieldsQuery.price.q = null
    if (!this.fieldsQuery.price.q && !this.fieldsQuery.rating.q) {
      this.onPressItem(this.searchedText, null)
    } else {
      this.onPressRating(this.fieldsQuery.rating.q)
    }
  }
  
  removeReleatedSearch() {
    this.releatedSearch = null
    this.onPressItem(this.searchedText, null)
  }

  ngOnDestroy() {
    this._searchItemServicecurrentState.unsubscribe();
    this._searchItemServiceResponsePoductListState.unsubscribe();
  }
  
  }