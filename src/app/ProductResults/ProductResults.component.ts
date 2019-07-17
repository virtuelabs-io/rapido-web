import { Component, OnInit, Inject } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { ProductsService } from '../services/products/products.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';



@Component({
  selector: 'app-productresults',
  templateUrl: './ProductResults.component.html',
  styleUrls: ['./ProductResults.component.scss']
})
export class ProductResultsComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 15;
  pageSizeOptions: number[] = [15];

  // MatPaginator Output
  pageEvent: PageEvent;

  private _productsService: ProductsService
  searchedText: string = ""
  responseData: Object
  noResultsFound: boolean = false
  public productList: Array<{id: number, fields: Object}>
  public productListBind: Array<{id: number, fields: Object}>
  constructor(private _searchItemService: SearchItemService,
              public dialog: MatDialog,
              productsService: ProductsService) { 
                this._productsService = productsService
              }

  ngOnInit() {
    this._searchItemService.currentState.subscribe(query => {
      if (query.q && query.searchedText){
        this.searchedText = query.searchedText
        this._productsService.get(query).
         subscribe(data => {
            if(data){
              if(data.error){
                throw Error('error')
              }
              if(data.hits.found < 0){
                this.noResultsFound = true
              }
              this.responseData = data
              this._searchItemService.changeResponsePoductListState(data)
              if(data && data.hits && data.hits.hit)
              this.productList = data.hits.hit
              this.length = data.hits && data.hits.found
              this.productListBind =this.productList
            }
       })
      }
      })
    }

    onPageChange(evt){
      this._searchItemService.changeState({
        start: evt.pageIndex * evt.pageSize
      })
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        height: '80%',
        width: '80%',
      });
  
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
    }
  }

  @Component({
    selector: 'dialog-overview-example-dialog',
    template: `
    <mat-dialog-content>
      <i class="fa fa-times hidden-lg hidden-md" (click)="onNoClick()"></i>
      <app-leftsection></app-leftsection>
    </mat-dialog-content>
    `,
  })
  export class DialogOverviewExampleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
