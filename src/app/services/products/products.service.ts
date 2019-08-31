import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Constants } from '../../utils/constants';
import { Query } from './query.interface';
import { LoginStateService } from 'src/app/shared-services/login-state/login-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient,
    private loginStateService: LoginStateService) { }

  buildQuery(_query: Query): string {
    let queryKeys: string[] = [];
    for(let key in _query){
      if(_query[key] != null){
        if(key != 'searchedText' || key != 'searchedText'){
          queryKeys.push(key.replace("qdot", "q.") + "=" + String(_query[key]))
        }
      }
    }
    return queryKeys.join("&")
  }

  get(_query: Query): Observable<any> {
    let url = Constants.environment.productSearchEndPoint + this.buildQuery(_query)
    this.loginStateService.loaderEnable()
    return this._http.get<any>(url)
    .pipe(
      retry(Constants.RETRY_TIMES),
      tap( _ => this.loginStateService.loaderDisable()),
      catchError(err => {
        console.log('Error in processing request...', err);
        this.loginStateService.loaderDisable()
        return throwError(err);
      })
    );
  }
  
  getFromParams(_query): Observable<any> {
    let url = Constants.environment.productSearchEndPoint + (_query)
    this.loginStateService.loaderEnable()
    return this._http.get<any>(url)
    .pipe(
      retry(Constants.RETRY_TIMES),
      tap( _ => this.loginStateService.loaderDisable()),
      catchError(err => {
        console.log('Error in processing request...', err);
        this.loginStateService.loaderDisable()
        return throwError(err);
      })
    );
  }
}
