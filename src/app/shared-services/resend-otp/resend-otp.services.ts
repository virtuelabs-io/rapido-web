import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResendOtpService {

  private userSignedIn = new BehaviorSubject<string>("");
  currentState = this.userSignedIn.asObservable();

  constructor() {}

  changeState(value: string) {
    this.userSignedIn.next(value)
  }

}