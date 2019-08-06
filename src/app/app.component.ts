import { Component, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private pageScrollService: PageScrollService, 
    @Inject(DOCUMENT) private document: any
  ) {

  }
  ngOnInit() {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.nav-top',
    });
   }
  }

