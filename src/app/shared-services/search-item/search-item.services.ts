 import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchItemService {

  private searchItemText = new BehaviorSubject<string>("");
  currentState = this.searchItemText.asObservable();

  constructor() {}

  changeState(state: string) {
    this.searchItemText.next(state)
  }

}
