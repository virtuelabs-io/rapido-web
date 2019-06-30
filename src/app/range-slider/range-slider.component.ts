import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Options, LabelType, ChangeContext, PointerType } from 'ng5-slider';


@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {
  // @Output() lastPrice: EventEmitter <any> = new EventEmitter();
  @Input() rangeData: any;
  // @Input() rangeData.callbackFunction: any;
  minValue: number = 0;
  // maxValue: number = rangeData.maxValue;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> #' + value;
        case LabelType.High:
          return '<b>Max price:</b> #' + value;
        default:
          return '$' + value;
      }
    }
  };
  callback(event): void {
    alert(event)
    // this.rangeData.callbackFunction(event);
}
onLowValueChange(changeContext: ChangeContext): void {
  console.log(changeContext);
  // this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
}
onHighValueChange(changeContext: ChangeContext): void {
  console.log(changeContext);
  // this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
}

getChangeContextString(changeContext: ChangeContext): string {
  return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
         `value: ${changeContext.value}, ` +
         `highValue: ${changeContext.highValue}}`;
}
}
