import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { TopnavComponent } from '../topnav/topnav.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  providers: [TopnavComponent],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild('commandbarSidenav') public sidenav: MatSidenav;
  //opened: Boolean = false
 

  constructor(
    private commandBarSidenavService: TopnavComponent,
  ) { }

  ngOnInit() {
   // this.commandBarSidenavService.setSidenav(this.sidenav);
  }

}
