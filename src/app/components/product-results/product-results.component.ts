import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchItemService } from '../../shared-services/search-item/search-item.services';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { ProductsService } from '../../services/products/products.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Query } from '../../services/products/query.interface';
import { Common } from '../../utils/common';

@Component({
  selector: 'app-productresults',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.scss']
})
export class ProductResultsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator
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
  _searchItemServicecurrentState: any
  prevQuery: Query
  
  
  constructor(private _searchItemService: SearchItemService,
    public dialog: MatDialog,
    productsService: ProductsService,
    public loginStateService: LoginStateService,
    public router: Router,
    public route: ActivatedRoute) { 
      this._productsService = productsService
    }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.loginStateService.loaderEnable()
        if(params && params.q){
        let qObject = Common.decodeUrlParams(params)
        this.paginator.pageIndex = Math.ceil(qObject.start / qObject.size)
        this._searchItemService.changeState(qObject)
        this._productsService.get(qObject).
          subscribe(data => {
            if(data){
              if(data.error || data.hits.found === 0 || (!(data && data.hits && data.hits.hit.length))){
                this.noResultsFound = true
                this.loginStateService.loaderDisable()
                return;
              }
              this.noResultsFound = false
              this.responseData = data
              this._searchItemService.changeRespProdListState(data)
              this.productList = data.hits.hit
              this.length = data.hits && data.hits.found // for pagination
              this.productListBind =this.productList
              // this.paginator.pageIndex = 0;
              this.loginStateService.loaderDisable()
            }
           })
          }
      });
      this._searchItemServicecurrentState = this._searchItemService.currentState.subscribe(query => {
        if (query.searchedText) {
          this.searchedText = query.searchedText
          this.prevQuery = query
        }
      })
    }

    ngOnDestroy(){
     localStorage.removeItem('fieldsQuery')
     localStorage.removeItem('searchedText')
     this._searchItemServicecurrentState.unsubscribe();
    }

    onPageChange(evt){
      let pageNum = evt.pageIndex * evt.pageSize
      let qObject = {...this.prevQuery, ...{ start: pageNum }}
      let urlParams = Common.setUrlParams(qObject)
      this.router.navigate(['/products'], { queryParams: urlParams })
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
