import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import * as jsondata2 from '../../../assets/analytics-data/nba25-data.json';
import * as jsondata from '../../../assets/analytics-data/nba24-data.json';
import { AnalyticsService } from '../../service/analytics.service';
import { Analytics } from '../../label-externalisation/analytics';

export interface tabrow {
	m1: string;
	mName: string;
	m2: string;
	m3: string;
}

@Component({
	selector: 'app-nba25-table',
	templateUrl: './nba25-table.component.html',
	styleUrls: [ './nba25-table.component.css' ],
	encapsulation: ViewEncapsulation.None
})
export class Nba25TableComponent implements OnInit {
	@Input() CO_DETAILS: any;
	@Input() current_AcadYear;
	@Input() current_terms;
	@Input() subSelected;
	@Input() secSelected;

	md = true;
	login_type: string;
	HOD_Dep: String;
	clickedCO: string;
	clickedCONum: number;
	faculty_ID: string;
	jsonData;
	extra_val: number;
	types = new Array();
	currSelOption: string;
	facData;
	HODData;
	facData2;
	HODData2;
	ques = new Array();
	feedSelOption: string;
	feedCumScore: string;
	counsSelOption: string;
	couns = new Array();
	currCards;
	objFeedTable = new Array();
	objCounsTable = new Array();
	analyticsObj: Analytics = new Analytics();
	displayedColumns: string[] = [ 'mName', 'm1', 'm2', 'm3' ];
	dataSource1 = [];
	dataSource2 = [];

	keyList = [
		this.analyticsObj.desc,
		this.analyticsObj.att,
		this.analyticsObj.attP,
		this.analyticsObj.tot,
		this.analyticsObj.totM
	];

	dirMethDescObj = new Array();
	dirAttObj = new Array();
	dirAttPerObj = new Array();
	dirTotMaxObj = [ '', '', '' ];

	indirMethDescObj = new Array();
	indirAttObj = new Array();
	indirAttPerObj = new Array();
	indirTotMaxObj = [ '' ];

	constructor() {}

	ngOnInit(): void {
		this.dataSource1.push(
			{
				mName: 'Method Description',
				m1: this.CO_DETAILS['direct_methodDescription'][0],
				m2: this.CO_DETAILS['direct_methodDescription'][1],
				m3: this.CO_DETAILS['direct_methodDescription'][2]
			},
			{
				mName: 'Attainment',
				m1: this.CO_DETAILS['direct_attainment'][0],
				m2: this.CO_DETAILS['direct_attainment'][1],
				m3: this.CO_DETAILS['direct_attainment'][2]
			},
			{
				mName: 'Attainment Percentage',
				m1: this.CO_DETAILS['direct_attainmentPercentage'][0],
				m2: this.CO_DETAILS['direct_attainmentPercentage'][1],
				m3: this.CO_DETAILS['direct_attainmentPercentage'][2]
			},
			{
				mName: 'Total Obtained Score',
				m1: this.CO_DETAILS['direct_attainment'][0],
				m2: this.CO_DETAILS['direct_attainment'][1],
				m3: this.CO_DETAILS['direct_attainment'][2]
			},
			{
				mName: 'Total Max. Score',
				m1: '',
				m2: '',
				m3: ''
			}
		);
		this.dataSource2.push(
			{
				mName: 'Method Description',
				m1: this.CO_DETAILS['indirect_methodDescription'][0],
				m2: this.CO_DETAILS['indirect_methodDescription'][1],
				m3: this.CO_DETAILS['indirect_methodDescription'][2]
			},
			{
				mName: 'Attainment',
				m1: this.CO_DETAILS['indirect_attainment'][0],
				m2: this.CO_DETAILS['indirect_attainment'][1],
				m3: this.CO_DETAILS['indirect_attainment'][2]
			},
			{
				mName: 'Attainment Percentage',
				m1: this.CO_DETAILS['indirect_attainmentPercentage'][0],
				m2: this.CO_DETAILS['indirect_attainmentPercentage'][1],
				m3: this.CO_DETAILS['indirect_attainmentPercentage'][2]
			},
			{
				mName: 'Total Obtained Score',
				m1: this.CO_DETAILS['indirect_attainment'][0],
				m2: this.CO_DETAILS['indirect_attainment'][1],
				m3: this.CO_DETAILS['indirect_attainment'][2]
			},
			{
				mName: 'Total Max. Score',
				m1: '',
				m2: '',
				m3: ''
			}
		);

		for (var i in this.CO_DETAILS['direct_methodDescription']) {
			this.dirMethDescObj.push(this.CO_DETAILS['direct_methodDescription'][i]);
		}

		for (var i in this.CO_DETAILS['direct_attainment']) {
			this.dirAttObj.push(this.CO_DETAILS['direct_attainment'][i]);
		}

		for (var i in this.CO_DETAILS['direct_attainment']) {
			this.dirAttPerObj.push(this.CO_DETAILS['direct_attainmentPercentage'][i]);
		}

		for (var i in this.CO_DETAILS['indirect_methodDescription']) {
			this.indirMethDescObj.push(this.CO_DETAILS['indirect_methodDescription'][i]);
		}

		for (var i in this.CO_DETAILS['indirect_attainment']) {
			this.indirAttObj.push(this.CO_DETAILS['indirect_attainment'][i]);
		}

		for (var i in this.CO_DETAILS['indirect_attainment']) {
			this.indirAttPerObj.push(this.CO_DETAILS['indirect_attainmentPercentage'][i]);
		}

		this.clickedCO = this.CO_DETAILS['coNumber'];
		this.login_type = 'Faculty';
		this.HOD_Dep = 'CS';
		this.faculty_ID = '462';
		this.extra_val = 0;
		this.facData = jsondata.default.faculty_data;
		this.HODData = jsondata.default.hod_details;
		this.facData2 = jsondata2.default.faculty_data;
		this.HODData2 = jsondata2.default.hod_details;
		this.currSelInit();
		this.currSelOption = this.types[0];
		this.feedSelInit();
		this.feedSelOption = this.ques[0];
		this.feedSelChange();
		this.fillCurr();
		this.fillFeedTable();
		this.counsSelInit();
		this.counsSelOption = this.couns[0];
		this.fillCounsTable();
	}

	onRadioChange(val) {
		if (this.extra_val == 0) {
			document.getElementById('coCurrBox').style.display = 'block';
			document.getElementById('feedBox').style.display = 'none';
			document.getElementById('counsBox').style.display = 'none';
		} else if (this.extra_val == 1) {
			document.getElementById('coCurrBox').style.display = 'none';
			document.getElementById('feedBox').style.display = 'block';
			document.getElementById('counsBox').style.display = 'none';
		} else if (this.extra_val == 2) {
			document.getElementById('coCurrBox').style.display = 'none';
			document.getElementById('feedBox').style.display = 'none';
			document.getElementById('counsBox').style.display = 'block';
		}
	}

	currSelInit() {
		var data;
		if (this.login_type == 'Faculty') {
			data = this.facData;
		} else {
			data = this.HODData;
		}

		for (var i in data) {
			var obj = data[i];

			if (
				obj.facultyId == this.faculty_ID &&
				this.current_terms.includes(obj.termNumber) &&
				obj.academicYear == this.current_AcadYear &&
				obj.courseName == this.subSelected &&
				obj.section == this.secSelected
			) {
				let coDet = obj['Co-details'];

				for (var j in coDet) {
					var obj2 = coDet[j];
					if (obj2.coNumber == this.clickedCO) {
						var obj3 = obj2.co_curricular_deatails;
						var arr = Object.keys(obj3);
						for (var k in arr) {
							this.types.push(arr[k]);
						}
					}
				}
			}
		}
	}

	feedSelInit() {
		var data;
		if (this.login_type == 'Faculty') {
			data = this.facData;
		} else {
			data = this.HODData;
		}

		for (var i in data) {
			var obj = data[i];
			if (
				obj.facultyId == this.faculty_ID &&
				this.current_terms.includes(obj.termNumber) &&
				obj.academicYear == this.current_AcadYear &&
				obj.courseName == this.subSelected &&
				obj.section == this.secSelected
			) {
				var obj2 = obj.student_feedback_details;
				var arr = Object.keys(obj2);
				for (var k in arr) {
					this.ques.push(arr[k]);
				}
			}
		}
	}

	currSelChange() {
		this.fillCurr();
	}

	feedSelChange() {
		var data;
		if (this.login_type == 'Faculty') {
			data = this.facData;
		} else {
			data = this.HODData;
		}

		for (var i in data) {
			var obj = data[i];
			if (
				obj.facultyId == this.faculty_ID &&
				this.current_terms.includes(obj.termNumber) &&
				obj.academicYear == this.current_AcadYear &&
				obj.courseName == this.subSelected &&
				obj.section == this.secSelected
			) {
				var obj2 = obj.student_feedback_details;
				var obj3 = obj2[this.feedSelOption];
				this.feedCumScore = obj3[0].cumulative_score;
			}
		}
	}

	counsSelChange() {
		this.fillCounsTable();
	}

	fillCurr() {
		var data;
		if (this.login_type == 'Faculty') {
			data = this.facData;
		} else {
			data = this.HODData;
		}

		for (var i in data) {
			var obj = data[i];

			if (
				obj.facultyId == this.faculty_ID &&
				this.current_terms.includes(obj.termNumber) &&
				obj.academicYear == this.current_AcadYear &&
				obj.courseName == this.subSelected &&
				obj.section == this.secSelected
			) {
				var coDet = obj['Co-details'];

				for (var j in coDet) {
					var obj2 = coDet[j];
					if (obj2.coNumber == this.clickedCO) {
						var obj3 = obj2.co_curricular_deatails;
						var obj4 = obj3[this.currSelOption];
						this.currCards = obj4;
					}
				}
			}
		}
		this.fillFeedTable();
	}

	fillFeedTable() {
		this.objFeedTable = [];
		this.feedSelOption;
		var data;
		if (this.login_type == 'Faculty') {
			data = this.facData;
		} else {
			data = this.HODData;
		}

		for (var i in data) {
			var obj = data[i];
			if (
				obj.facultyId == this.faculty_ID &&
				this.current_terms.includes(obj.termNumber) &&
				obj.academicYear == this.current_AcadYear &&
				obj.courseName == this.subSelected &&
				obj.section == this.secSelected
			) {
				var obj2 = obj.student_feedback_details;
				var obj3 = obj2[this.feedSelOption];
				var obj4 = obj3[0].questionwise_details;
				var count = 1;
				for (var j in obj4) {
					var objCurr = obj4[j];
					this.objFeedTable.push({ QN: count + '', score: objCurr.total_score + '' });
					count++;
				}
			}
		}
	}

	fillCounsTable() {
		this.objCounsTable = [];
		var data;
		if (this.login_type == 'Faculty') {
			data = this.facData2;
		} else {
			data = this.HODData2;
		}

		if (this.counsSelOption == 'Select a value') {
			for (var i in data) {
				var obj = data[i];
				if (
					obj.facultyId == this.faculty_ID &&
					this.current_terms.includes(obj.termNumber) &&
					obj.academicYear == this.current_AcadYear &&
					obj.courseName == this.subSelected &&
					obj.section == this.secSelected
				) {
					var obj2 = obj.counselling_details;
					var count = 1;
					for (var j in obj2) {
						var obj3 = obj2[j];
						var obj4 = obj3[0];
						this.objCounsTable.push({
							SI: count + '',
							label: Object.keys(obj2)[count - 1],
							date: obj4.date
						});
						count++;
					}
				}
			}
		} else {
			for (var i in data) {
				var obj = data[i];
				if (
					obj.facultyId == this.faculty_ID &&
					this.current_terms.includes(obj.termNumber) &&
					obj.academicYear == this.current_AcadYear &&
					obj.courseName == this.subSelected &&
					obj.section == this.secSelected
				) {
					var obj2 = obj.counselling_details;
					var obj3 = obj2[this.counsSelOption];
					var count = 1;
					for (var j in obj3) {
						var obj4 = obj3[j];
						this.objCounsTable.push({ SI: count + '', label: this.counsSelOption, date: obj4.date });
						count++;
					}
				}
			}
		}
	}

	counsSelInit() {
		this.couns.push('Select a value');
		var data;
		if (this.login_type == 'Faculty') {
			data = this.facData2;
		} else {
			data = this.HODData2;
		}

		for (var i in data) {
			var obj = data[i];
			if (
				obj.facultyId == this.faculty_ID &&
				this.current_terms.includes(obj.termNumber) &&
				obj.academicYear == this.current_AcadYear &&
				obj.courseName == this.subSelected &&
				obj.section == this.secSelected
			) {
				var obj2 = obj.counselling_details;
				var arr = Object.keys(obj2);
				for (var k in arr) {
					this.couns.push(arr[k]);
				}
			}
		}
	}

	hasProp(o, name) {
		return o.hasOwnProperty(name);
	}
}
