import { Component, OnInit } from '@angular/core';
import { SearchItemService } from '../../shared-services/search-item/search-item.services';
import { ProductsService } from '../../services/products/products.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productresults',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.scss']
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
  searchUrlParam: string = ""
  responseData: Object
  noResultsFound: boolean = false
  public productList: Array<{id: number, fields: Object}>
  public productListBind: Array<{id: number, fields: Object}>
  constructor(private _searchItemService: SearchItemService,
    public dialog: MatDialog,
    productsService: ProductsService,
    public route: ActivatedRoute) { 
      this._productsService = productsService
    }

  ngOnInit() {
    // this.router.navigate(['/products'], { queryParams: { search: this.searchedText, parseQuery:false } })
    this.route.queryParams
      .subscribe(params => {
        this.searchUrlParam = params.search
        this._productsService.getFromParams(params.search).
          subscribe(data => {
            if(data){
              if(data.error || data.hits.found === 0){
                this.noResultsFound = true
                return;
              }
              this.noResultsFound = false
              this.responseData = data
              this._searchItemService.changeRespProdListState(data)
              if(data && data.hits && data.hits.hit)
              this.productList = data.hits.hit
              this.length = data.hits && data.hits.found
              this.productListBind =this.productList
            }
           })
      });
    }

    ngOnDestroy(){
     localStorage.removeItem('fieldsQuery')
     localStorage.removeItem('searchedText')
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
      const dialogRef = this.dialog.open(FilterControlsDialog, {
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
      <i class="fa fa-times hidden-lg hidden-md" (click)="closeDialog()"></i>
      <app-leftsection [closeDialog]=dialogRef></app-leftsection>
    </mat-dialog-content>
    `,
  })
  
  export class FilterControlsDialog {
    // dialogRef: any
    constructor(public dialogRef: MatDialogRef<FilterControlsDialog>) {}
  
    closeDialog(): void {
      this.dialogRef.close();
    }
  
  }
