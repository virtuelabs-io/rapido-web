import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { Constants } from '../../../src/app/utils/constants';

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,Constants
  ],
  exports:[ImagesComponent]
})
export class ImagesModule { }
