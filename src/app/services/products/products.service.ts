import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, retry, tap } from 'rxjs/operators'
import { Constants } from '../../utils/constants'
import { Query } from './query.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  private buildQuery(_query: Query): string {
    let queryKeys: string[] = []
    for (let key in _query) {
      if (_query[key] != null) {
        if (key != 'searchedText') {
          if (key != 'fieldsQuery') {
            if (key != 'rating') {
              if (key != 'price') {
                if (key != 'releatedSearch') {
                  queryKeys.push(
                    key.replace('qdot', 'q.') + '=' + String(_query[key])
                  )
                }
              }
            }
          }
        }
      }
    }
    return queryKeys.join('&')
  }

  get(_query: Query): Observable<any> {
    let url =
      Constants.environment.productSearchEndPoint + this.buildQuery(_query)
    return this._http.get<any>(url).pipe(
      retry(Constants.RETRY_TIMES),
      catchError(err => {
        console.log('Error in processing request...', err)
        return throwError(err)
      })
    )
  }
}
