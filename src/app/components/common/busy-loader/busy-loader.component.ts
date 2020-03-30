import { Component, OnInit, Input } from '@angular/core'
import { LoginStateService } from '../../../shared-services/login-state/login-state.service'

@Component({
  selector: 'app-busy-loader',
  templateUrl: './busy-loader.component.html',
  styleUrls: ['./busy-loader.component.scss'],
})
export class BusyLoaderComponent implements OnInit {
  @Input() loading
  constructor(private _loginStateService: LoginStateService) {}

  ngOnInit() {
    this._loginStateService.loaderState.subscribe((state) => {
      this.loading = state
    })
  }
}
