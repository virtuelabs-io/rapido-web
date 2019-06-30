import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Constants } from 'src/app/utils/constants';
import { ProfileService } from '../authentication/profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class RapidoHttpService<T> {

  constructor(protected _http: HttpClient, protected _profileService: ProfileService) { }

  getList(_url: string, _headers?: HttpHeaders): Observable<T[]>{
    return this._http.get<T[]>(_url, {
      headers: _headers
    }).pipe(
      retry(Constants.RETRY_TIMES),
      catchError(err => {
        console.log('Error in processing request...', err);
        return throwError(err);
      })
    );
  }

  get(_url: string, _headers?: HttpHeaders): Observable<T>{
    return this._http.get<T>(_url, {
      headers: _headers
    }).pipe(
      retry(Constants.RETRY_TIMES),
      catchError(err => {
        console.log('Error in processing request...', err);
        return throwError(err);
      })
    );
  }

  post(_url: string, _item: T, _headers?: HttpHeaders): Observable<any>{
    return this._http.post<any>(_url, _item, {
      headers: _headers
    }).pipe(
      catchError(err => {
        console.log('Error in processing request...', err);
        return throwError(err);
      })
    );
  }

  delete(_url: string, _headers?: HttpHeaders): Observable<{}>{
    return this._http.delete<{}>(_url,{
      headers: _headers
    }).pipe(
      catchError(err => {
        console.log('Error in processing request...', err);
        return throwError(err);
      })
    );
  }

  put(_url: string, _item: T, _headers?: HttpHeaders): Observable<any>{
    return this._http.put<any>(_url, _item, {
      headers: _headers
    }).pipe(
      catchError(err => {
        console.log('Error in processing request...', err);
        return throwError(err);
      })
    );
  }

  initializeHeaders(): HttpHeaders{
    return new HttpHeaders().append('Content-Type', 'application/json');
  }

  addAuthHeader(_headers: HttpHeaders): HttpHeaders{
    if(this._profileService.cognitoUser) {
      return _headers.append('Authorization', this._profileService.cognitoUser.getSignInUserSession().getIdToken().getJwtToken())
    } else {
      return _headers.append('Authorization', '')
    }
  }
}
