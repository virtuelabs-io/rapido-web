import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  private userSignedIn = new BehaviorSubject<Boolean>(false);
  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoggedInState = this.userSignedIn.asObservable();
  loaderState = this.isLoading.asObservable();

  constructor() {}

  changeState(state: Boolean) {
    this.userSignedIn.next(state)
  }

  loaderEnable(){
    this.isLoading.next(true)
  }
  
  loaderDisable(){
    this.isLoading.next(false)
  }
  
}
