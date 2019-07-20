import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductResultsComponent } from './product-results.component'
import { FilterControlsDialog } from './product-results.component'
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { ProductsService } from '../services/products/products.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProfileService } from '../services/authentication/profile/profile.service';

@NgModule({
  declarations: [ProductResultsComponent,FilterControlsDialog],
  imports: [
    CommonModule
  ],
  exports:[ProductResultsComponent,FilterControlsDialog]
})
export class ProductResultsModule { }
