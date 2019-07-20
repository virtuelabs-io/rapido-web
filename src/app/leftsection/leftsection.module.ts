import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSectionComponent } from './leftsection.component'
import { SearchItemService } from '../shared-services/search-item/search-item.services';

@NgModule({
  declarations: [LeftSectionComponent],
  imports: [
    CommonModule
  ],
  exports:[LeftSectionComponent]
})
export class LeftsectionModule { }
