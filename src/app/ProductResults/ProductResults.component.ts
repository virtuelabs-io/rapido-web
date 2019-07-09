import { Component, OnInit, Inject } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { ProductsService } from '../services/products/products.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-productresults',
  templateUrl: './ProductResults.component.html',
  styleUrls: ['./ProductResults.component.scss']
})
export class ProductResultsComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 15;
  pageSizeOptions: number[] = [5, 15, 30,45, 90];

  // MatPaginator Output
  pageEvent: PageEvent;

  private _productsService: ProductsService
  searchedText: string = ""
  responseData: Object
  public productList: Array<{id: number, fields: Object}>
  public productListBind: Array<{id: number, fields: Object}>
  constructor(private _searchItemService: SearchItemService,
              public dialog: MatDialog,
              productsService: ProductsService) { 
                this._productsService = productsService
              }

  ngOnInit() {
    this._searchItemService.currentState.subscribe(query => {
      if (query.q){
        this.searchedText = query.q
        this._productsService.get(query).
         subscribe(data => {
            if(data){
              if(data.error){
                throw Error('error')
              }
              this.responseData = data
              this._searchItemService.changeResponsePoductListState(data)
              if(data && data.hits && data.hits.hit)
              this.productList = data.hits.hit
              for(let i=1; i<150; i++){
                this.productList.push(data.hits.hit[0])
              }
              this.productListBind =this.productList.slice(0,this.pageSize);
            }
            
       })
      }
      
      })
    }

    onPageChange(evt){
      console.log(evt)
      this.productListBind = this.productList.slice(evt.pageIndex * evt.pageSize,evt.pageSize+(evt.pageIndex * evt.pageSize));
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        // width: 'auto',
        // height:'auto'
        // data: {name: 'this.name', animal: 'this.animal'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
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
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
