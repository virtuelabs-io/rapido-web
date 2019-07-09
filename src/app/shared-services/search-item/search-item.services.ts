 import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Query } from '../../services/products/query.interface';


@Injectable({
  providedIn: 'root'
})
export class SearchItemService {

  _query: Query = { q: '',
    size: 15,
    cursor: null,
    return: null,
    start: null,
    sort: null
  }
  private responsePoductList = new BehaviorSubject<object>({});
  private searchItemText = new BehaviorSubject<Query>(this._query);
  currentState = this.searchItemText.asObservable();
  responsePoductListState = this.responsePoductList.asObservable();

  constructor() {}

  changeState(state: any) {
    console.log({...this.searchItemText.value, ...state})
    // this._query = {
    //   q: state.q || this.searchItemText.value.q,
    //   size: state.size || 10,
    //   cursor: state.size || null, // always use either cursor or start, but not both
    //   start: state.start || null, // always use either cursor or start, but not both
    //   sort: state.sort || null
    // }
    this.searchItemText.next({...this.searchItemText.value, ...state})
  }

  changeResponsePoductListState(respData) {
    this.responsePoductList.next(respData)
  }

}
