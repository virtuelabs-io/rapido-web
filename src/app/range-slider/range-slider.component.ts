import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Options, LabelType, ChangeContext, PointerType } from 'ng5-slider';


@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {
  selectedMinVal: number 
  selectedMaxVal: number 
  @Input() rangeData: any;
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

  userChangeEnd(changeContext: ChangeContext): void {
    console.log(changeContext.highValue,changeContext.value);
    this.selectedMinVal = changeContext.value
    this.selectedMaxVal = changeContext.highValue
  }

    onSubmitPriceFilter (){
    this.rangeData.fnPriceFilterHandler({
      min:this.selectedMinVal,max:this.selectedMaxVal
    })
  }
}
