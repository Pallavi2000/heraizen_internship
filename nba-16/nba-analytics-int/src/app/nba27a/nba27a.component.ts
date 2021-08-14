import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import * as jsondata from '../../assets/analytics-data/nba27(a).json';
import * as customjsondata from '../../assets/analytics-data/nba27acustom-data.json';
import * as customjsondata2 from '../../assets/analytics-data/nba27acustom-data2.json';
import { AnalyticsService } from '../service/analytics.service';
import { Analytics } from '../label-externalisation/analytics';
import { MatRadioModule } from '@angular/material/radio';

interface AcadYears {
	value: string;
	viewValue: string;
}

interface Terms {
	value: string;
	viewValue: string;
}
interface Departments {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-nba27a',
	templateUrl: './nba27a.component.html',
	styleUrls: [ './nba27a.component.css' ]
})
export class Nba27aComponent implements OnInit {
	analyticsObj: Analytics = new Analytics(); //externalisation object
	fac_stu_val: number;
	hilo1_val: number;
	hilo2_val: number;
	hilo3_val: number;
	sort1_val: number;
	BC_val: number;
	tempJson;
	tempJson2;
	dirTableArray = new Array();
	indirTableArray = new Array();
	stuTableArray = new Array();
	stuSelObj;
	stuSelObj2;
	eyeDirClicked: boolean;
	eyeIndirClicked: boolean;
	termsArray = new Array();
	subjects = new Array();
	subSelected: string;
	currActiveCard: string;
	currActiveContent: string;
	id2: string;
	stuNameArray = new Array();
	PONum: string;
	POLevel: string;
	CONum: string;
	COLevel: string;
	COCourse: string;
	stuName: string;
	stuUSN: string;
	//radio buttons
	Fac = true;
	Stud = false;

	globalFlag = 0;
	//form controls
	searchBar: FormGroup;
	termsList = new FormControl();

	//flags
	isPrincipal: number;
	clicked = false;
	error: boolean;
	averageCo = false;
	averageCoCourseWise = false;

	//data
	acadYears: AcadYears[] = jsondata.default['faculty_data']['academic_year']; //fetch acadYears
	terms: Terms[] = jsondata.default['faculty_data']['semesters']; //fetch terms
	departments: Departments[] = jsondata.default['faculty_data']['departments']; //fetch de[partments
	po_data_courses = jsondata.default['faculty_data']['po_attainment_data'];

	//inputs
	current_AcadYear = this.acadYears[2];
	current_terms = [ '6' ];
	current_department = '';
	course_terms = [ '6' ];

	//variables for graph1
	graph_data;
	graphdata_index = [];
	firstChart;
	secondChart;
	data1;
	data2;
	data3;
	data_table1 = [];
	data_table2 = [];
	visible = true;
	visible1 = true;
	selectedPo;
	selectedCo;
	table1 = false;
	student_detailsArray = [];
	co_detailsArray = [];
	eyeClicked = false;
	CourseCentric = false;
	BTClicked = false;
	AllCOCourses = [];
	downTableCo = 1;
	

	constructor(private fb: FormBuilder) {
		this.searchBar = this.fb.group({
			year: [ '2019-20', Validators.required ],
			course: [ [ '' ], Validators.required ]
		});
	}

	ngOnInit(): void {
		
		this.fac_stu_val = 0;
		this.hilo1_val = 0;
		this.hilo2_val = 0;
		this.hilo3_val = 0;
		this.sort1_val = 0;
		this.BC_val = 0;
		this.tempJson = customjsondata.default;
		this.tempJson2 = customjsondata2.default;
		this.fillDirTable();
		this.fillinDirTable();

		this.eyeDirClicked = false;
		this.eyeIndirClicked = false;
		this.subjects = [
			'Construction Design',
			'Mathematics-II',
			'Fluid Mechanics',
			'Strength of Material',
			'Quality Management',
			'Basic Electronics'
		];
		this.subSelected = 'Fluid Mechanics';
		this.stuSelObj2 = {
			name: 'Pratheeksha Hegde',
			usn: '4ME18CS001',
			attainment: '2',
			direct_attainment: [ 0.0, 0.0, 38.89 ],
			direct_attainmentPercentage: [ 0.0, 0.0, 0.0 ],
			direct_methodDescription: [ 'Internal Assessment', '' ],
			direct_methodName: [ 'IA', 'UE', 'Other Assessment' ],
			direct_total_obtained_score: [ '8', '7', '6' ],
			direct_total_max_score: [ '6', '7', '9' ],
			indirect_attainment: [ 0.0 ],
			indirect_attainmentPercentage: [ 0.0 ],
			indirect_methodDescription: [ 'CES' ],
			indirect_methodName: [ 'Feedback' ],
			indirect_total_obtained_score: [ 0.0 ],
			indirect_total_max_score: [ 0.0 ]
		};

		this.fillStuTable();
		
		this.graph_data = jsondata['faculty_data']['po_attainment_data'];
		console.log('ALL DATA', this.graph_data);
		this.termsList.setValue([ '6' ]);
		this.isPrincipal = 1;

	}

	
	sortDataTable1() {
		console.log('sort this', this.data_table1);
		var newArr = new Array();
		for (var x = 1; x < this.data_table1.length; x++) 
		{
			newArr.push(this.data_table1[x]);
		}

		var sortedArr = this.getSorted(newArr);
		var newDataTable1 = new Array();
		newDataTable1.push(this.data_table1[0]);
		for (var i = 0; i < sortedArr.length; i++) 
		newDataTable1.push(sortedArr[i]);
		this.data_table1 = newDataTable1;
		console.log('SORTED', this.data_table1);
	}

	getSorted(arr) {
		var ret = new Array();

		if (this.hilo1_val == 1) {
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'REMEMBER') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'UNDERSTAND') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'ANALYZE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'APPLY') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'EVALUATE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'CREATE') ret.push(curr);
			}
		} else {
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'CREATE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'EVALUATE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'APPLY') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'ANALYZE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'UNDERSTAND') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[1].trim();
				if (curr2 == 'REMEMBER') ret.push(curr);
			}
		}

		return ret;
	}

	sortDataTable2()
	{
		console.log("data2 before sort",this.data_table2);
		var newArr = new Array();
		for (var x = 1; x < this.data_table2.length; x++) 
		{
			newArr.push(this.data_table2[x]);
		}
		var sortedArr = this.getSorted2(newArr);
		var newDataTable2 = new Array();
		newDataTable2.push(this.data_table2[0]);
		for (var i = 0; i < sortedArr.length; i++) 
		newDataTable2.push(sortedArr[i]);
		this.data_table2 = newDataTable2;
		console.log('SORTED', this.data_table2);
	}

	getSorted2(arr)
	{
		var ret=new Array();
		if(this.sort1_val==0)
		{
			ret=this.sort2ByBloom(arr);
		}
		else
		{
			if(this.hilo2_val==0)
			{
				for(var i=0;i<arr.length-1;i++)
				{
					for(var j=0;j<arr.length-i-1;j++)
					{
						if(this.compareNames(arr[j],arr[j+1])<0)
						{
							var temp=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=temp;
						}
					}
				}
				ret=arr;
			}
			else
			{
				for(var i=0;i<arr.length-1;i++)
				{
					for(var j=0;j<arr.length-i-1;j++)
					{
						if(this.compareNames(arr[j],arr[j+1])>0)
						{
							var temp=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=temp;
						}
					}
				}
				ret=arr;	
			}
		}
		return ret;
	}


	compareNames(a,b)
	{
		var aName=a[0].match(/[^\r\n]+/g)[1].trim().toUpperCase();
		var bName=b[0].match(/[^\r\n]+/g)[1].trim().toUpperCase();
		return aName.localeCompare(bName);
	}

	sort2ByBloom(arr)
	{
		var ret = new Array();
		if (this.hilo2_val == 1) {
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'REMEMBER') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'UNDERSTAND') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'ANALYZE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'APPLY') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'EVALUATE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'CREATE') ret.push(curr);
			}
		} else {
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'CREATE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'EVALUATE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'APPLY') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'ANALYZE') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'UNDERSTAND') ret.push(curr);
			}
			for (var i = 0; i < arr.length; i++) {
				var curr = arr[i];
				var curr2 = curr[0].match(/[^\r\n]+/g)[2].trim().toUpperCase();
				if (curr2 == 'REMEMBER') ret.push(curr);
			}
		}
		return ret;
	}


	onRadioChange() {
		if (this.fac_stu_val == 0) {
			this.Fac = false;
			this.Stud = true;
		} else if (this.fac_stu_val == 1) {
			this.Fac = true;
			this.Stud = false;
			this.eyeClicked = false;
		}
	}

	onHilo1RadioChange() {
		this.sortDataTable1();
	}

	onHilo2RadioChange() {
		this.sortDataTable2();
	}

	onHilo3RadioChange() {
		alert(this.hilo3_val);
	}

	onSort1RadioChange() {
		this.sortDataTable2();
	}

	onBCRadioChange() {
		if (this.BC_val == 0) this.CourseCentric = false;
		else {
			this.CourseCentric = true;
		}
	}

	fillDirTable() {
		this.dirTableArray = [];
		for (var i in this.tempJson) {
			var obj = this.tempJson[i];
			this.dirTableArray.push(obj);
		}
	}

	fillinDirTable() {
		this.indirTableArray = [];
		for (var i in this.tempJson) {
			var obj = this.tempJson[i];
			this.indirTableArray.push(obj);
		}
	}

	fillStuTable() {
		this.stuTableArray = [];
		this.stuNameArray = this.getStuNames();
		for (var i in this.stuNameArray) {
			var obj = this.stuNameArray[i];
			var name = obj.substring(0, obj.indexOf(';'));
			var usn = obj.substring(obj.indexOf(';') + 1, obj.indexOf(','));
			var avg_co = obj.substring(obj.indexOf(',') + 1, obj.length);

			var obj2 = {
				name: name,
				usn: usn,
				avg_co: avg_co
			};
			this.stuTableArray.push(obj2);
		}
	}

	getStuNames() {
		var arr = new Array();
		var obj1 = jsondata.default.faculty_data.po_attainment_data[0].po_wise_attainment;
		for (var i in obj1) {
			var obj2 = obj1[i].Co_details;
			for (var j in obj2) {
				var obj3 =
					obj2[j].students_wise_attainment.name +
					';' +
					obj2[j].students_wise_attainment.usn +
					',' +
					obj2[j].students_wise_attainment.attainment;
				if (arr.indexOf(obj3) == -1) arr.push(obj3);
			}
		}
		return arr;
	}

	eyeDirClickedFunc(name1, USN1) {
		this.eyeDirClicked = true;
		this.eyeIndirClicked = false;
		for (var i in this.student_detailsArray) {
			var obj = this.student_detailsArray[i];
			if (obj.name == name1 && obj.usn == USN1) {
				this.stuSelObj = obj;
			}
		}
	}

	eyeIndirClickedFunc(name1, USN1) {
		this.eyeIndirClicked = true;
		this.eyeDirClicked = false;
		for (var i in this.student_detailsArray) {
			var obj = this.student_detailsArray[i];
			if (obj.name == name1 && obj.usn == USN1) {
				this.stuSelObj = obj;
			}
		}
	}

	eyeStuClicked(name, USN) {
		this.stuName = name;
		this.stuUSN = USN;
		this.eyeClicked = true;
		this.visible = true;
		this.clicked = true;
		this.table1 = false;
		this.getAttainmentGraphData();
	}

	checkAddActive(obj, i) {
		var id = 'card' + i;
		this.id2 = '' + i; //danger

		if (obj == this.subSelected) {
			this.currActiveCard = id;
			this.currActiveContent = this.id2; //danger
			document.getElementById(id).classList.remove('card-prop');
			document.getElementById(id).classList.add('card-active');
		}
		return true;
	}

	cardClicked(obj, i) {
		var id = 'card' + i;
		document.getElementById(this.currActiveCard).classList.remove('card-active');
		document.getElementById(this.currActiveCard).classList.add('card-prop');
		document.getElementById(id).classList.remove('card-prop');
		document.getElementById(id).classList.add('card-active');
		document.getElementById(this.currActiveContent).classList.remove('content-active'); //danger
		document.getElementById(i).classList.add('content-active'); //danger
		this.currActiveCard = id;
		this.subSelected = obj;
	}

	updatePONum() {
		var array = this.selectedPo.match(/[^\r\n]+/g);
		this.PONum = array[0];
	}

	updatePOLevel() {
		var array = this.selectedPo.match(/[^\r\n]+/g);
		var st = array[1];
		st = st.toLowerCase();
		var first = st.substring(0, 1);
		first = first.toUpperCase();
		var second = st.substring(1, st.length);
		this.POLevel = first + second;
	}

	updateCONum() {
		var array = this.selectedCo.match(/[^\r\n]+/g);
		this.CONum = array[0];
	}

	updateCOLevel() {
		var array = this.selectedCo.match(/[^\r\n]+/g);
		this.COLevel = array[2];
	}

	updateCOCourse() {
		var array = this.selectedCo.match(/[^\r\n]+/g);
		this.COCourse = array[1];
	}

	
	//get acad_year
	filter1(data) {
		this.clicked = false;
		this.current_AcadYear = data.value;
	}
	//get terms
	filter2(data) {
		this.clicked = false;
		//console.log(data.value,this.terms);
		//if (JSON.stringify(data.value) === JSON.stringify(this.terms)) {
		this.current_terms = data.value;
		//}
	}
	//get departments
	filter3(data) {
		this.clicked = false;
		this.current_department = data.value;
	}

	filter4(data) {
		this.course_terms = data.value;
	}

	//enable or disable search button
	searchClick() {
		this.visible = true;
		this.clicked = true;
		this.table1 = false;
		this.secondChart = false;
		this.BTClicked = false;
		if (this.Fac) {
			if (this.current_terms.length && this.current_department) {
				this.clicked = true;
				this.globalFlag = 1;
			} else {
				alert('Please select all fields');
				return;
			}
			this.getAttainmentGraphData();
		} else {
			if (this.current_department) {
				this.clicked = true;
				this.globalFlag = 1;
				this.eyeClicked = false;
			} else {
				alert('Please select all fields');
				return;
			}
		}
	}

	getAttainmentGraphData() {
		this.data_table1 = [];
		this.firstChart = true;
		this.data_table1.push([ 'Courses', 'PO Attainment Value' ]);
		//console.log(this.current_terms,this.current_AcadYear);
		for (let i = 0; i < this.graph_data.length; i++) {
			//put all the data corresponding to selected termNumbers only
			if (
				this.current_terms.includes(this.graph_data[i]['termNumber']) &&
				this.current_AcadYear === this.graph_data[i]['academic_year']
			) {
				//console.log(this.graph_data[i]["po_wise_attainment"]);
				this.graphdata_index = [];
				this.graphdata_index.push(i);
				for (let obj of this.graph_data[i]['po_wise_attainment']) {
					//console.log(obj);
					this.data_table1.push([
						'PO' + obj['poNumber'] + '\n' + obj['po_blooms_level'],
						obj['po_attainment']
					]);
				}
			}
		}

		//code to map same po numbers together and take their average
		let PO = [];
		let count = [];
		let flag = 0;
		for (let arr of this.data_table1) {
			flag = 0;
			console.log(arr[0], arr[1]);
			if (PO.length) {
				for (let i = 0; i < PO.length; i++) {
					if (PO[i][0] == arr[0]) {
						count[i][1] += 1;
						PO[i][1] += arr[1];

						PO[i][1] = parseInt(PO[i][1]);
						PO[i][1] /= count[i][1];
						flag = 1;
						break;
					}
				}
				if (!flag) {
					PO.push([ arr[0], arr[1] ]);
					count.push([ arr[0], 1 ]);
				}
			} else {
				PO.push([ arr[0], arr[1] ]);
				count.push([ arr[0], 1 ]);
			}
		}
		console.log(PO, count);
		this.data_table1 = PO;
		this.PoAttainmentGraph(this.data_table1);
	}

	PoAttainmentGraph(data_table) {
		this.data1 = {
			chartType: 'ColumnChart',
			dataTable: data_table,
			options: {
				title: 'PO Attainment',
				height: 500,
				hAxis: {
					title: 'Courses'
				},
				vAxis: {
					title: 'PO Attainment Value',
					minValue: 0,
					gridlines: {
						count: 10
					}
				},
				legend: {
					position: 'top',
					alignment: 'end'
				},

				colors: [ '#003300' ],
				bar: {
					groupWidth: '16%'
				}
			}
		};
	}

	onSelect(event) {
		this.downTableCo = 1;
		this.selectedPo = event.column;
		this.visible = false;
		console.log('which column clicked ?', this.selectedPo);
		for (let i = 0; i < this.graphdata_index.length; i++) {
			for (let obj of this.graph_data[i]['po_wise_attainment']) {
				if (this.selectedPo == 'PO' + obj['poNumber'] + '\n' + obj['po_blooms_level']) {
					this.co_detailsArray = obj['Co_details'];
				}
			}
		}
		this.getBloomsLevelGraph(this.co_detailsArray);
		this.updatePOLevel();
		this.updatePONum();
	}

	//gets data for chart2
	getBloomsLevelGraph(graph_data) {
		this.data_table2 = [];
		this.data_table2.push([
			'Blooms levels with mapped COs',
			'Total Attainment'
			//'Direct Attainment',
			//'Indirect Attainment'
		]);
		this.AllCOCourses = [];
		for (let j = 0; j < Math.min(graph_data.length - 1, 3); j++) {
			console.log(j);
			this.AllCOCourses.push(this.graph_data[j]['courseName']);
			this.data_table2.push([
				'CO' +
					graph_data[j]['coNumber'] +
					'\n' +
					this.graph_data[j]['courseName'] +
					'\n\n\n' +
					graph_data[j]['bloomsLevel'],
				graph_data[j]['totalAttainment']
				//graph_data[j]['directAttainment'],
				//graph_data[j]['indirectAttainment']
			]);
		}
		console.log("graph2 data before sort",this.data_table2);
		this.bloomsLevelGraph(this.data_table2);
	}
	COBTClick() {
		let data_table3 = [];
		data_table3.push([ 'Blooms levels with mapped COs', 'Number of Topics' ]);
		console.log('HAI TOH SAHI CONUMBER', this.co_detailsArray);
		for (let i = 0; i < Math.min(this.AllCOCourses.length, 3); i++) {
			data_table3.push([
				'CO' +
					this.co_detailsArray[i]['coNumber'] +
					'\n' +
					this.AllCOCourses[i] +
					'\n\n\n' +
					this.co_detailsArray[i]['bloomsLevel'],
				this.co_detailsArray[i]['num_of_topics']
			]);
		}
		console.log(data_table3);
		this.COBTGraph(data_table3);
	}

	//draw the chart2
	bloomsLevelGraph(data_table) {
		//console.log(data_table);
		this.secondChart = true;
		this.data2 = {
			dataTable: data_table,
			options: {
				title: 'CO Attainment',
				vAxis: {
					title: 'CO Attainment Value',
					minValue: 0,
					gridlines: {
						count: 10
					}
				},

				height: 450,
				width: 1300,
				bar: { groupWidth: '16%' },
				theme: 'material',
				colors: [ '#003300' ],
				legend: {
					position: 'top',
					alignment: 'end'
				},
				textStyle: {
					color: 'black'
				}
			}
		};
	}

	onSelect2(event) {
		this.selectedCo = event.column;
		this.student_detailsArray = [];
		console.log(this.graph_data);
		for (let i = 0; i < this.co_detailsArray.length; i++) {
			for (let j = 0; j < this.graph_data.length; j++) {
				if (
					'CO' +
						this.co_detailsArray[i]['coNumber'] +
						'\n' +
						this.graph_data[j]['courseName'] +
						'\n\n\n' +
						this.co_detailsArray[i]['bloomsLevel'] ==
					this.selectedCo
				) {
					this.downTableCo = this.co_detailsArray[i]['coNumber'];
					this.student_detailsArray.push(this.co_detailsArray[i]['students_wise_attainment']);
				}
			}
		}
		this.updateCOCourse();
		this.updateCOLevel();
		this.updateCONum();
		this.table1 = true;
		console.log('STUDENT DETAILS ARRAY', this.student_detailsArray);
		this.eyeDirClickedFunc(this.student_detailsArray[0]['name'], this.student_detailsArray[0]['usn']);
	}

	//draw the chart3
	COBTGraph(data_table) {
		//console.log(data_table);
		this.secondChart = false;
		this.BTClicked = true;
		this.data3 = {
			dataTable: data_table,
			options: {
				title: 'CO-BT Mapping',
				vAxis: {
					title: 'Number of Tpoics',
					minValue: 0,
					gridlines: {
						count: 10
					}
				},

				height: 450,
				width: 1300,
				bar: { groupWidth: '16%' },
				theme: 'material',
				colors: [ '#003300' ],
				legend: {
					position: 'top',
					alignment: 'end'
				},
				textStyle: {
					color: 'black'
				}
			}
		};
	}

	onBack() {
		if (this.table1) {
			this.secondChart = true;
			this.table1 = false;
		} else if (this.BTClicked) {
			this.secondChart = true;
			this.BTClicked = false;
		} else if (this.secondChart) {
			this.firstChart = true;
			this.secondChart = false;
			this.visible = true;
		}
	}

}
