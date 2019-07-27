import { Component, Input } from '@angular/core';
// import { Options, LabelType, ChangeContext, PointerType } from 'ng5-slider';

@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {
  @Input() rangeData: any;
  selectedMinVal: number 
  selectedMaxVal: number 
  ngOnInit() {
    if(this.rangeData){
      this.selectedMinVal = this.rangeData.minValue
      this.selectedMaxVal = this.rangeData.maxValue
    }
    
  }
  // options: Options = {
  //   floor: 0,
  //   ceil: 500,
  //   translate: (value: number, label: LabelType): string => {
  //     switch (label) {
  //       case LabelType.Low:
  //         return '<b>Min :</b> £' + value;
  //       case LabelType.High:
  //         return '<b>Max :</b> £' + value + '+';
  //       default:
  //         return '$' + value;
  //     }
  //   }
  // }

  // userChangeEnd(changeContext: ChangeContext): void {
  //   this.selectedMinVal = changeContext.value
  //   this.selectedMaxVal = changeContext.highValue
  // }

  onSubmitPriceFilter (){
    this.rangeData.fnPriceFilterHandler({
      min:this.selectedMinVal, max:this.selectedMaxVal
    })
  }
}