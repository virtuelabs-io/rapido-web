 import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Query } from '../../services/products/query.interface';


@Injectable({
  providedIn: 'root'
})
export class SearchItemService {

  _query: Query = {
    q: '',
    searchedText: '',
    size: 15,
    cursor: null,
    return: null,
    start: null,
    sort: null,
    parser:'structured'
  }
  private responsePoductList = new BehaviorSubject<object>({hits:{}});
  private searchItemText = new BehaviorSubject<Query>(this._query);
  currentState = this.searchItemText.asObservable();
  responsePoductListState = this.responsePoductList.asObservable();

  constructor() {}

  changeState(state: any) {
    this.searchItemText.next({...this.searchItemText.value, ...state})
  }

  changeRespProdListState(respData) {
    this.responsePoductList.next(respData)
  }

}
