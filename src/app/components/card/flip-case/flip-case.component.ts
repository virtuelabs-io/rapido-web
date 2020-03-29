import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";

@Component({
  selector: "app-flip-case",
  templateUrl: "./flip-case.component.html",
  styleUrls: ["./flip-case.component.scss"],
})
export class FlipCaseComponent implements OnInit {
  @Input() flipImage = "";
  @Input() flipBackImage = "";
  @Output() routeTo = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
}
