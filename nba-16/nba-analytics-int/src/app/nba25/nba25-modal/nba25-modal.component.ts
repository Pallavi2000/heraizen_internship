import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material/dialog';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import * as jsondata from '../../../assets/analytics-data/nba25-data.json';
import * as jsondata2 from '../../../assets/analytics-data/nba25-data.json';

export interface Element1 {
	usn: string;
	name: string;
	marks: number;
}
export interface Element2 {
	position: number;
	name: string;
	usn: string;
}

let MY_VAR;
let MY_TOPIC;
/*********************************** main class to display modal1 and modal2 *********************************/
@Component({
	selector: 'app-nba25-modal',
	templateUrl: './nba25-modal.component.html',
	styleUrls: [ './nba25-modal.component.css' ]
})
export class Nba25ModalComponent implements OnInit {
	@Input() selectedOption;
	@Input() md: boolean;
	constructor(public dialog: MatDialog) {}

	ngOnInit(): void {}

	openDialog(modal: any) {
		if (modal === 'Nba25Modal1') {
			MY_VAR = this.selectedOption;
			this.dialog.open(Nba25Modal1, {
				width: '600px',
				height: '500px',
				disableClose: true
			});
		} else {
			MY_VAR = this.selectedOption;
			this.dialog.open(Nba25Modal2, {
				width: '600px',
				height: '500px',
				disableClose: true
			});
		}
	}
}

/******************************   modal1 for student feedback    ********************************************* */
@Component({
	selector: 'app-nba25-modal1',
	templateUrl: './nba25-modal1.html',
	styleUrls: [ './nba25-modal.component.css' ]
})
export class Nba25Modal1 implements OnInit {
	dataSource;
	displayedColumns = [];
	@ViewChild(MatSort) sort: MatSort;
	question: string;
	category: string;

	columnNames = [
		{
			id: 'name',
			value: 'Name'
		},
		{
			id: 'usn',
			value: 'Student Id./USN'
		},
		{
			id: 'marks_given',
			value: 'Marks'
		}
	];

	ngOnInit() {
		console.log(jsondata.default.faculty_data[0].student_feedback_details);
		this.displayedColumns = this.columnNames.map((x) => x.id);
		console.log(MY_VAR);
		this.createTable('1', MY_VAR);
	}

	createTable(val: string, cat: string) {
		console.log(jsondata.default.faculty_data[0].student_feedback_details);
		let tableArr: Element1[] =
			jsondata.default.faculty_data[0].student_feedback_details[cat]['0']['questionwise_details'][val]
				.students_answered;
		this.dataSource = new MatTableDataSource(tableArr);
		this.dataSource.sort = this.sort;
		this.category = cat;
		this.question =
			jsondata.default.faculty_data[0].student_feedback_details[cat]['0']['questionwise_details'][val][
				'question'
			];
	}
}

/******************************  modal2 for student counselling *********************************************/
@Component({
	selector: 'app-nba25-modal2',
	templateUrl: './nba25-modal2.html',
	styleUrls: [ 'nba25-modal.component.css' ]
})
export class Nba25Modal2 implements OnInit {
	dataSource;
	displayedColumns = [];
	@ViewChild(MatSort) sort: MatSort;

	department = jsondata.default.departments[0];
	section = 'A';
	semester = '3';
	topic;

	columnNames = [
		{
			id: 'position',
			value: 'Sr. No.'
		},
		{
			id: 'usn',
			value: 'Student Id./USN'
		},
		{
			id: 'name',
			value: 'Name'
		}
	];

	ngOnInit() {
		console.log(
			jsondata2.default.faculty_data[0].counselling_details['Attendance Shortage'][0]['students_attended']
		);
		this.displayedColumns = this.columnNames.map((x) => x.id);
		this.createTable();
	}
	arr = jsondata.default.faculty_data[0].counselling_details['Attendance Shortage'][0]['students_attended'];
	createTable() {
		for (let i = 0; i < this.arr.length; i++) {
			this.arr[i]['position'] = i + 1;
		}

		let tableArr: Element2[] = this.arr;
		this.dataSource = new MatTableDataSource(tableArr);
		this.dataSource.sort = this.sort;
	}
}
