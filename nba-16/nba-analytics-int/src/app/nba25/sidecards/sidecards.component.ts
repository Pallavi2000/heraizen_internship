import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostListener } from '@angular/core';
import * as jsondata from '../../../assets/analytics-data/nba24-data.json';
import { AnalyticsService } from '../../service/analytics.service';
import { Analytics } from '../../label-externalisation/analytics';

@Component({
	selector: 'app-sidecards',
	templateUrl: './sidecards.component.html',
	styleUrls: [ './sidecards.component.css' ]
})
export class SidecardsComponent implements OnInit {
	@Output() changed_card = new EventEmitter<Object>();
	@Output() changed_radio = new EventEmitter<Object>();

	//declaring variable some of it are necessary others are assumption for given input
	login_type: string; //assumption variable for the type of ser logged in i.e. faculty,HOD,Principal
	HOD_Dep: String; //assumption variable for the HOD's department if login_type is HOD
	@Input() subSelected: string; //assumption variable for the subject name clicked on the previous page
	@Input() secSelected: string; //assumption variable for the subject section clicked on the previous page
	faculty_ID: string; //assumption variable for the faculty ID
	radio_val: number; //necessary variable,dont replace. double binded to the sort-by radio buttons
	hilo_val: number; //necessary variable,dont replace. double binded to the high-low radio buttons
	jsonData; //assumption variable which contains the provided sample json data
	@Input() acadYear: string; //assumption variable for the academic year selected in the top selection box
	@Input() terms: any; //assumption variable for the term selected in the top selection box
	currActiveCard: string; //necessary variable,dont replace.stores the id of the currently active card
	currActiveContent: string; //necessary variable,dont replace.stores the id of the currently active card's text
	id2: string; //necessary variable,dont replace.stores the id of the currently active card, text
	cardObjs = new Array(); //stores all the subject that matches the conditions
	numArr = [
		'none',
		'1-10',
		'11-20',
		'21-30',
		'31-40',
		'41-50',
		'51-60',
		'61-70',
		'71-80',
		'81-90',
		'91-100',
		'101-110',
		'111-120',
		'121-130',
		'131-140',
		'141-150',
		'151-160',
		'161-170',
		'171-180',
		'181-190',
		'191-200'
	];
	//stores the selection box's possible options assuming that there can never be more than 200 subject satisfying the selection criteria
	selArr = new Array(); //stores the selection box's currently display option based on the number of satisfying subjects
	selectedPage: string; //stores the currently selected option in the number of entries selection box
	currCardObjs = new Array(); //stores the 10 visible cards which are displayed based on the number of entries page selection
	analyticsObj: Analytics = new Analytics();

	constructor() {}

	ngOnInit(): void {
		this.jsonData = jsondata.default;
		this.hilo_val = 0; //initializing a necessary variable.change this if u want to change the default selected high-low sort order on page load
		this.radio_val = 0; //initializing a necessary variable.change this if u want to change the default selected sort-by criteria on page load
		this.selectedPage = this.numArr[1]; //initializing the number of entries select box

		/*temporary initialization for assuming input data*/
		this.login_type = 'Faculty';
		this.HOD_Dep = 'CS';
		this.faculty_ID = '462';

		if (window.matchMedia('(max-width: 700px)').matches) {
			//smaller screen
			document.getElementById('sort-radio0').classList.add('form-check-inline');
			document.getElementById('sort-radio1').classList.add('form-check-inline');
			document.getElementById('sort-radio2').style.display = 'none';
			document.getElementById('hiloBox0').classList.add('form-check-inline');
			document.getElementById('hiloBox1').classList.add('form-check-inline');
		} else {
			//bigger screen
			document.getElementById('sort-radio0').classList.remove('form-check-inline');
			document.getElementById('sort-radio1').classList.remove('form-check-inline');
			document.getElementById('sort-radio2').style.display = 'block';
			document.getElementById('hiloBox0').classList.remove('form-check-inline');
			document.getElementById('hiloBox1').classList.remove('form-check-inline');
		}

		if (this.login_type == 'Faculty') document.getElementById('sort-radio2').style.display = 'none';
		if (this.login_type == 'HOD') document.getElementById('sort-radio2').style.display = 'block';
		if (this.login_type == 'Principal') document.getElementById('sort-radio2').style.display = 'block';

		this.cardInit();
		this.selectInit();
	}

	ngAfterViewInit() {
		document.getElementById(this.currActiveContent).classList.add('content-active');
	}

	@HostListener('window:resize') //implementing RWD in case the page size changes after loading
	onWindowResize() {
		if (window.matchMedia('(max-width: 700px)').matches) {
			//smaller screen
			if (this.radio_val == 2) this.radio_val = 0;
			document.getElementById('sort-radio0').classList.add('form-check-inline');
			document.getElementById('sort-radio1').classList.add('form-check-inline');
			document.getElementById('sort-radio2').style.display = 'none';
			document.getElementById('hiloBox0').classList.add('form-check-inline');
			document.getElementById('hiloBox1').classList.add('form-check-inline');

			if (this.login_type == 'Faculty') document.getElementById('sort-radio2').style.display = 'none';
		} else {
			//bigger screen
			document.getElementById('sort-radio0').classList.remove('form-check-inline');
			document.getElementById('sort-radio1').classList.remove('form-check-inline');
			document.getElementById('sort-radio2').style.display = 'block';
			document.getElementById('hiloBox0').classList.remove('form-check-inline');
			document.getElementById('hiloBox1').classList.remove('form-check-inline');

			if (this.login_type == 'Faculty') document.getElementById('sort-radio2').style.display = 'none';
			if (this.login_type == 'HOD') document.getElementById('sort-radio2').style.display = 'block';
			if (this.login_type == 'Principal') document.getElementById('sort-radio2').style.display = 'block';
		}
	}

	onSortRadioChange(val) {
		let newObj = {};
		newObj['hilo_val'] = this.hilo_val;
		newObj['radio_val'] = this.radio_val;
		console.log(newObj);
		this.changed_radio.emit(newObj);

		if (this.radio_val == 0) {
			if (this.hilo_val == 0) this.currCardObjs.sort(this.compareValues('average_attainment', 'desc'));
			else if (this.hilo_val == 1) this.currCardObjs.sort(this.compareValues('average_attainment'));
		} else if (this.radio_val == 1) {
			if (this.hilo_val == 0) this.currCardObjs.sort(this.compareValues('courseName', 'desc'));
			else if (this.hilo_val == 1) this.currCardObjs.sort(this.compareValues('courseName'));
		} else if (this.radio_val == 2) {
			if (this.hilo_val == 0) this.currCardObjs.sort(this.compareValues('facName', 'desc'));
			else if (this.hilo_val == 1) this.currCardObjs.sort(this.compareValues('facName'));
		}
	}

	onHiloRadioChange(val) {
		let newObj = {};
		newObj['hilo_val'] = this.hilo_val;
		newObj['radio_val'] = this.radio_val;
		console.log(newObj);
		this.changed_radio.emit(newObj);

		if (this.hilo_val == 0) {
			if (this.radio_val == 0) this.currCardObjs.sort(this.compareValues('average_attainment', 'desc'));
			else if (this.radio_val == 1) this.currCardObjs.sort(this.compareValues('courseName', 'desc'));
			else if (this.radio_val == 2) this.currCardObjs.sort(this.compareValues('facName', 'desc'));
		} else {
			if (this.radio_val == 0) this.currCardObjs.sort(this.compareValues('average_attainment'));
			else if (this.radio_val == 1) this.currCardObjs.sort(this.compareValues('courseName'));
			else if (this.radio_val == 2) this.currCardObjs.sort(this.compareValues('facName'));
		}
	}

	onSortRadioChangeTotal(
		val //sorts cards after the sort bvy criteria has been changed
	) {
		if (this.radio_val == 0) {
			if (this.hilo_val == 0) this.cardObjs.sort(this.compareValues('average_attainment', 'desc'));
			else if (this.hilo_val == 1) this.cardObjs.sort(this.compareValues('average_attainment'));
		} else if (this.radio_val == 1) {
			if (this.hilo_val == 0) this.cardObjs.sort(this.compareValues('courseName', 'desc'));
			else if (this.hilo_val == 1) this.cardObjs.sort(this.compareValues('courseName'));
		} else if (this.radio_val == 2) {
			if (this.hilo_val == 0) this.cardObjs.sort(this.compareValues('facName', 'desc'));
			else if (this.hilo_val == 1) this.cardObjs.sort(this.compareValues('facName'));
		}
	}

	onHiloRadioChangeTotal(
		val //sorts cards after the high-low criteria has been changed
	) {
		if (this.hilo_val == 0) {
			if (this.radio_val == 0) this.cardObjs.sort(this.compareValues('average_attainment', 'desc'));
			else if (this.radio_val == 1) this.cardObjs.sort(this.compareValues('courseName', 'desc'));
			else if (this.radio_val == 2) this.cardObjs.sort(this.compareValues('facName', 'desc'));
		} else {
			if (this.radio_val == 0) this.cardObjs.sort(this.compareValues('average_attainment'));
			else if (this.radio_val == 1) this.cardObjs.sort(this.compareValues('courseName'));
			else if (this.radio_val == 2) this.cardObjs.sort(this.compareValues('facName'));
		}
	}

	cardInit() //initializes the card to be displayed based on the login type
	{
		if (this.login_type == 'Faculty') this.cardInitFaculty();
		else if (this.login_type == 'HOD') this.cardInitHOD();
		else if (this.login_type == 'Principal') this.cardInitPrincipal();
	}

	cardInitFaculty() {
		console.log('subSelected', this.subSelected);
		console.log('secSelected', this.secSelected);
		console.log('terms', this.terms);
		console.log('acadYear', this.acadYear);
		var facDet = this.jsonData.faculty_data;

		for (var i in facDet) {
			var obj = facDet[i];
			console.log('obj', obj);
			if (
				obj.facultyId == this.faculty_ID &&
				this.terms.includes(obj.termNumber) &&
				obj.academicYear == this.acadYear
			)
				this.cardObjs.push(obj);
		}

		console.log('cardObjs', this.cardObjs);
		for (var j in this.cardObjs) {
			this.cardObjs[j].facName = this.getFacName(this.cardObjs[j].facultyId);
		}
		
		this.cardObjs.sort(this.compareValues('average_attainment', 'desc'));
		this.updateCurrCardObjs();
	}

	cardInitHOD() //card initialisation if the login type is HOD
	{
		var hodDet = this.jsonData.hod_details;
		for (var i in hodDet) {
			var obj = hodDet[i];
			if (obj.deptId == this.HOD_Dep && this.terms.includes(obj.termNumber) && obj.academicYear == this.acadYear)
				this.cardObjs.push(obj);
		}

		for (var j in this.cardObjs) {
			this.cardObjs[j].facName = this.getFacName(this.cardObjs[j].facultyId);
		}

		this.cardObjs.sort(this.compareValues('average_attainment', 'desc'));
		this.updateCurrCardObjs();
	}

	cardInitPrincipal() //card initialisation if the login type is principal
	{
		var priDet = this.jsonData.hod_details;
		for (var i in priDet) {
			var obj = priDet[i];
			if (this.terms.includes(obj.termNumber) && obj.academicYear == this.acadYear) this.cardObjs.push(obj);
		}

		for (var j in this.cardObjs) {
			this.cardObjs[j].facName = this.getFacName(this.cardObjs[j].facultyId);
		}

		this.cardObjs.sort(this.compareValues('average_attainment', 'desc'));
		this.updateCurrCardObjs();
	}

	getFacName(
		askId //gets the name of the faculty from the faculty id
	) {
		var HODDet = this.jsonData.hod_details;
		var count = 0;
		for (var i in HODDet) {
			if (count == 0) {
				count++;
				continue;
			}

			var obj = HODDet[i];
			var id = obj.facultyId;
			var name = obj.facultyName;
			if (askId == id) return name;
			count++;
		}
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

	selectInit() //initializes the number of entries select box
	{
		var len = this.cardObjs.length;
		var c = len / 10;
		c = Math.floor(c);
		for (let i = 0; i <= c + 1; i++) {
			this.selArr.push(this.numArr[i]);
		}
	}

	changePage() //updates the currently displaying cards if nuber of entries is changed
	{
		this.updateCurrCardObjs();
	}

	updateCurrCardObjs() {
		if (this.selectedPage == this.numArr[0]) {
			this.currCardObjs = [];
		} else {
			var index = this.selectedPage.indexOf('-');
			var start = this.selectedPage.substring(0, index);
			this.currCardObjs = [];
			var startIndex = parseInt(start, 10);
			startIndex--;
			this.onSortRadioChangeTotal(0);
			for (let i = startIndex; i < startIndex + 10; i++) {
				if (i >= this.cardObjs.length) break;
				this.currCardObjs.push(this.cardObjs[i]);
			}

			this.onSortRadioChange(0);
		}
	}

	checkAddActive(obj, i) {
		var id = 'card' + i;
		this.id2 = '' + i; //danger

		if (obj.courseName == this.subSelected && obj.section == this.secSelected) {
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
		this.subSelected = obj.courseName;
		this.secSelected = obj.section;
		let newObj = {};
		newObj['changed_subSelected'] = this.subSelected;
		newObj['changed_secSelected'] = this.secSelected;
		this.changed_card.emit(newObj);
	}
}
