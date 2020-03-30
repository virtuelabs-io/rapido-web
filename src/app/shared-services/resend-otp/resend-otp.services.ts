import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ResendOtpService {
  private mobileNumber = new BehaviorSubject<string>("")
  currentNumber = this.mobileNumber.asObservable()

  constructor() {}

  changeNumber(value: string) {
    this.mobileNumber.next(value)
  }
}
