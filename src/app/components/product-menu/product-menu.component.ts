import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent implements OnInit {
  categories = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
    this.categories = this.data
  }

}
