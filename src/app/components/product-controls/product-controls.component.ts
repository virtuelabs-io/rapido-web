import { Component, OnInit, Input } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-productcontrols',
  templateUrl: './product-controls.component.html',
  styleUrls: ['./product-controls.component.scss'],
})
export class ProductControlsComponent implements OnInit {
  @Input() searchedText: string = ''
  // @Input() responseData:Object
  constructor() {}

  ngOnInit() {}
  // MatPaginator Inputs
  length = 100
  pageSize = 10
  pageSizeOptions: number[] = [5, 10, 25, 100]

  // MatPaginator Output
  pageEvent: PageEvent

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map((str) => +str)
  }
}
