import { Component, OnInit, NgZone } from "@angular/core"
import { FlatTreeControl } from "@angular/cdk/tree"
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree"
import { Common } from "../../../../src/app/utils/common"
import { Router } from "@angular/router"
import { TreeNode } from "./tree-node"
import { FlatNode } from "./flat-node"
const TREE_DATA: TreeNode[] = [
  {
    name: "Building Material",
    children: [
      {
        name: "Access Panels",
        children: [
          {
            name: "Accoustic",
          },
          {
            name: "Airtight",
          },
          {
            name: "Budget",
          },
          {
            name: "Ceramic Tile",
          },
          {
            name: "Circular",
          },
          {
            name: "Fire Rated",
          },
          {
            name: "Plastic",
          },
          {
            name: "Plasterboard Door",
          },
          {
            name: "Accoustic",
          },
          {
            name: "Airtight",
          },
          {
            name: "Budget",
          },
          {
            name: "Ceramic Tile",
          },
        ],
      },
      {
        name: "Membranes",
        children: [
          {
            name: "Breather",
          },
          {
            name: "DPC",
          },
          {
            name: "DPM",
          },
          {
            name: "Gas",
          },
          {
            name: "Geotextile",
          },
          {
            name: "Polythelene",
          },
          {
            name: "Tanking",
          },
          {
            name: "Gas",
          },
        ],
      },
    ],
  },
  {
    name: "Insulation",
    children: [
      {
        name: "Green",
        children: [{ name: "Broccoli" }, { name: "Brussels sprouts" }],
      },
      {
        name: "Orange",
        children: [{ name: "Pumpkins" }, { name: "Carrots" }],
      },
    ],
  },
  {
    name: "Ceilings",
  },
  {
    name: "Roofing",
  },
  {
    name: "Commercials",
  },
  {
    name: "Paints",
  },
  {
    name: "Interiors",
  },
]

@Component({
  selector: "app-product-menu-mobile",
  templateUrl: "./product-menu-mobile.component.html",
  styleUrls: ["./product-menu-mobile.component.scss"],
})
export class ProductMenuMobileComponent implements OnInit {
  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    }
  }

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  )

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  )

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener)

  constructor(private router: Router, private ngZone: NgZone) {
    this.dataSource.data = TREE_DATA
  }

  hasChild = (_: number, node: FlatNode) => node.expandable

  ngOnInit() {}

  handleNavigation(searchedText) {
    let qObject = Common.searchProducts(searchedText)
    if (qObject) {
      this.ngZone
        .run(() =>
          this.router.navigate(["/products"], { queryParams: qObject })
        )
        .then()
    }
  }
}
