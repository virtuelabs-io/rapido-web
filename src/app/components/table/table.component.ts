import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

	@Input() tableData
	displayedColumns: string[] ;
	dataSource:any;
	constructor() {}

	ngOnInit() {
		this.prepareTableData(this.tableData)
	}

	// when table data is array of string with colon
	prepareTableData(tData) {
		let updateData = tData.map((val) => {
        let obj = val.split(':')
			return {
				'prop': obj[0],
				'val': obj[1]
			}
		})
		this.dataSource = updateData
		this.displayedColumns = ['prop', 'val'];

	}

}