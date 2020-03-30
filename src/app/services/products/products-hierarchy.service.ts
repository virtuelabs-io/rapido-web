import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'
import { Constants } from '../../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class ProductsHierarchyService {
  constructor(private _http: HttpClient) {}

  get(): Observable<any> {
    let url = Constants.environment.staticAssets + Constants.PRODUCT_HIERARCHY
    return this._http.get<any>(url).pipe(
      retry(Constants.RETRY_TIMES),
      catchError((err) => {
        return throwError(err)
      })
    )
  }
}
