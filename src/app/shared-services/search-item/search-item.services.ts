import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Query } from "../../services/products/query.interface";

@Injectable({
  providedIn: "root",
})
export class SearchItemService {
  _query: Query = {
    q: "",
    searchedText: "",
    releatedSearch: "",
    fieldsQuery: "",
    size: 15,
    cursor: null,
    return: null,
    start: null,
    sort: null,
    parser: "structured",
    rating: null,
    price: null,
  };

  _responseData = {
    status: {
      rid: "",
      "time-ms": 0,
    },
    hits: {
      found: 0,
      start: 0,
      hit: [
        {
          id: null,
          fields: {
            points: [],
            details: [],
            images: [],
            rating: "0",
          },
        },
      ],
    },
  };
  private searchItemText = new BehaviorSubject<Query>(this._query);
  currentState = this.searchItemText.asObservable();

  private responsePoductList = new BehaviorSubject(this._responseData);
  responsePoductListState = this.responsePoductList.asObservable();

  constructor() {}

  changeState(state: any) {
    if (JSON.stringify(this.searchItemText.value) !== JSON.stringify(state))
      this.searchItemText.next({ ...this.searchItemText.value, ...state });
  }

  changeRespProdListState(respData) {
    this.responsePoductList.next(respData);
  }
}
