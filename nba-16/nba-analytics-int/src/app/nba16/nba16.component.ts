import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'app/service/analytics.service';
import { Analytics } from 'app/label-externalisation/analytics';
import { GoogleChartInterface } from 'ng2-google-charts';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { RubricsPopupComponent } from './rubrics-popup/rubrics-popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-nba16',
  templateUrl: './nba16.component.html',
  styleUrls: ['./nba16.component.css']
})
export class Nba16Component implements OnInit {
  labels: Analytics = new Analytics();
  academic_year = [];
  terms = [];
  departments = [];
  first_chartdata: GoogleChartInterface;
  rwd_first_chartdata: GoogleChartInterface;
  rwd_second_chartdata: GoogleChartInterface;
  searchDropdown: FormGroup;
  selected_year;
  selected_term;
  selected_faculty:any;
  test_co_details:any;
  final_data = [];
  role = "FACULTY";
  faculty = [];
  searchBar: FormGroup;
  // Boolean Values
  cname: string = 'false';
  avg: string = 'true';
  fname: string = 'false';
  reverse: string = 'true';
  selected = false;
  data2;
  error = false;
  search = true;
  seachEnable = true;
  firstChart = true;

  isClicked: boolean = false;
  displayChart: boolean = false;
  showChart: boolean = false;
  str: string = "";
  show_first_graph: boolean;
  show_second_graph: boolean;
  showAccordion: boolean = false;
  isDisabled: boolean = false;
  isSelected: boolean = false;
  courseCode: any;
  all_faculty_data: any;
  facultyId: string;
  co_details = [];
  course_name = [];
  section = [];
  course_code = [];
  courseType: any;
  SelectedSection: any;
  termNumber: any;
  data_table: any;
  rubric_details: any;
  show_pop_up: boolean;
  hodId: string;
  selected_deptId:string = '';
  totalNumberOfStudents: number;
  faculty_name: any;
  selected_courseName: any;
  selected_coDetails: any;
  rwd_data: any;
  indices: any[] = [];
  wait_to_show_first_graph: boolean;
  wait_to_show_rwd_first_graph: boolean;
  dummy: any;
  dataTable = [];
  second_graph_data = []
  indices2: any[];
  isExpanded: boolean = false;
  selectedCO: any;
  rwd_data_table: any[];
  constructor(private analyticsService: AnalyticsService,
    public dialog: MatDialog, private fb: FormBuilder) {

    this.searchBar = this.fb.group({
      year: ['', Validators.required],
      term: [[''], Validators.required],
      dept: ''
    });
  }

  ngOnInit(): void {
    this.facultyId = '505'
    this.hodId = '492'

    if(this.role == 'FACULTY'){
      this.analyticsService.get_academic_year_for_faculty(this.facultyId).subscribe(data=>{
        this.academic_year = data['faculty_academicYear'][0]['all_academic_year'];
        this.academic_year.sort();
      })
    }
    else if(this.role == 'HOD'){
        this.selected_deptId = 'CS'
        this.analyticsService.get_academic_year_for_hod(this.selected_deptId).subscribe(data=>{
        this.academic_year = data['hod_academicYear'][0]['all_academic_year'];
        this.academic_year.sort();
      })
    }
    else{
      this.analyticsService.get_all_departments().subscribe(data=>{
        console.log(data);
        this.departments = data['departments'];
        this.departments.sort();
        console.log(this.departments)
      })
    }
  }
  postMyCourseGraph(tableData) {
    this.data2 = {
      dataTable: tableData,
      chartType: "ColumnChart",
      options: {
        height: 400,
        hAxis: {
          title: "Blooms levels with mapped COs",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          },
          titleFontSize:'14',
          titleFontName:'Lato'
        },
        vAxis: {
          title: "CO Attainment Value",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          },
          titleFontSize:'14',
          titleFontName:'Lato'
        },
        tooltip : {
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          }
        },
        legend: {
          position: "top",
          alignment: "end",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '14'
          }
        },
        colors: ["#2d8ea7", "#7a9d96", "#bda07d"],
        bar: {
          groupWidth: "25%",
        },
      }
    };
  }

  rwd_postMyCourseGraph(tableData) {
    this.rwd_second_chartdata = {
      dataTable: tableData,
      chartType: "ColumnChart",
      options: {
        height: 400,
        hAxis: {
          title: "Blooms levels with mapped COs",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '11'
          },
          titleFontSize:'12',
          titleFontName:'Lato'
        },
        vAxis: {
          title: "CO Attainment Value",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '11'
          },
          titleFontSize:'12',
          titleFontName:'Lato'
        },
        tooltip : {
          textStyle:{
            fontName: 'Lato', 
            fontSize: '11'
          }
        },
        legend: {
          position: "top",
          alignment: "end",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '12'
          }
        },
        colors: ["#2d8ea7", "#7a9d96", "#bda07d"],
        bar: {
          groupWidth: "25%",
        },
      }
    };
  }

  rwd_courseBarSelect(event) {
    this.sortfunc();
    this.showAccordion = false;
    this.isSelected = true;
    this.isDisabled = false;
    this.show_first_graph = false;
    this.show_second_graph = true;
    this.isClicked = true;
    this.displayChart = !this.displayChart;
    let tableData2 = [];
    this.indices2 = [];
    let graphData = [];
    let table = []
    let string = event.column.split("\n",2);
    this.str = string[1]
    let course_index = []
    console.log(this.str)
    console.log(this.test_co_details)
    console.log(event.row);
    this.test_co_details.forEach(element => {

        for(let j=0;j<element['co_details'].length;j++)
        {
          if(element['co_details'][j].coNumber != null){

            tableData2.push([
              "Blooms levels with mapped COs",
              "Total Attainment",
              { type: 'string', role: 'tooltip' },
              "Direct Attainment",
              { type: 'string', role: 'tooltip' },
              "Indirect Attainment",
              { type: 'string', role: 'tooltip' },
            ]);
      
            let tooltip = 'Total Attainment : ' + element['co_details'][j]['total_attainment'].toFixed(2) + '\n' + 'Direct Attainment : ' + 
            element['co_details'][j]['direct_attainment'].toFixed(2) + '\n' + 'Indirect Attainment : ' + element['co_details'][j]['indirect_attainment'].toFixed(2);
            tableData2.push([
              "CO" + element['co_details'][j]["coNumber"],
              element['co_details'][j]["total_attainment"],
              tooltip,
              element['co_details'][j]["direct_attainment"],
              tooltip,
              element['co_details'][j]["indirect_attainment"],
              tooltip
            ]);
            table.push(tableData2)
            tableData2 = []
          }
         
        }
        this.second_graph_data.push(table)
        table = []
        
      
    });
    console.log(this.second_graph_data);
    this.rwd_postMyCourseGraph(this.second_graph_data)

    for(let i = 0;i < this.course_code.length;i++){
      let st = this.course_code[i] + " - Section " + this.section[i];
      if (st == this.str)
      {
          this.courseCode = this.course_code[i]
          this.SelectedSection = this.section[i];
          this.termNumber = this.test_co_details[i]['termNumber']
          this.selected_courseName = this.course_name[i]
          this.selected_coDetails = this.test_co_details[i]['co_details']
          for(let j = 0;j<this.co_details[i].length;j++){
            if(event.row == this.co_details[i][j]['total_attainment']/3.0 * 100){
              this.selectedCO = this.co_details[i][j]['coNumber'];
              break;
            }
          }
          this.isExpanded = true;
      }
    }
  }

  onSelect_rwd(event,sub){
    this.seachEnable = false;
    this.isDisabled = true;
    this.show_second_graph = false;
    this.showAccordion = true;
    let st = "";
    console.log(event);
    console.log(event.column);
    st = event.column.slice(2, 3);
    console.log(st);
    let index = parseInt(st);
    this.rwd_data_table = []

   
    this.termNumber = sub['termNumber']
    this.SelectedSection = sub['section']
    this.courseCode = sub['courseCode']
    this.courseType = sub['courseType']
    this.selectedCO = index;

    if(this.role == 'FACULTY'){
      this.selected_deptId = 'CS'
    }
    else{
      this.selected_deptId = sub['deptId']
      this.facultyId = sub['facultyId']
    }

    this.analyticsService.get_accordian_table_data_for_faculty(this.selected_year,this.facultyId,this.termNumber,
      this.SelectedSection,this.courseCode,index,this.selected_deptId,this.courseType).subscribe(data=>{
        this.data_table = data['test_co_details'];
        this.totalNumberOfStudents = this.data_table['totalNumberOfStudents']
        console.log(this.data_table)
      })
  }

  courseBarSelect(event) {
    this.sortfunc();
    this.showAccordion = false;
    this.isSelected = true;
    this.isDisabled = false;
    this.show_first_graph = false;
    this.show_second_graph = true;
    this.isClicked = true;
    this.displayChart = !this.displayChart;
    let tableData2 = [];
    let graphData = [];
    let string = event.column.split("\n",2);
    this.str = string[1]
    console.log(this.str)
    tableData2.push([
      "Blooms levels with mapped COs",
      "Total Attainment",
      { type: 'string', role: 'tooltip' },
      "Direct Attainment",
      { type: 'string', role: 'tooltip' },
      "Indirect Attainment",
      { type: 'string', role: 'tooltip' },
    ]);

    for(let i = 0;i < this.course_code.length;i++){
      let st = this.course_code[i] + " - Section " + this.section[i];
      if (st == this.str)
      {
          this.courseCode = this.course_code[i]
          graphData = this.co_details[i]

          this.courseType = this.test_co_details[i]['courseType']
          this.selected_deptId = this.test_co_details[i]['deptId'];
          
          if(this.role != 'FACULTY'){
            this.facultyId = this.test_co_details[i]['facultyId']
            this.faculty_name = this.test_co_details[i]['facultyName']
          }
          
          this.SelectedSection = this.section[i];
          this.termNumber = this.test_co_details[i]['termNumber']
          this.selected_courseName = this.course_name[i]
          this.selected_coDetails = this.test_co_details[i]['co_details']      
      }
    }

    graphData.forEach(e => {
      if(e.coNumber != null){
        let tooltip = 'Total Attainment : ' + e['total_attainment'].toFixed(2) + '\n' + 'Direct Attainment : ' + 
        e['direct_attainment'].toFixed(2) + '\n' + 'Indirect Attainment : ' + e['indirect_attainment'].toFixed(2);
        tableData2.push([
          "CO" + e["coNumber"],
          e["total_attainment"],
          tooltip,
          e["direct_attainment"],
          tooltip,
          e["indirect_attainment"],
          tooltip
        ]);
      }
     
    })
    //call second graph fn
    this.postMyCourseGraph(tableData2);
  }

  onSelect(event) {
    this.seachEnable = false;
    this.isDisabled = true;
    this.show_second_graph = false;
    this.showAccordion = true;
    let st = "";
    console.log(event);
    console.log(event.column);
    st = event.column.slice(2, 3);
    console.log(st);
    let index = parseInt(st);
    this.data_table = []

    this.analyticsService.get_accordian_table_data_for_faculty(this.selected_year,this.facultyId,this.termNumber,
      this.SelectedSection,this.courseCode,index,this.selected_deptId,this.courseType).subscribe(data=>{
        this.data_table = data['test_co_details'];
        this.totalNumberOfStudents = this.data_table['totalNumberOfStudents']
        console.log(this.data_table)
      })
  }

  go_back() {
    this.seachEnable = true;
  }
  useSearchAgain() {
    this.selected = false;
    this.search = true;
    this.seachEnable = true;
    this.test_co_details = [];
    this.show_first_graph = false;
    //this.first_chartdata.dataTable = []
    if(this.searchBar.value.year != '' || this.searchBar.value.dept != ''){
        if(this.role == 'FACULTY'){
        this.analyticsService.get_terms_for_faculty(this.facultyId,this.searchBar.value.year).subscribe(data=>{
          this.terms = data['faculty_terms'][0]['terms'];
          this.terms.sort()
        })
      }
      else if(this.role != 'FACULTY'){
        if(this.role == 'PRINCIPAL' && this.searchBar.value.dept != ''){
          this.analyticsService.get_academic_year_for_hod(this.searchBar.value.dept).subscribe(data=>{
            this.academic_year = data['hod_academicYear'][0]['all_academic_year'];
            this.academic_year.sort();
            this.selected_deptId = this.searchBar.value.dept;
          })
        }
        if(this.selected_deptId != '' && this.searchBar.value.year != ''){
          this.analyticsService.get_terms_for_hod(this.searchBar.value.year,this.selected_deptId).subscribe(data=>{
            this.terms = data['hod_terms'][0]['hod_terms'];
            this.terms.sort()
          })
        }
      }
    }
  }

  drawChart() {
    console.log("chart open")
    this.wait_to_show_first_graph = true;
    this.indices = []
    this.dataTable = []
    this.wait_to_show_rwd_first_graph = true;
    this.show_first_graph = true;
    this.show_second_graph = false;
    this.go_back();
    this.co_details = [];
    this.selected = true;
    this.course_name = [];
    this.section = [];
    this.course_code = [];
    this.test_co_details = []
    this.selected_term = this.searchBar.value.term;
    this.selected_year = this.searchBar.value.year;
    console.log(this.test_co_details)
    if (this.role == 'FACULTY') 
    {
        this.analyticsService.get_co_details_of_faculty(this.facultyId,this.selected_year,this.selected_term).subscribe(data=>{
        console.log(this.selected_term)
        this.test_co_details = data['course_outcomes_faculty'];
        console.log(this.test_co_details)
        this.setFirstChartData() 
        this.draw_rwd_chart();
     })
    }
    else
    {
        this.analyticsService.get_co_details_of_dept_courses(this.selected_year,this.selected_term,this.selected_deptId).subscribe(data=>{
        console.log(this.selected_term)
        this.test_co_details = data['cos_of_courses_of_dept'];
        this.setFirstChartData() 
        this.draw_rwd_chart()
     })
    }   
  }

  draw_rwd_chart(){  
    this.indices = []
    for (let i = 0; i < this.co_details.length; i++) {
      this.rwd_data = [];
      this.rwd_data.push(["Courses","CO1", { type: 'string', role: 'tooltip' },
      "CO2", { type: 'string', role: 'tooltip' },
      "CO3", { type: 'string', role: 'tooltip' },
      "CO4", { type: 'string', role: 'tooltip' },
      "CO5", { type: 'string', role: 'tooltip' }]);
  
        let limit = this.co_details[i].length 
        let tooltip = 'Total Attainment : '
    
        while(limit < 5){
          limit += 1
          this.co_details[i].push({"coNumber":null,"total_attainment":null})
        }
  
        let data = '';
        for(let j=0;j<this.co_details[i].length;j++){
          if(this.co_details[i][j]['coNumber'] != null){
            data += "CO" + this.co_details[i][j]["coNumber"] + " "
            tooltip += "\nCO" + this.co_details[i][j]['coNumber'] + " : " + ((this.co_details[i][j]["total_attainment"]/3.0)*100).toFixed(2)
          }
          else{
            data += ''
            //this.co_details[i][j]['coNumber'] = this.co_details[i][j]['total_attainment'] = null;
          }
        }

          //tooltip += '\nCourse Name : ' + this.course_name[i]
          this.rwd_data.push([data + "\n" +
          this.course_code[i] + " - Section " + this.section[i],
        ((this.co_details[i][0]["total_attainment"]/3.0)*100), tooltip,
        ((this.co_details[i][1]["total_attainment"]/3.0)*100), tooltip,
        ((this.co_details[i][2]["total_attainment"]/3.0)*100), tooltip,
        ((this.co_details[i][3]["total_attainment"]/3.0)*100), tooltip,
        ((this.co_details[i][4]["total_attainment"]/3.0)*100), tooltip])
  
        
        this.indices.push(i)
        this.dataTable.push(this.rwd_data);
      }
      this.rwd_setChart(this.dataTable)
  
      
    }

  setFirstChartData(){
    let bool;
    this.final_data = [];
    this.rwd_data = [];
    this.test_co_details.sort((n1,n2)=>{
      if(n1.average_co_attainments >= n2.average_co_attainments){
        return -1
      }
      if(n1.average_co_attainments < n2.average_co_attainments){
        return 1
      }
    })

    this.test_co_details.forEach(subject=>{
      this.co_details.push(subject['co_details']);
      this.course_name.push(subject['courseName']);
      this.section.push(subject['section']);
      this.course_code.push(subject['courseCode']);
      bool = true;
    })

    //this.wait_to_show_rwd_first_graph = true;
    if (bool != true) {
      this.error = true;
    }

    this.final_data.push(["Courses","CO1", { type: 'string', role: 'tooltip' },
      "CO2", { type: 'string', role: 'tooltip' },
      "CO3", { type: 'string', role: 'tooltip' },
      "CO4", { type: 'string', role: 'tooltip' },
      "CO5", { type: 'string', role: 'tooltip' }]);

    for (let i = 0; i < this.co_details.length; i++) {
      let limit = this.co_details[i].length 
      let tooltip = 'Total Attainment : '

      while(limit < 5){
        limit += 1
        this.co_details[i].push({"coNumber":null,"total_attainment":null})
      }

      let data = '';
      for(let j=0;j<this.co_details[i].length;j++){
        if(this.co_details[i][j]['coNumber'] != null){
          data += "CO" + this.co_details[i][j]["coNumber"] + " "
          tooltip += "\nCO" + this.co_details[i][j]['coNumber'] + " : " + ((this.co_details[i][j]["total_attainment"]/3.0)*100).toFixed(2)
        }
        else{
          data += ''
        }
      }

      data = data.slice(0,-1);
      //tooltip += '\nCourse Name : ' + this.course_name[i]

      this.final_data.push([data + "\n" +
        this.course_code[i] + " - Section " + this.section[i],
      ((this.co_details[i][0]["total_attainment"]/3.0)*100), tooltip,
      ((this.co_details[i][1]["total_attainment"]/3.0)*100), tooltip,
      ((this.co_details[i][2]["total_attainment"]/3.0)*100), tooltip,
      ((this.co_details[i][3]["total_attainment"]/3.0)*100), tooltip,
      ((this.co_details[i][4]["total_attainment"]/3.0)*100), tooltip]);
    }
    if(this.co_details.length < 5){
      this.setMiniChart(this.final_data)
    }
    else{
      this.setChart(this.final_data);
    }
    
  }

  setChart(dataTable) {
    this.wait_to_show_first_graph = false;
    this.first_chartdata =
    {
      chartType: "ColumnChart",
      dataTable: dataTable,
      options: {
        height: 400,
        width: 2500,
        hAxis: {
          title: "Courses",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          },
          titleFontSize:'14',
          titleFontName:'Lato'
        },
        bar: {
          groupWidth: "78%",
        },
        vAxis: {
          title: "Total CO Attainment Percentage",
          minValue:0,
          maxValue:100,
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          },
          titleFontSize:'14',
          titleFontName:'Lato'
        },
        tooltip : {
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          }
        },
        legend: {
          position: "top",
          alignment: "end",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '14'
          }
        },
        colors:["#23543E","#70AB91","#AFAEA1","#726F62","#4A7562"],
      }
    };
  }

  setMiniChart(dataTable){
    this.wait_to_show_first_graph = false;
    this.first_chartdata =
    {
      chartType: "ColumnChart",
      dataTable: dataTable,
      options: {
        height: 400,
        hAxis: {
          title: "Courses",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          },
          titleFontSize:'14',
          titleFontName:'Lato'
        },
        bar: {
          groupWidth: "58%",
        },
        vAxis: {
          title: "Total CO Attainment Percentage",
          minValue:0,
          maxValue:100,
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          },
          titleFontSize:'14',
          titleFontName:'Lato'
        },
        tooltip : {
          textStyle:{
            fontName: 'Lato', 
            fontSize: '13'
          }
        },
        legend: {
          position: "top",
          alignment: "end",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '14'
          }
        },
        colors:["#23543E","#70AB91","#AFAEA1","#726F62","#4A7562"],
      }
    };
  }
  rwd_setChart(data) {
    this.wait_to_show_rwd_first_graph = false;
    console.log(data)
    console.log("Chart")
    this.rwd_first_chartdata =
    {
      chartType: "ColumnChart",
      dataTable: data,
      options: {
        height: 400,
        hAxis: {
          title: "Courses",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '11'
          },
          titleFontSize:'12',
          titleFontName:'Lato'
        },
        bar: {
          groupWidth: "65%",
        },
        vAxis: {
          title: "Total CO Attainment Percentage",
          minValue:0,
          maxValue:100,
          textStyle:{
            fontName: 'Lato', 
            fontSize: '11'
          },
          titleFontSize:'12',
          titleFontName:'Lato'
        },
        tooltip : {
          textStyle:{
            fontName: 'Lato', 
            fontSize: '11'
          }
        },
        legend: {
          position: "top",
          alignment: "end",
          textStyle:{
            fontName: 'Lato', 
            fontSize: '12'
          }
        },
        colors:["#23543E","#70AB91","#AFAEA1","#726F62","#4A7562"],
      }
    };
    console.log(this.rwd_first_chartdata)
  }

  // Sorting Functions Starts Here
  // Course Sorting
  comparatorCourseRev(a, b) {
    if (a['courseCode'] < b['courseCode']) return 1;
    if (a['courseCode'] > b['courseCode']) return -1;
    return 0;
  }
  comparatorCourse(a, b) {
    if (a['courseCode'] < b['courseCode']) return -1;
    if (a['courseCode'] > b['courseCode']) return 1;
    return 0;
  }

  // CO Average Sorting
  comparatorCOAvgRev(a, b) {
    if (a['average_co_attainments'] < b['average_co_attainments']) return 1;
    if (a['average_co_attainments'] > b['average_co_attainments']) return -1;
    return 0;
  }
  comparatorCOAvg(a, b) {
    if (a['average_co_attainments'] < b['average_co_attainments']) return -1;
    if (a['average_co_attainments'] > b['average_co_attainments']) return 1;
    return 0;
  }

  // Facutly Sorting
  comparatorFacultyRev(a, b) {
    if (a['facultyName'] < b['facultyName']) return 1;
    if (a['facultyName'] > b['facultyName']) return -1;
    return 0;
  }
  comparatorFaculty(a, b) {
    if (a['facultyName'] < b['facultyName']) return -1;
    if (a['facultyName'] > b['facultyName']) return 1;
    return 0;
  }

  sortfunc() {
    if (this.cname == 'true') {
      if (this.reverse == 'true') {
        this.test_co_details.sort(this.comparatorCourseRev);
      }
      else {
        this.test_co_details.sort(this.comparatorCourse);
      }
    }

    else if (this.avg == 'true') {
      if (this.reverse == 'true') {
        this.test_co_details.sort(this.comparatorCOAvgRev);
      }
      else {
        this.test_co_details.sort(this.comparatorCOAvg);
      }
    }
    else if (this.fname == 'true' && this.role !== 'FACULTY') {
      if (this.reverse == 'true') {
        this.test_co_details.sort(this.comparatorFacultyRev);
      }
      else {
        this.test_co_details.sort(this.comparatorFaculty);
      }
    }
  }

  courseSelect(i,sub) {
    let coDetails = [];
    let tableData = [];
    this.courseCode = sub['courseCode'];
    coDetails = this.co_details[i];
    this.courseType = sub['courseType']
    this.selected_deptId = sub['deptId'];
    this.SelectedSection = sub['section'];
    this.termNumber = sub['termNumber']
    this.selected_courseName = sub['courseName']
    this.selected_coDetails = sub['co_details']
    tableData.push([
      "Blooms levels with mapped COs",
      "Total Attainment",
      { type: 'string', role: 'tooltip' },
      "Direct Attainment",
      { type: 'string', role: 'tooltip' },
      "Indirect Attainment",
      { type: 'string', role: 'tooltip' },
    ]);
    for (let j = 0; j < coDetails.length; j++) {
      if(coDetails[j]['coNumber'] != null){
        let tooltip = 'Total Attainment : ' + coDetails[j]['total_attainment'].toFixed(2) + '\n' + 'Direct Attainment : ' + 
        coDetails[j]['direct_attainment'].toFixed(2) + '\n' + 'Indirect Attainment : ' + coDetails[j]['indirect_attainment'].toFixed(2);
      tableData.push([
        "CO" + coDetails[j]["coNumber"],
        coDetails[j]["total_attainment"],
        tooltip,
        coDetails[j]["direct_attainment"],
        tooltip,
        coDetails[j]["indirect_attainment"],
        tooltip
      ]);
    }
    }
    if(this.role !== 'FACULTY'){
      this.faculty_name = sub['facultyName'];
      this.facultyId = sub['facultyId'];
    }
    this.postMyCourseGraph(tableData);
  }

  // Sorting Functions Ends Here
  rubricsPopup(): void {
    this.analyticsService.get_rubric_detail_of_faculty(this.selected_year,this.selected_deptId,this.courseType).subscribe((data) => {
      console.log(data)
      console.log(this.selected_deptId)
      this.rubric_details = data['rubric_detail'][0]['subGenericAttainmentConfigurationList']
      
      this.rubric_details['courseCode'] = this.courseCode
      this.rubric_details['courseName'] = this.selected_courseName
      this.rubric_details['rwd_screen'] = false
      console.log(this.rubric_details)
      const dialogRef = this.dialog.open(RubricsPopupComponent, {
        width: "750px",
        height: "510px",
        data:{ comp:this.rubric_details},
        disableClose: true,
      });
      //this.update_positionOf_rubric()
      dialogRef.afterClosed().subscribe((result) => {
      });
    })
  }

  rwdRubricsPopup(): void {
    this.analyticsService.get_rubric_detail_of_faculty(this.selected_year,this.selected_deptId,this.courseType).subscribe((data) => {
      console.log(data)
      console.log(this.selected_deptId)
      this.rubric_details = data['rubric_detail'][0]['subGenericAttainmentConfigurationList']
      this.rubric_details['courseCode'] = this.courseCode
      this.rubric_details['courseName'] = this.selected_courseName
      this.rubric_details['rwd_screen'] = true;
      const dialogRef = this.dialog.open(RubricsPopupComponent, {
        width: "290px",
        height: "450px",
        data:{ comp:this.rubric_details},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
      });
    })
  }
}
