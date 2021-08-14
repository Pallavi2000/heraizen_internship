import { Component, OnInit } from '@angular/core';
import * as jsondata from '../../../assets/analytics-data/nba24-data.json';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AnalyticsService } from '../../service/analytics.service';
import { Analytics } from '../../label-externalisation/analytics';

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
	selector: 'app-nba25-home',
	templateUrl: './nba25-home.component.html',
	styleUrls: [ './nba25-home.component.css' ]
})
export class Nba25HomeComponent implements OnInit {
	averageCo = false;
	averageCoCourseWise = false;
	//form controls
	searchBar: FormGroup;
	termsList = new FormControl();

	//flags
	isPrincipal: number;
	clicked = false;
	error: boolean;

	//data
	acadYears: AcadYears[] = jsondata.default.academicYear; //fetch acadYears
	terms: Terms[] = jsondata.default.terms; //fetch terms
	departments: Departments[] = jsondata.default.departments; //fetch de[partments

	//inputs
	current_AcadYear = this.acadYears[2];
	current_terms = [ '6' ];
	current_department: any;

	analyticsObj: Analytics = new Analytics(); //externalisation object

	constructor(private fb: FormBuilder) {
		this.searchBar = this.fb.group({
			year: [ '2019-20', Validators.required ],
			term: [ [ '' ], Validators.required ]
		});
	}

	ngOnInit(): void {
		this.termsList.setValue([ '6' ]);
		this.isPrincipal = 0;
	}

	//get acad_year
	filter1(data) {
		this.current_AcadYear = data.value;
	}
	//get terms
	filter2(data) {
		this.current_terms = data.value;
	}
	//get departments
	filter3(data) {
		this.current_department = data.value;
	}

	//enable or disable search button
	searchClick() {
		if (this.current_terms.length) {
			this.clicked = true;
		} else {
			alert('Please select atleast one term');
		}
	}
}
