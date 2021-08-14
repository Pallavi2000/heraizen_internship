import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as jsondata from '../../../assets/analytics-data/nba24-data.json';
import { AnalyticsService } from '../../service/analytics.service';
import { Analytics } from '../../label-externalisation/analytics';

@Component({
	selector: 'app-nba25-graph',
	templateUrl: './nba25-graph.component.html',
	styleUrls: [ './nba25-graph.component.css' ]
})
export class Nba25GraphComponent implements OnInit {
	//dada from nba25-home component
	@Input() current_AcadYear: any;
	@Input() current_terms: any;
	@Input() current_department: any;
	subSelected: any;
	secSelected: any;
	hilo_val;
	radio_val;
	termDrop = [];
	academicYearDrop = [];
	responsiveDataTable;
	SHOW__MAX = false;
	new_visible = true;
	showTable = false;
	error = false;
	data1;
	data2;
	data3;
	faculty_data = [];
	hod_details = [];
	hod_co_detailsArray = [];
	co_detailsArray = [];
	visible = true;
	str: string;
	coNum: string;
	CO_details1: any[] = [];
	CO_details2: any[] = [];
	methodName: string[] = [];
	attainment: number[] = [];
	attainmentPercentage: number[] = [];
	obtainedScore: number[] = [];
	maxScore: number[] = [];
	imethodName: string[] = [];
	iattainment: number[] = [];
	iattainmentPercentage: number[] = [];
	iobtainedScore: number[] = [];
	title: any;
	imaxScore: number[] = [];
	co_curricular_details;
	firstChart = true;
	@Input() averageCo;
	responsiveView;
	responsive_data;
	rwd_DataTable2 = [];
	rwd_enable;
	rwd_GraphData;
	rwd_data2;
	dataIntoRwd = [];
	analyticsObj: Analytics = new Analytics(); //externalisation object

	constructor() {}

	ngOnInit(): void {
		//store all terms and acadYears
		this.termDrop = jsondata['terms'];
		this.academicYearDrop = jsondata['academicYear'];
		this.hod_details = jsondata['hod_details'];
		this.faculty_data = jsondata['faculty_data'];

		for (let i = 0; i < this.faculty_data.length; i++) {
			this.co_detailsArray[i] = this.faculty_data[i]['Co-details'];
		}

		this.getAttainmentGraphData();

		if (this.averageCo) this.average_co();
		else this.average_co_course_wise();
	}

	/******************************** first chart *********************************************************** */

	//gets data for chart1
	getAttainmentGraphData() {
		let graph_data = jsondata['faculty_data'];
		let data_table = [];
		let responsive_dataTable = [];
		this.firstChart = true;
		this.responsiveDataTable = [];

		//filter out duplicates from an array
		const distinct = (value, index, self) => {
			return self.indexOf(value) === index;
		};

		for (let i = 0; i < graph_data.length; i++) {
			//put all the data corresponding to selected termNumbers only
			if (
				this.current_terms.includes(graph_data[i]['termNumber']) &&
				this.current_AcadYear === graph_data[i]['academicYear']
			) {
				this.dataIntoRwd.push(graph_data[i]);
				responsive_dataTable.push([ 'Courses', 'Average CO Attainment Value' ]);
				responsive_dataTable.push([
					graph_data[i]['courseName'] + '\nSection-' + graph_data[i]['section'],
					graph_data[i]['average_attainment']
				]);

				this.responsiveDataTable.push(responsive_dataTable);
			}

			this.dataIntoRwd = this.dataIntoRwd.filter(distinct);
		}

		this.error = false;
		this.responsive_chart_average_co(this.responsiveDataTable);

		data_table.push([ 'Courses', 'Average CO Attainment Value' ]);
		for (let i = 0; i < graph_data.length; i++) {
			//put all the data corresponding to selected termNumbers only
			if (
				this.current_terms.includes(graph_data[i]['termNumber']) &&
				this.current_AcadYear === graph_data[i]['academicYear']
			) {
				data_table.push([
					graph_data[i]['courseName'] + '\nSection-' + graph_data[i]['section'],
					graph_data[i]['average_attainment']
				]);
			}
		}

		if (data_table.length == 1) {
			this.error = true;
			return;
		}

		this.error = false;
		this.avgCoAttainmentGraph(data_table);
	}

	//draw responsive chart1
	responsive_chart_average_co(dataTable) {
		this.responsive_data = {
			chartType: 'ColumnChart',
			dataTable: dataTable,
			options: {
				height: 400,
				//width: 1000,
				vAxes: {
					// Adds titles to each axis.
					0: {
						title: 'Average CO Attainment Value',
						baseline: 0,
						viewWindow: {
							max: 100,
							min: 0
						},
						gridlines: {
							count: 10
						}
					}
				},
				hAxes: {
					// Adds titles to each axis.
					0: { title: 'Courses' }
				},
				colors: [ '#789d96' ],
				bar: {
					groupWidth: '20%'
				},
				chartArea: {
					left: 100,
					//top: '50',
					height: '65%',
					width: '100%'
				},
				legend: {
					position: 'top',
					alignment: 'center',
					display: true
				}
			}
		};
	}

	//draw the chart1
	avgCoAttainmentGraph(data_table) {
		this.data1 = {
			chartType: 'ColumnChart',
			dataTable: data_table,
			options: {
				height: 500,
				hAxis: {
					title: 'Courses'
				},
				vAxis: {
					title: 'Average CO Attainment Value',
					minValue: 0,
					gridlines: {
						count: 10
					}
				},
				legend: {
					position: 'top',
					alignment: 'end'
				},

				colors: [ '#7a9d96' ],
				bar: {
					groupWidth: '16%'
				}
			}
		};
	}

	/********************************************** second chart ************************************************ */

	//second chart info onClicking first chart
	onSelect(event) {
		this.str = event.column;
		console.log('which column clicked ?', this.str);
		this.visible = false;
		let data_table2 = [];
		let graph_data;
		let myvar;
		//get the corresponding co_details array of the clicked course
		for (let i = 0; i < this.co_detailsArray.length; i++) {
			if (this.faculty_data[i]['courseName'] + '\nSection-' + this.faculty_data[i]['section'] === this.str) {
				graph_data = this.co_detailsArray[i];
				this.secSelected = this.faculty_data[i]['section'];
				this.subSelected = this.faculty_data[i]['courseName'];
				myvar = i;
			}
		}

		this.getBloomsLevelGraph(graph_data);
		this.getBloomsLevelRWDGraph(graph_data);
		this.onSelect2({
			column:
				'CO' + this.co_detailsArray[myvar][0]['coNumber'] + '\n' + this.co_detailsArray[myvar][0]['bloomsLevel']
		});
	}

	//gets data for chart2
	getBloomsLevelGraph(graph_data) {
		let data_table2 = [];
		data_table2.push([
			'Blooms levels with mapped COs',
			'Total Attainment',
			'Direct Attainment',
			'Indirect Attainment'
		]);

		for (let j = 0; j < graph_data.length; j++) {
			data_table2.push([
				'CO' + graph_data[j]['coNumber'] + '\n' + graph_data[j]['bloomsLevel'],
				graph_data[j]['totalAttainment'],
				graph_data[j]['directAttainment'],
				graph_data[j]['indirectAttainment']
			]);
		}

		this.bloomsLevelGraph(data_table2);
	}

	//draw the chart2
	bloomsLevelGraph(data_table) {
		//console.log(data_table);

		this.data2 = {
			dataTable: data_table,
			options: {
				height: '450',

				hAxis: {
					title: 'Blooms levels with mapped COs'
				},
				vAxis: {
					title: 'CO Attainment Value',
					minValue: 0
				},
				legend: {
					position: 'top',
					alignment: 'end'
				},
				colors: [ '#2a8cab', '#7d9c94', '#bca07d' ],
				//seriesType: "bars",
				bar: {
					groupWidth: '25%'
				}
			}
		};

		this.data3 = this.data2;
	}

	//gets data for responsive chart2
	getBloomsLevelRWDGraph(graph_data) {
		this.rwd_enable = true;
		for (let j = 0; j < graph_data.length; j++) {
			let rwd_data_table = [];
			this.rwd_GraphData = graph_data;
			rwd_data_table.push([
				'Blooms levels with mapped COs',
				'Total Attainment',
				'Direct Attainment',
				'Indirect Attainment'
			]);
			rwd_data_table.push([
				'CO' + graph_data[j]['coNumber'] + '\n' + graph_data[j]['bloomsLevel'],
				graph_data[j]['totalAttainment'],
				graph_data[j]['directAttainment'],
				graph_data[j]['indirectAttainment']
			]);
			this.rwd_DataTable2.push(rwd_data_table);
		}
		this.bloomsLevelRWDGraph(this.rwd_DataTable2);
	}

	//draws the responsive chart2
	bloomsLevelRWDGraph(data_table) {
		this.rwd_data2 = {
			chartType: 'ColumnChart',
			dataTable: data_table,
			options: {
				// height: 450,
				chartArea: {
					width: '100%',
					left: 50,
					right: 30
				},
				hAxis: {
					title: 'Blooms levels with mapped COs'
				},
				vAxis: {
					title: 'CO Attainment Value',
					minValue: 0
				},
				legend: {
					position: 'top',
					alignment: 'end'
				},
				colors: [ '#2a8cab', '#7d9c94', '#bca07d' ],
				//seriesType: "bars",
				bar: {
					groupWidth: '20%'
				}
			}
		};
	}

	average_co() {
		this.responsiveView = false;
		this.getAttainmentGraphData();
	}
	average_co_course_wise() {
		this.responsiveView = true;
		this.getAttainmentGraphData();
	}

	/*********************************** table part after clicking chart2********************************** */

	onSelect2(event) {
		this.showTable = !this.showTable;
		this.SHOW__MAX = !this.SHOW__MAX;

		let graph_data = [];
		let index = [];
		this.coNum = event.column;
		console.log("What is the selected graph's co_number ?", this.str);

		for (let i = 0; i < this.co_detailsArray.length; i++) {
			if (this.str == this.faculty_data[i]['courseName'] + '\nSection-' + this.faculty_data[i]['section']) {
				index.push(i);
				for (let j = 0; j < this.co_detailsArray[i].length; j++) {
					if (
						this.coNum ==
						'CO' + this.co_detailsArray[i][j]['coNumber'] + '\n' + this.co_detailsArray[i][j]['bloomsLevel']
					) {
						index.push(j);
					}
				}
			}
		}
		this.SHOW__MAX = true;
		this.getTableData(index);
	}

	//get data for table
	getTableData(index) {
		this.CO_details1 = this.faculty_data[index[0]]['Co-details'][index[1]];
		this.CO_details2 = this.CO_details1;
		console.log(this.CO_details1);
	}

	/********************************* event driven methods **************************************************/

	onChangeCard(newObj: Object) {
		this.new_visible = !this.new_visible;
		console.log(newObj);
		let graph_data = [];
		let myvar;
		for (let i = 0; i < this.co_detailsArray.length; i++) {
			if (
				newObj['changed_subSelected'] == this.faculty_data[i]['courseName'] &&
				newObj['changed_secSelected'] == this.faculty_data[i]['section']
			) {
				graph_data = this.co_detailsArray[i];
				myvar = i;
				this.str = this.faculty_data[i]['courseName'] + '\nSection-' + this.faculty_data[i]['section'];
			}
		}

		this.getBloomsLevelGraph(graph_data);
		this.onSelect2({
			column:
				'CO' + this.co_detailsArray[myvar][0]['coNumber'] + '\n' + this.co_detailsArray[myvar][0]['bloomsLevel']
		});
	}

	onChangeRadio(newObj: object) {
		this.hilo_val = newObj['hilo_val'];
		this.radio_val = newObj['radio_val'];
		this.onSortRadioChange();
		this, this.onHiloRadioChange();
	}

	compareValues(
		key,
		order = 'asc' //sort function
	) {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				// property doesn't exist on either object
				return 0;
			}

			const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
			const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}
			return order === 'desc' ? comparison * -1 : comparison;
		};
	}

	onSortRadioChange() {
		if (this.radio_val == 0) {
			if (this.hilo_val == 0) this.dataIntoRwd.sort(this.compareValues('average_attainment', 'desc'));
			else if (this.hilo_val == 1) this.dataIntoRwd.sort(this.compareValues('average_attainment'));
		} else if (this.radio_val == 1) {
			if (this.hilo_val == 0) this.dataIntoRwd.sort(this.compareValues('courseName', 'desc'));
			else if (this.hilo_val == 1) this.dataIntoRwd.sort(this.compareValues('courseName'));
		} else if (this.radio_val == 2) {
			if (this.hilo_val == 0) this.dataIntoRwd.sort(this.compareValues('facName', 'desc'));
			else if (this.hilo_val == 1) this.dataIntoRwd.sort(this.compareValues('facName'));
		}
	}

	onHiloRadioChange() {
		if (this.hilo_val == 0) {
			if (this.radio_val == 0) this.dataIntoRwd.sort(this.compareValues('average_attainment', 'desc'));
			else if (this.radio_val == 1) this.dataIntoRwd.sort(this.compareValues('courseName', 'desc'));
			else if (this.radio_val == 2) this.dataIntoRwd.sort(this.compareValues('facName', 'desc'));
		} else {
			if (this.radio_val == 0) this.dataIntoRwd.sort(this.compareValues('average_attainment'));
			else if (this.radio_val == 1) this.dataIntoRwd.sort(this.compareValues('courseName'));
			else if (this.radio_val == 2) this.dataIntoRwd.sort(this.compareValues('facName'));
		}
	}
}
