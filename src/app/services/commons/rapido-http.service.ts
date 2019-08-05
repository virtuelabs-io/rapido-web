import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Constants } from 'src/app/utils/constants';
import { ProfileService } from '../authentication/profile/profile.service';
import { LoginStateService } from 'src/app/shared-services/login-state/login-state.service';

@Injectable({
  providedIn: 'root'
})
export class RapidoHttpService<T> {

  constructor(protected _http: HttpClient, 
    protected _profileService: ProfileService,
    protected _loginStateService: LoginStateService) { }

  getList(_url: string, _headers?: HttpHeaders): Observable<T[]>{
    this._loginStateService.loaderEnable()

    return this._http.get<T[]>(_url, {
      headers: _headers
    }).pipe(
      retry(Constants.RETRY_TIMES),
      tap( _ => this._loginStateService.loaderDisable()),
      catchError(err => {
        console.log('Error in processing request...', err);
        this._loginStateService.loaderDisable()
        return throwError(err);
      })
    );
  }

  get(_url: string, _headers?: HttpHeaders): Observable<T>{
    this._loginStateService.loaderEnable()

    return this._http.get<T>(_url, {
      headers: _headers
    }).pipe(
      retry(Constants.RETRY_TIMES),
      tap( _ => this._loginStateService.loaderDisable()),
      catchError(err => {
        console.log('Error in processing request...', err);
        this._loginStateService.loaderDisable()
        return throwError(err);
      })
    );
  }

  post(_url: string, _item: T, _headers?: HttpHeaders): Observable<any>{
    this._loginStateService.loaderEnable()

    return this._http.post<any>(_url, _item, {
      headers: _headers
    }).pipe(
      tap( _ => this._loginStateService.loaderDisable()),
      catchError(err => {
        console.log('Error in processing request...', err);
        this._loginStateService.loaderDisable()
        return throwError(err);
      })
    );
  }

  postList(_url: string, _item: Array<T>, _headers?: HttpHeaders): Observable<any>{
    this._loginStateService.loaderEnable()

    return this._http.post<any>(_url, _item, {
      headers: _headers
    }).pipe(
      tap( _ => this._loginStateService.loaderDisable()),
      catchError(err => {
        console.log('Error in processing request...', err);
        this._loginStateService.loaderDisable()
        return throwError(err);
      })
    );
  }

  delete(_url: string, _headers?: HttpHeaders): Observable<{}>{
    this._loginStateService.loaderEnable()

    return this._http.delete<{}>(_url,{
      headers: _headers
    }).pipe(
      tap( _ => this._loginStateService.loaderDisable()),
      catchError(err => {
        console.log('Error in processing request...', err);
        this._loginStateService.loaderDisable()
        return throwError(err);
      })
    );
  }

  put(_url: string, _item: T, _headers?: HttpHeaders): Observable<any>{
    this._loginStateService.loaderEnable()

    return this._http.put<any>(_url, _item, {
      headers: _headers
    }).pipe(
      tap( _ => this._loginStateService.loaderDisable()),
      catchError(err => {
        console.log('Error in processing request...', err);
        this._loginStateService.loaderDisable()
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
