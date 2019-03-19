import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() btnIcon: string;
  @Output() onClick = new EventEmitter<any>();
  constructor() { }

  onClickButton(event) {
    this.onClick.emit(event);
  }

  ngOnInit() {
  }

}
