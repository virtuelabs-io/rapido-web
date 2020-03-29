import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginStateService {
  private userSignedIn = new BehaviorSubject<Boolean>(false);
  private isLoading = new BehaviorSubject<Boolean>(false);

  isLoggedInState = this.userSignedIn.asObservable();
  loaderState = this.isLoading.asObservable();

  constructor() {}

  changeState(state: Boolean) {
    this.userSignedIn.next(state);
  }

  loaderEnable() {
    if (!this.isLoading.value) this.isLoading.next(true);
  }

  loaderDisable() {
    if (this.isLoading.value) this.isLoading.next(false);
  }
}
