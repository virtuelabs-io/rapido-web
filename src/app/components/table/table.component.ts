import { Component, OnInit, Input } from "@angular/core"
import { MatTableDataSource, MatSort } from "@angular/material"

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() tableData
  displayedColumns: string[]
  dataSource: any
  constructor() {}

  ngOnInit() {
    if (this.tableData) this.prepareTableData(this.tableData)
  }

  // when table data is array of string with colon
  prepareTableData(tData) {
    let updateData = tData.map((val) => {
      let obj = val.split(":")
      return {
        prop: obj[0],
        val: obj[1],
      }
    })
    this.dataSource = new MatTableDataSource(updateData)
    this.displayedColumns = ["prop", "val"]
  }
}
