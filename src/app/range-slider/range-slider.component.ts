import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Options, LabelType, ChangeContext, PointerType } from 'ng5-slider';


@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {
  // @Output() lastPrice: EventEmitter <any> = new EventEmitter();
  selectedMinVal: number 
  selectedMaxVal: number 
  @Input() rangeData: any;
  // @Input() rangeData.callbackFunction: any;
  minValue: number = 0
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min :</b> #' + value;
        case LabelType.High:
          return '<b>Max :</b> #' + value;
        default:
          return '$' + value;
      }
    }
  };
  callback(event): void {
    alert(event)
    // this.rangeData.callbackFunction(event);
}

  userChangeEnd(changeContext: ChangeContext): void {
    console.log(changeContext.highValue,changeContext.value);
    this.selectedMinVal = changeContext.value
    this.selectedMaxVal = changeContext.highValue
    console.log(this.rangeData)
    this.rangeData.callbackFunction({
      min:this.selectedMinVal,max:this.selectedMaxVal
    })
//     highValue: 305
// pointerType: 1
// value: 
    // this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
  }
}
