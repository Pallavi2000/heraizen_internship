import { faculty_data } from './../../shared/models/faculty.model';
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../service/analytics.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectModule } from '@angular/material';
import { ChartDirective } from '@vrushalisoft/googlechart';
import { isProtractorLocator } from 'protractor/built/locators';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { number } from '@amcharts/amcharts4/core';

import { GoogleChartInterface } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-co-scores',
  templateUrl: './co-scores.component.html',
  styleUrls: ['./co-scores.component.css']
})
export class CoScoresComponent implements OnInit {
  public  co_graph: GoogleChartInterface;
  public  fa_graph: GoogleChartInterface;

  allJsonData: any[];
  selection_data: any[];
  graph_data: any = [];

  searchBar: FormGroup;

  academicYears = []
  terms = []
  departments = []
  designation = []
  firstSearch = true;

  clickedYear = null;
  clickedTerm = null;
  clickedDept = null;
  clickedDes = null;
  first_student_chart_alt: boolean = true;
  first_student_chart: boolean = true;
  student_course_data;
  isClicked = false;
  isClickOnFaculty = true;
  isClickOnStudent = false;
  defaultEntryNo="1-10"
  currentusn:any;
  cardData:any = []

  faculty_data = [];
  faculty_data2;
  course_data;
  student_data;
  faculty_codata;
  fac_co_data;
  blooms = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"]
  bloom_data: any[] = [];
  analyze: any[] = [];
  apply: any[] = [];
  create: any[] = [];
  evaluate: any[] = [];
  remember: any[] = [];
  understand: any[] = [];
  sortAsec=true;
  // fa_graph;
  current_course;
  chartdata;
  temp:any;
  sortfac:true;
  student_data_table;
  student_name;
  student_data_chart;
  tabletemp:any;
  displayedColumns:any;
  tableEnable=false;
  checkempty:boolean=false;
  is_course_selected = false ;
  is_faculty_selected = true;
  course_selected;
  first_faculty_graph = true;
  second_faculty_graph = false;
  course_data_data ;
  course;
  faculty;
  faculty_name;
  faculty_id;
  course_name;
  bloom_level;


  constructor(
    private form: FormBuilder,
    private data_service: AnalyticsService
  ) {
    this.searchBar = this.form.group({
      year: ["2018-19", Validators.required],
      dept: ["CS", Validators.required],
      term: [1, Validators.required],
      des: ["Professor", Validators.required]
    });
  }

  ngOnInit(): void {
    this.isClicked = false
    this.data_service.nba22AData().subscribe(data => {
      this.allJsonData = data;
    })
    this.selection_details()

    this.data_service.nba22AGraphData().subscribe(data => {
      this.graph_data = data;
    })
    this.data_service.nba22AStudentData().subscribe(data => {
      this.student_data = data["average_attainment_scores"];
    })
  }
  selection_details() {
    this.data_service.nba22ASelData().subscribe(datasel => {
      this.selection_data = datasel["faculty_data"];
      this.academicYears = datasel["academic_year"]
      this.terms = datasel["semester"]
      this.departments = datasel["dept_id"]
      this.designation = datasel["designatin"]
    })
  }

  setToggleF () {
      this.isClickOnFaculty = true;
      this.isClickOnStudent = false;
  }

  setToggleS () {
    this.isClickOnFaculty = false;
    this.isClickOnStudent = true;
  }
  submit() {
    this.test();
    this.isClicked = true;
    this.firstSearch = false
    this.clickedYear = this.searchBar.value.year;
    this.clickedDept = this.searchBar.value.dept;
    this.clickedTerm = this.searchBar.value.term;
    this.clickedDes = this.searchBar.value.des;
    this.cardData = [];
    this.student_data_table = [];
    this.temp=[];
    for(let i = 0 ;i<this.allJsonData.length;i++)

    {
      this.temp=this.allJsonData[i];
      if(this.temp["academic_year"]==this.clickedYear &&  
          this.temp["semester"]==this.clickedTerm && 
            this.temp["dept_id"]==this.clickedDept &&
              this.temp["designation"]==this.clickedDes) 
      {
         this.cardData.push(this.temp)
      }
      if(this.cardData.length==0)
        this.checkempty=true;
      else
        this.checkempty=false;
    }
    for(let i = 0; i<this.student_data.length; i++)
    {
      if(this.student_data[i]["academic_year"] == this.clickedYear && this.student_data[i]["semester"] == this.clickedTerm && this.student_data[i]["dept_id"] == this.clickedDept )
      this.student_data_table.push(this.student_data[i]["student_data"]);
    }
    this.student_data_table = this.student_data_table[0];
    console.log(this.student_data_table);
  }
  dosort(value:boolean)
  {
    this.sortAsec = value
    if(this.sortfac)
      this.sortbyFaculty();
    else
      this.sortbybloom();
  }
  
  sortbyFaculty()
  {
      if(this.sortAsec)
        this.cardData.sort(this.FacultyAsec);
      else
        this.cardData.sort(this.FacultyDesc);
  }
  FacultyAsec(a, b) 
  {
      if (a['faculty_name'] > b['faculty_name'])
        return 1;
      if (a['faculty_name'] < b['faculty_name'])
        return -1;
      return 0;
  }
  FacultyDesc(a, b) 
  {
      if (a['faculty_name'] > b['faculty_name'])
        return -1;
      if (a['faculty_name'] < b['faculty_name'])
        return 1;
      return 0;
  }

  sortbybloom()
  {
    if(this.sortAsec)
      this.cardData.sort(this.BloomAsec);
    else
      this.cardData.sort(this.BloomDesc);
  }

  BloomAsec(a, b) 
  {
      if (a['faculty_name'] > b['faculty_name'])
        return 1;
      if (a['faculty_name'] < b['faculty_name'])
        return -1;
      return 0;
  }
  BloomDesc(a, b) 
  {
      if (a['faculty_name'] > b['faculty_name'])
        return -1;
      if (a['faculty_name'] < b['faculty_name'])
        return 1;
      return 0;
  }


  test() {
    this.getCourseData(0, 1);
    this.getFacultyData(0);
  }

  tests() {
  }

  fill(data) {
    this.analyze = []
    this.apply = [];
    this.create = [];
    this.evaluate = [];
    this.remember = [];
    this.understand = [];

    for (let i = 0; i < data['Analyze'].length; i++) {
      this.analyze.push(data['Analyze'][i])
    }
    for (let i = 0; i < data['Apply'].length; i++) {
      this.apply.push(data['Apply'][i])
    }
    for (let i = 0; i < data['Create'].length; i++) {
      this.create.push(data['Create'][i])
    }
    for (let i = 0; i < data['Evaluate'].length; i++) {
      this.evaluate.push(data['Evaluate'][i])
    }
    for (let i = 0; i < data['Remember'].length; i++) {
      this.remember.push(data['Remember'][i])
    }
    for (let i = 0; i < data['Understand'].length; i++) {
      this.understand.push(data['Understand'][i])
    }
  }
  getFacultyData(i) {
    this.is_course_selected = false ;
    this.is_faculty_selected = true;
    let codata = []
    this.faculty = [];
    codata.push(this.graph_data[i]);
    this.faculty = i;
    
    this.faculty_data = codata;
    this.faculty_name = this.faculty_data[0].faculty_name
    this.faculty_id = this.faculty_data[0].faculty_id
    this.faculty_codata = this.faculty_data[0].blooms_wise_data
    this.FacultyGraph(this.faculty_codata[0])
  }

  FacultyGraph(data){
    this.fill(data)
    let codata = []
    codata.push(["Bloom's level", 
    {label: 'Course 1 CO Attainment Value', type: 'number'}, 
    {label: 'Course 2 CO Attainment Value', type: 'number'},  
    {label: 'Course 3 CO Attainment Value', type: 'number'}, 
    {label: 'Course 4 CO Attainment Value', type: 'number'},
     {label: 'Course 5 CO Attainment Value', type: 'number'},
    {label: 'Course 6 CO Attainment Value', type: 'number'},
    {label: 'Course 7 CO Attainment Value', type: 'number'}])
    
    for (let co = 1; co < 7; co++) {
      let da = []
      for (let a = 0; a < this.analyze.length; a++) { 
        for (let b = 0 ; b < this.analyze[a].co_data.length; b++){
            if(this.analyze[a].co_data[b].co_number == co){
            da.push([this.analyze[a].co_data[b].total_attainment] )
            }  
            
          }
        }
      codata.push(["CO" + co + "\n Analyse", da[0], da[1],da[2],da[3],da[4],da[5],da[6]])

      }
    for (let co = 1; co < 7; co++) {
      
      let da = []
      for (let a = 0; a < this.apply.length; a++) { 
        for (let b = 0 ; b < this.apply[a].co_data.length; b++){
            if(this.apply[a].co_data[b].co_number == co){
            da.push([this.apply[a].co_data[b].total_attainment] )
            }  
            
          }
        }
      codata.push(["CO" + co + "\n Apply", da[0], da[1],da[2],da[3],da[4],da[5],da[6]])

      }
    for (let co = 1; co < 7; co++) {
      let da = []
      for (let a = 0; a < this.create.length; a++) { 
        for (let b = 0 ; b < this.create[a].co_data.length; b++){
            if(this.create[a].co_data[b].co_number == co){
            da.push([this.create[a].co_data[b].total_attainment] )
            }  
           
          }
        }
      codata.push(["CO" + co + "\n Create", da[0], da[1],da[2],da[3],da[4],da[5],da[6]])
  
    }  
    
    for (let co = 1; co < 7; co++) {
      let da = []
      for (let a = 0; a < this.evaluate.length; a++) { 
        for (let b = 0 ; b < this.evaluate[a].co_data.length; b++){
            if(this.evaluate[a].co_data[b].co_number == co){
            da.push([this.evaluate[a].co_data[b].total_attainment] )
            }  
            
          }
        }
      codata.push(["CO" + co + "\n Evaluate", da[0], da[1],da[2],da[3],da[4],da[5],da[6]])
  
    }

    for (let co = 1; co < 7; co++) {
      let da = []
      for (let a = 0; a < this.remember.length; a++) { 
        for (let b = 0 ; b < this.remember[a].co_data.length; b++){
            if(this.remember[a].co_data[b].co_number == co){
            da.push([this.remember[a].co_data[b].total_attainment] )
            }  
            
          }
        }
      codata.push(["CO" + co + "\n Remember", da[0], da[1],da[2],da[3],da[4],da[5],da[6]])
  
    }

    for (let co = 1; co < 7; co++) {
      let da = []
      for (let a = 0; a < this.understand.length; a++) { 
        for (let b = 0 ; b < this.understand[a].co_data.length; b++){
            if(this.understand[a].co_data[b].co_number == co){
            da.push([this.understand[a].co_data[b].total_attainment] )
            }  
           
          }
        }
      codata.push(["CO" + co + "\n Understand", da[0], da[1],da[2],da[3],da[4],da[5],da[6]])
  
    }
    this.fac_co_data = codata
    this.DrawFacCoursesGraph(this.fac_co_data)
  }

  DrawFacCoursesGraph(chartdata) {

    this.fa_graph =
    {
      chartType: 'ColumnChart',
      dataTable: chartdata,
      options: {
        colors: ['#028a0f','#008000','#99edc3','#7A9D96','#90ee90','#2e8b57','#32612d'],
        width: 2500,
        vAxis:
        {
          0: {
            title: 'CO Attainment Value',
            titleTextStyle: {
              bold: true,
            },
            baseline: 0,
            viewWindow: {
              max: 100,
              min: 0
            }
          },
        },

        hAxis: {
          title: "Blooms levels with mapped COs",
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        bar: {
          groupWidth: '65%'
        },

        chartArea: {
          left: 100,
          height: '65%',
          width: '100%',
        },
        height: 400,

      }
    }
  }

  CourseSelected(event){
    console.log("event",event)
    this.course = [];
    this.course = event.column - 1;
    console.log(this.course);
    this.is_course_selected = true
    this.is_faculty_selected = false;
    console.log(this.faculty)
    this.getCourseData(this.faculty, this.course)
    this.CreateFacTable(this.faculty,this.course)
    
  }
  
  CreateFacTable(i,j)
  {
      this.tabletemp=this.allJsonData[i].course_wise_data[j].faculty_data .student_details;
      console.log(this.allJsonData[i].course_wise_data[j])
      this.displayedColumns = ["student_name","usn","direct_attainment","indirect_attainment","total_attainment"];
      this.tableEnable=true;
  }
  getCourseData(i, j) {
    this.bloom_data = []
    this.course_data = []
    this.faculty_data2 = []
    let codata = []
    codata.push(this.allJsonData[i].course_wise_data[j]);
    this.course_data = codata;
    this.course_name = this.allJsonData[i].course_wise_data[j].course_name 
    this.faculty_data2 = this.course_data[0].faculty_data
    this.bloom_data = this.faculty_data2.blooms_wise_details[0]
    this.IndCourseGraph(this.bloom_data);
    console.log(this.bloom_data)
  }

  IndCourseGraph(data: any[]) {
    this.fill(data);
    let codata = []
    codata.push(["Bloom's level", {label: 'CO Attainment Value', type: 'number'}])
    for (let a = 0; a < this.analyze.length; a++) {
      codata.push(["CO" + this.analyze[a].co_number + "\n Analyze", this.analyze[a].total_attainment])
    }
    for (let a = 0; a < this.apply.length; a++) {
      codata.push(["CO" + this.apply[a].co_number + "\n Apply", this.apply[a].total_attainment])
    }
    for (let a = 0; a < this.create.length; a++) {
      codata.push(["CO" + this.create[a].co_number + "\n Create", this.create[a].total_attainment])
    }
    for (let a = 0; a < this.evaluate.length; a++) {
      codata.push(["CO" + this.evaluate[a].co_number + "\n Evaluate", this.evaluate[a].total_attainment])
    }
    for (let a = 0; a < this.remember.length; a++) {
      codata.push(["CO" + this.remember[a].co_number + "\n Remember", this.remember[a].total_attainment])
    }
    for (let a = 0; a < this.understand.length; a++) {
      codata.push(["CO" + this.understand[a].co_number + "\n Understand", this.understand[a].total_attainment])
    }
    this.current_course = codata;
    this.DrawIndCourseGraph(this.current_course);
  }

  drawStudent(str:string)
  {
    if(str == null)
    {  
      this.student_name = this.student_data_table[0]["student_name"];
      this.currentusn = this.currentusn=this.student_data_table[0]["usn"];
    }
    else
    {
      this.student_name = str;
      for(let i=0;i<this.student_data_table.length;i++)
      {
        if(this.student_data_table[i]["student_name"]==str)
          this.currentusn=this.student_data_table[i]["usn"];
      }
    }
    let dataTable = [];
    dataTable.push(["Semester", "Average CO Attainment Value"]);
    for(let i = 0; i<this.student_data.length;i++)
    {
      let dummy = this.student_data[i]["student_data"];
      let sem = this.student_data[i]["semester"];
      for(let j = 0; j<dummy.length; j++)
      {
        if(dummy[j]["student_name"] == this.student_name)
        dataTable.push(["Semester " + sem, dummy[j]["total_attaintment"]]);
      }
    }
    this.drawStudentChart(dataTable);
  }

  studentCourseGraph(event)
  {
    let data = [];
    data.push(["Course", "Average CO Attainment Value"])
    console.log(event.column)
    this.first_student_chart = false;
    for(let i = 0; i<this.allJsonData.length; i++)
    {
      if("Semester " + this.allJsonData[i]["semester"] == event.column)
      {
      let courses = this.allJsonData[i]["course_wise_data"]
      for(let j = 0; j<courses.length; j++)
      {
        let details = []
        details = courses[j]["faculty_data"]
        details = details["student_details"];
        console.log(details)
        for(let k = 0; k< details.length; k++)
        {
          if(details[k]["student_name"] == this.student_name)
          {
            data.push([courses[j]["course_name"], details[k]["total_attainment"]]);
          }
        }
      }
    }
    this.setStudentChartCourseCo(data);
  }
  
}
  setStudentChartCourseCo(dataTable) {
    console.log("working");
    this.student_course_data =
    {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      options:
      {
        height: 300,
        //width: 1000,
        vAxes: {
          // Adds titles to each axis.
          0: {
            title: 'CO Attainment Value',
            baseline: 0,
            viewWindow: {
              max: 2.5,
              min: 0
            },
            titleTextStyle: {
              bold: true,
            }
          },
        },
        hAxes: {
          // Adds titles to each axis.
          0: {
            title: 'Courses', titleTextStyle: {
              bold: true,
            }
          },
        },
        colors: ["#1D6645"],
        bar: {
          groupWidth: '20%'
        },
        chartArea: {
          left: 100,
          //top: '50',
          height: '65%',
          width: '100%',
        },
        legend: {
          position: "top",
          alignment: "center",
          display: true,
        },
      }
    }
  }

  DrawIndCourseGraph(chartdata) {
    console.log(chartdata)
    this.co_graph =
    {
      chartType: 'ColumnChart',
      dataTable: chartdata,
      options: {
        colors: ['#7A9D96'],

        vAxis:
        {
          title: "CO Attainment Value",
          minValue: 0,
          format: '0.0'
        },

        hAxis: {
          title: "Blooms levels with mapped COs",
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        bar: {
          groupWidth: '20%'
        },

        chartArea: {
          left: 100,
          height: '65%',
          width: '100%',
        },
        height: 400,

      
    }
  }
}
  drawStudentChart(chartdata)
  {
    this.student_data_chart =
    {
      chartType: 'ColumnChart',
      dataTable: chartdata,
      options: {
        colors: ['#1D6645'],

        vAxis:
        {
          title: "Average CO Attainment",
          minValue: 0,
          format: '0.0'
        },

        hAxis: {
          title: "Semesters",
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        bar: {
          groupWidth: '20%'
        },

        chartArea: {
          left: 100,
          height: '65%',
          width: '75%',
        },
        height: 400,

      }
    }
  }
}