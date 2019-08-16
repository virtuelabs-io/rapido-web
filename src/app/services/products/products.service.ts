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

  private buildQuery(_query: Query): string {
    let queryKeys: string[] = [];
    for(let key in _query){
      if(_query[key] != null){
        if(key != 'searchedText'){
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
  
  getSubcategory(){
    return {
      "Watches": [
          "Smart watch",
          "Analogue",
          "Digital",
          "Classic",
          "Contemporary & Design",
          "Fashion",
          "Swiss Made"
      ],
      "Phones": [
          "Apple",
          "Samsung",
          "Nokia",
          "Motorola",
          "Redme",
          "1+"
      ]
  }
    /* let url = Constants.environment.productList
    this.loginStateService.loaderEnable()
    return this._http.get<any>(url)
    .pipe(
      retry(Constants.RETRY_TIMES),
      tap( items => {
        console.log(items)
        this.loginStateService.loaderDisable()
      }),
      catchError(err => {
        console.log('Error in processing request...', err);
        this.loginStateService.loaderDisable()
        return throwError(err);
      })
    ); */
  }
}
