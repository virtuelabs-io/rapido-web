import { Component, Input, EventEmitter, Output } from "@angular/core"

@Component({
  selector: "app-pill-badge",
  templateUrl: "./pill-badge.component.html",
  styleUrls: ["./pill-badge.component.scss"],
})
export class PillBadgeComponent {
  @Input() selType: string
  @Input() selValue: string
  @Output() removeSelection: EventEmitter<any> = new EventEmitter<any>()
}
