import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private route = new BehaviorSubject<any>('')
  previousRoute = this.route.asObservable()

  constructor() {}

  changeRoute(value: string) {
    this.route.next(value)
  }

  getRoute() {
    return this.route
  }
}
