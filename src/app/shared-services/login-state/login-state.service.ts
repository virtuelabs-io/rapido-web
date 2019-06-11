import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  private userSignedIn = new BehaviorSubject<Boolean>(false);
  currentState = this.userSignedIn.asObservable();

  constructor() {}

  changeState(state: Boolean){
    this.userSignedIn.next(state)
  }

}
