import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  
  @Input() currentRate:string
  @Input() styleClass:string
  @Input() readonly:Boolean
  @Output() fetchRate = new EventEmitter<string>()

  rate2: number
  constructor() {
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchRate.emit(this.currentRate)
    }
  }

  

