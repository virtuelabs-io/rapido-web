import {
  Component,
  OnInit,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.scss"],
})
export class RatingComponent implements OnInit {
  @Input() currentRate: string;
  @Input() styleClass: string;
  @Input() readonly: Boolean;

  constructor() {}

  ngOnInit() {}
}
