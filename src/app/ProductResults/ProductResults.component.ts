import { Component, OnInit, Inject } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { ProductsService } from '../services/products/products.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  private _productsService: ProductsService
  searchedText: string = ""
  responseData: Object
  public productList: Array<{id: number, fields: Object}>
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
              if(data && data.hits && data.hits.hit)
              this.productList = data.hits.hit
              for(let i=1; i<15; i++){
                this.productList.push(data.hits.hit[0])
              }
            }
            
       })
      }
      
      })
    }

    openDialog(): void {
      debugger
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        // width: '250px',
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
    template: 'hi<app-leftsection></app-leftsection>',
  })
  export class DialogOverviewExampleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
