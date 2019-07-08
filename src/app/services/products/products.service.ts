import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Constants } from '../../utils/constants';
import { Query } from './query.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  private buildQuery(_query: Query): string {
    let queryKeys: string[] = [];
    for(let key in _query){
      if(_query[key] != null ){
        queryKeys.push(key+"="+String(_query[key]))
      }
    }
    // queryKeys[0] = `q=(field=name 'watches')`
    return queryKeys.join("&")
  }

  get(_query: Query): Observable<any> {
    let url = Constants.environment.productSearchEndPoint + this.buildQuery(_query)
    return this._http.get<any>(url).pipe(
      retry(Constants.RETRY_TIMES),
      catchError(err => {
        console.log('Error in processing request...', err);
        return throwError(err);
      })
    );
  }
}
