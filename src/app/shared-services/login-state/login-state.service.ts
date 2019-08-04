import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  private userSignedIn = new BehaviorSubject<Boolean>(false);
  private isLoading = new BehaviorSubject<Boolean>(false);
  private isNavBarVisible = new BehaviorSubject<Boolean>(true);
  isLoggedInState = this.userSignedIn.asObservable();
  loaderState = this.isLoading.asObservable();
  navBarState = this.isNavBarVisible.asObservable();

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
  
  showNavBar(){
    this.isNavBarVisible.next(true)
  }
  
  hideNavBar(){
    this.isNavBarVisible.next(false)
  }

}
