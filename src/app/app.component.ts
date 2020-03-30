import { Component, Inject } from '@angular/core'
import { PageScrollService } from 'ngx-page-scroll-core'
import { DOCUMENT } from '@angular/common'
import { Router, Event, ActivationEnd } from '@angular/router'
import { Config } from 'src/app/utils/config'
import { SidenavService } from './components/nav/nav.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavBar: Boolean = true
  sideNav: any
  constructor(
    private router: Router,
    private sidenav: SidenavService,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.nav-top',
    })

    this.router.events.subscribe((event: Event) => {
      if (event instanceof ActivationEnd) {
        this.handleNavBarVisibility(event)
      }
    })
  }

  handleNavBarVisibility(event) {
    let navBarComponents = Config.COMPONENTS_WITHOUT_NAVBAR
    let componentName = event.snapshot.component.name
    if (componentName) {
      this.sidenav.close()
    }
  }

  onActivate() {
    window.scroll(0, 0)
  }
}
