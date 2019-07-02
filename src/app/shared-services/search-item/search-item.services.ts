 import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Query } from '../../services/products/query.interface';


@Injectable({
  providedIn: 'root'
})
export class SearchItemService {

  _query: Query
  private searchItemText = new BehaviorSubject<Query>({
    q: '',
    size: 10,
    cursor: null,
    return: null,
    start: null,
    sort: null
  });
  currentState = this.searchItemText.asObservable();

  constructor() {}

  changeState(state: any) {
    this._query = {
      q: state.q || state,
      size: state.size || 10,
      cursor: state.size || null, // always use either cursor or start, but not both
      start: state.start || null, // always use either cursor or start, but not both
      sort: state.sort || null
    }
    this.searchItemText.next(this._query)
  }

}
