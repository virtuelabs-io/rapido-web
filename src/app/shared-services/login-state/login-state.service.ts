import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  private userSignedIn = new BehaviorSubject<Boolean>(false);
  private isLoading = new BehaviorSubject<Boolean>(false);
  currentState = this.userSignedIn.asObservable();
  cuurLoadingState = this.isLoading.asObservable();

  constructor() {}

  changeState(state: Boolean) {
    this.userSignedIn.next(state)
  }

  toggleLoadingState(loading: Boolean){
    this.isLoading.next(loading)
  }
}
