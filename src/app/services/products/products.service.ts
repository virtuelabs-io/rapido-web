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
    this.loginStateService.toggleLoadingState(true)
    return this._http.get<any>(url)
    .pipe(
      retry(Constants.RETRY_TIMES),
      tap( _ => this.loginStateService.toggleLoadingState(false)),
      catchError(err => {
        console.log('Error in processing request...', err);
        this.loginStateService.toggleLoadingState(false)
        return throwError(err);
      })
    );
  }
}
