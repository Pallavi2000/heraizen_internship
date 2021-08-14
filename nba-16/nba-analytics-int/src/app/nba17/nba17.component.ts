import { Component, OnInit, ViewChild } from "@angular/core";
import { AnalyticsService } from "../service/analytics.service";
import { Analytics } from "../label-externalisation/analytics";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Nba17dialogComponent } from "./nba17dialog/nba17dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { sort } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import {MatPaginator, MatTableDataSource} from '@angular/material'
import { Paginator } from '@vrushalisoft/datatable';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: "app-nba17",
  templateUrl: "./nba17.component.html",
  styleUrls: ["./nba17.component.css"],
})
export class Nba17Component implements OnInit {
  labels = new Analytics();
  sel_data: FormGroup;
  allJsonData : any = [];
  fac =  false;
  hod = true;
  lesson;
  total;
  course;
  co;
  co2;
  principal = false;

  domain_data = [];
  faculty_data = [];
  faculty: any[] = [];
  hod_data = [];
  faculty_data1 = []
  blooms_Weightage = [];
  acad_year = [];
  term_array = [];
  dept_array = [];
  cur_year: string;
  cname: string = 'false';
  average: string = 'true';
  fname: string = 'false';
  reverse: string = 'true';
  role = "HOD"
  displayChart: boolean = false;
  course_code: string;
  coursename;
  facData = [];
  isDisabled = false;
  table2Data = [];
  isClicked = false;

  total_lessons_course: number;
  total_lessons_co: number;
  dialogData = [];
  course_num: number;
  course_diff: number;
  co_diff: number;
  course_bloom = [];
  co_bloom = [];
  levels = [];
  co_num: number;
  num_mapped_co: number;

  data1;
  data2;
  sort_graph;
  error1 = false;
  clicked = false;
  firstChart = false;
  secondChart = false;
  second_screen = false;
  clicked_course: string;
  chart1_labelExt : string;
  str: string;
  leftNavPush: string;
  faculty_data_dis = [];
  index: number;
  to_sort_co_attainment: any;
  facultyGivenId: string = '70';
  dept: any = 'IS';
  hod_id:string = '585';
  section: string;
  faculty_choose: any;
  size_paginator = [5,,10,20]
  obs: any;
  constructor(
    private analyticService: AnalyticsService,
    private form: FormBuilder,
    public dialog: MatDialog
  ) {
    this.sel_data = this.form.group({
      year: ["", Validators.required],
      term: [[""], Validators.required],
      dept: ["", Validators.required],
    });
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.faculty);
  ngOnInit(): void {
    this.academicYear();
    this.dataSource.paginator = this.paginator;
  }

  academicYear(){
    if(this.role == 'FACULTY'){
      this.analyticService.get_academic_year_for_faculty(this.facultyGivenId).subscribe(data=>{
        this.acad_year = data['faculty_academicYear'][0]['all_academic_year'];
        this.acad_year.sort();
      })
    }
    else if(this.role == 'HOD')
    {
      // this.analyticService.dep_hod(this.hod_id).subscribe(data =>{
      //   this.dept = data["dept_hod"][0]['deptId'];
      // })
      this.analyticService.get_academicYear_hod(this.dept).subscribe(data => {
        this.acad_year = data['hod_academicYear'][0]["all_academic_year"]
        this.acad_year.sort();
      })
    }
    else{
      this.analyticService.get_principal_dept().subscribe(data => {
        this.dept_array = data["departments"];
        this.dept_array.sort();
      })
    }
  }

  academicYearSelected(){
    if(this.fac == true)
    {
      this.analyticService.get_terms_for_faculty(this.facultyGivenId,this.sel_data.value.year).subscribe(data=>{
        this.term_array = data['faculty_terms'][0]['terms'];
        this.term_array.sort();
        });
    }
    else
    {
      this.analyticService.get_term_hod(this.sel_data.value.year,this.dept).subscribe(data =>{
        this.term_array = data['hod_terms'][0]['hod_terms'];
        this.term_array.sort();
      })
    }
  }

  principalGetAcademicYear(){
    this.dept = this.sel_data.value.dept;
    this.analyticService.get_academicYear_hod(this.dept).subscribe(data => {
      this.acad_year = data['hod_academicYear'][0]["all_academic_year"]
      this.acad_year.sort();
    })
  }

  onsubmit() {
    this.faculty_data_dis = [];
    this.faculty = [];
    this.displayChart = !this.displayChart;
    // // let datapresent: boolean;
    this.firstChart = false;
    this.clicked = true;
    if(this.fac){
      this.chart1_labelExt = "My Courses"
      this.analyticService.getFacultyData(this.facultyGivenId,this.sel_data.value.year, this.sel_data.value.term).subscribe(data => {
        this.faculty_data1 = data["faculty"];
        for(let k=0; k < this.faculty_data1.length; k++)
        {
          this.faculty_data_dis.push(this.faculty_data1[k]);
        }
        this.domain_data = this.faculty_data_dis;
        console.log(this.domain_data)
        if (this.faculty_data_dis.length > 0) {
          this.secondChart = false;
          this.firstChart = true;
          this.getGraphData1();
        } else {
          this.error1 = true;
          this.firstChart = false;
        }
      })  
    }

    else{
      // this.domain_data = this.analyticService.get_facultyId_dept(this.sel_data.value.year,terms = ['3','5'])
      this.chart1_labelExt = "All Courses"
      console.log(this.sel_data.value.year,this.sel_data.value.term)
      this.analyticService.get_hod_data(this.sel_data.value.year,this.dept,this.sel_data.value.term).subscribe(data => {
        this.hod_data = data["hod_data"];
        for(let k=0; k < this.hod_data.length; k++)
        {
          this.faculty_data_dis.push(this.hod_data[k]);
        }
        this.domain_data = this.faculty_data_dis;
        if (this.faculty_data_dis.length > 0) {
          this.secondChart = false;
          this.firstChart = true;
          this.getGraphData1();
        } else {
          this.error1 = true;
          this.firstChart = false;
        }
      })  
    }
    
    // if (this.faculty_data_dis.length > 0) {
    //   this.secondChart = false;
    //   this.firstChart = true;
    //   this.getGraphData1();
    // } else {
    //   this.error1 = true;
    //   this.firstChart = false;
    // }
  }

  getGraphData1() {
    let data_table = [];
    this.error1 = false;
    let graph_data = [];
    this.clicked = true;
    
    graph_data = this.faculty_data_dis;
    this.dialogData = graph_data;
    if(this.hod || this.principal){
      data_table.push([
        "Course Outcomes",
        "Difficulty level",
        { type: "string", role: "tooltip" },
        "CO1",
         { type: "string", role: "tooltip" },
        "CO2",
        { type: "string", role: "tooltip" },
        "CO3",
        { type: "string", role: "tooltip" },
        "CO4",
        { type: "string", role: "tooltip" },
        "CO5",
        { type: "string", role: "tooltip" },
        "CO6",
        { type: "string", role: "tooltip" },
      ]);
    }
    else{
      data_table.push([
        "Course Outcomes",
        // "Total Attainment",
        // { type: "string", role: "tooltip" },
        "Difficulty level",
        { type: "string", role: "tooltip" },
        "CO1",
        { type: "string", role: "tooltip" },
        "CO2",
        { type: "string", role: "tooltip" },
        "CO3",
        { type: "string", role: "tooltip" },
        "CO4",
        { type: "string", role: "tooltip" },
        "CO5",
        { type: "string", role: "tooltip" }
      ]);
    }
    
    if(this.hod || this.principal){

      for(let i=0;i < this.faculty_data_dis.length ; i++ ){
        this.course_code = this.faculty_data_dis[i]["courseCode"];
        this.faculty.push(this.faculty_data_dis[i]);
        let tooltip = "Difficulty Level % : " + graph_data[i]["course_difficultyLevel_per"] + "\n";
        for(let j = 0;j< graph_data[i]['Co_details'].length;j++)
        {
          if(graph_data[i]['Co_details'][j]['totalAttainment'] != undefined )
          { 
            tooltip += "CO"+ (j+1) + " : "+ graph_data[i]['Co_details'][j]['totalAttainment']+'\n';
          }
        }    
        let lst = [ graph_data[i]["courseName"] + "\nSection-" + graph_data[i]["section"], graph_data[i]["course_difficultyLevel_per"],tooltip]
        for(let j=0;j< graph_data[i]["Co_details"].length; j++){
          lst.push(graph_data[i]["Co_details"][j].totalAttainment)
          lst.push(tooltip);
        }
        data_table.push(lst)
    }
    this.Graph1(data_table);
  }
  else{
    for(let i=0;i < this.faculty_data_dis.length ; i++ ){
  //  console.log(i,this.faculty_data_dis[i],"\n");
        this.course_code = this.faculty_data_dis[i]["courseCode"];
        this.faculty.push(this.faculty_data_dis[i]);
        let tooltip =
          // "Total Attainment : " +
          // graph_data[i]["total_attainment"] +
          // "\n" +
          "Difficulty Level % : " +
          graph_data[i]["course_difficultyLevel_per"] +
          "\n" +
          "CO1 : " +
          graph_data[i]["Co_details"][0].totalAttainment +
          "\n" +
          "CO2 : " +
          graph_data[i]["Co_details"][1].totalAttainment +
          "\n" +
          "CO3 : " +
          graph_data[i]["Co_details"][2].totalAttainment +
          "\n" +
          "CO4 : " +
          graph_data[i]["Co_details"][3].totalAttainment +
          "\n" +
          "CO5 : " +
          graph_data[i]["Co_details"][4].totalAttainment;


        data_table.push([
          graph_data[i]["courseName"] +
            "\nSection-" +
            graph_data[i]["section"],
          // +graph_data[i]["total_attainment"],
          // tooltip,
          graph_data[i]["course_difficultyLevel_per"],
          tooltip,
          graph_data[i]["Co_details"][0].totalAttainment,
          tooltip,
          graph_data[i]["Co_details"][1].totalAttainment,
          tooltip,
          graph_data[i]["Co_details"][2].totalAttainment,
          tooltip,
          graph_data[i]["Co_details"][3].totalAttainment,
          tooltip,
          graph_data[i]["Co_details"][4].totalAttainment,
          tooltip,
        ]);
          
    }
    this.Graph1(data_table);
  }

     
    // this.obs = this.dataSource.connect();
  }

  data_tab: any;
  Graph1(data_table) {
    // console.log("data table : ",data_table);
    if(this.hod || this.principal){
      this.data1 = {
        chartType: "ColumnChart",
        dataTable: data_table,
        options: {
          height: 450,
          width:2500,
          hAxis: {
            title: "Courses",
            titleTextStyle: {},
            showInLegend : true
          },
          vAxis: {
            title: "Total CO Attainment /\n Difficulty level %",
            minValue: 0,
            titleTextStyle: {},
            maxValue : 100,
          }, 
          series : {
            axes : { x: {visibleInLegend : true}, y : {visibleInLegend:true}},
            1:{visibleInLegend: true},
            2:{visibleInLegend: true},
            3:{visibleInLegend: true},
           // 4:{visibleInLegend: false}
          },
          legend: {
            position: "top",
            alignment: "end"
          },
          chartArea: {
            left: 100,
            right: 50,
            width : 100,
          },
          colors: [ "#6C5C7C", "#1C6444", "#4C8C6C", "#4C7464","#2ac840","#66f77a", "#9df9aa"],
          bar: {
            groupWidth: "70%",
          },
          explorer: { actions: ['dragToPan'],
           axis: 'horizontal'
  
           },
        },
      };
    }
    else{
      this.data1 = {
        chartType: "ColumnChart",
        dataTable: data_table,
        options: {
          height: 500,
          hAxis: {
            title: "Courses",
            titleTextStyle: {},
            showInLegend : true
          },
          vAxis: {
            title: "Total CO Attainment /\n Difficulty level %",
            minValue: 0,
            titleTextStyle: {},
            maxValue : 100,
          }, 
          series : {
            axes : { x: {visibleInLegend : true}, y : {visibleInLegend:true}},
            1:{visibleInLegend: true},
            2:{visibleInLegend: true},
            3:{visibleInLegend: true},
           // 4:{visibleInLegend: false}
          },
          legend: {
            position: "top",
            alignment: "end"
          },
          chartArea: {
            left: 100,
            right: 50
          },
          colors: [ "#6C5C7C", "#1C6444", "#4C8C6C", "#4C7464","#2ac840","#66f77a"],
          bar: {
            groupWidth: "70%",
          },
          explorer: { actions: ['dragToPan'],
           axis: 'horizontal' },
        },
      };
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
        },
        vAxis: {
          title: "CO Attainment Value",
          // 'ticks': [0, 25, 50, 75, 100, 125, 150]
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        colors: ["#2d8ea7", "#7a9d96", "#bda07d"],
        bar: {
          groupWidth: "15%",
        },
      }
    };
  }
  ComparatorAvrev(a, b) {

    if (a['totalAttainment'] < b['totalAttainment']) return 1;
    if (a['totalAttainment'] > b['totalAttainment']) return -1;
    return 0;
  }
  ComparatorAv(a, b) {
    if (a['totalAttainment'] < b['totalAttainment']) return -1;
    if (a['totalAttainment'] > b['totalAttainment']) return 1;
    return 0;
  }
  ComparatorCorev(a, b) {
    if (a['courseCode'] < b['courseCode']) return 1;
    if (a['courseCode'] > b['courseCode']) return -1;
    return 0;
  }
  ComparatorCo(a, b) {
    if (a['courseCode'] < b['courseCode']) return -1;
    if (a['courseCode'] > b['courseCode']) return 1;
    return 0;
  }
  
  ComparatorFnrev(a, b) {
    if (a['facultyName'] < b['facultyName']) return 1;
    if (a['facultyName'] > b['facultyName']) return -1;
    return 0;
  }
  ComparatorFn(a, b) {
    if (a['facultyName'] < b['facultyName']) return -1;
    if (a['facultyName'] > b['facultyName']) return 1;
    return 0;
  }
  
  sortfunc() {

    if (this.average == 'true') {
      if (this.reverse == 'true') {
      //   this.sort_graph.sort(this.ComparatorAvrev);
      //   this.getGraphData2(this.sort_graph)
      // }
      // else {
      //   this.sort_graph.sort(this.ComparatorAv);
      //   this.getGraphData2(this.sort_graph)
        this.to_sort_co_attainment.sort(this.ComparatorAvrev);
      }
      else {
        this.to_sort_co_attainment.sort(this.ComparatorAv);
      }
    }
    else if (this.cname == 'true') {
      if (this.reverse == 'true') {
        this.faculty.sort(this.ComparatorCorev);
      }
      else {
        this.faculty.sort(this.ComparatorCo);
      }
    }
  
    else if (this.fname == 'true') {
      if (this.reverse == 'true') {
        this.faculty.sort(this.ComparatorFnrev);
      }
      else {
        this.faculty.sort(this.ComparatorFn);
      }
    }
  }
 
  onSelect(event) {
    this.str = event.column;
    this.secondChart = true;
    this.firstChart = false;
    let graph_data;
    for (let i = 0; i < this.domain_data.length; i++) {
      if (
        this.str ==
        this.domain_data[i]["courseName"] +
          "\nSection-" +
          this.domain_data[i]["section"]
      ) {
        this.index = this.domain_data[i];
        graph_data = this.domain_data[i]["Co_details"];
        this.clicked_course =
        this.domain_data[i]["courseName"] +
        
          " - " +
          this.domain_data[i]["courseCode"] +
          "(" +
          "Semester " +
          this.domain_data[i]["termNumber"] +
          " - " +
          "\nSection " +
          this.domain_data[i]["section"]+
          ")";
        this.leftNavPush = this.domain_data[i]["courseCode"];

        this.course_num = i;
        this.course_code = this.domain_data[i]["courseCode"];
        this.section = this.domain_data[i]['section'];
        this.faculty_choose = this.domain_data[i]['facultyGivenId']
      }
    }
    this.sort_graph= graph_data
    this.getGraphData2(graph_data);
  }

  backButton() {
    this.firstChart = true;
    this.secondChart = false;
  }

  getGraphData2(graph_data) {
    this.clicked = true;
    let data_table = [];
    this.average = 'true';
    this.to_sort_co_attainment = graph_data;
    this.sortfunc();
    data_table.push([
      "Course Outcomes",
      "Difficulty Level %",
      { type: "string", role: "tooltip" },
      "Total Attainment",
      { type: "string", role: "tooltip" },
      "Direct Attainment",
      { type: "string", role: "tooltip" },
      "Indirect Attainment",
      { type: "string", role: "tooltip" },
    ]);
    for (let i = 0; i < graph_data.length; i++) {
      let tooltip =
        "Difficulty Level % : " +
        graph_data[i]["co_difficultyLevel"] +
        "\n" +
        "Total Attainment : " +
        graph_data[i]["totalAttainment"] +
        "\n" +
        "Direct Attainment : " +
        graph_data[i]["directAttainment"] +
        "\n" +
        "Indirect Attainment : " +
        graph_data[i]["indirectAttainment"];

        if(graph_data[i]["Difficulty"] != 0){
          data_table.push([
            "CO" + graph_data[i]["CO"],
            graph_data[i]["co_difficultyLevel"],
            tooltip,
            graph_data[i]["totalAttainment"],
            tooltip,
            graph_data[i]["directAttainment"],
            tooltip,
            graph_data[i]["indirectAttainment"],
            tooltip,
          ]);
    }
    }
    this.Graph2(data_table);
  }

  Graph2(data_table) {
    this.data2 = {
      chartType: "ColumnChart",
      dataTable: data_table,
      options: {
        height: 500,
        hAxis: {
          title: "Course Outcomes",
          titleTextStyle: {}
        },
        vAxis: {
          title: "Total CO Attainment /\n Difficulty level %",
          minValue: 0,
          titleTextStyle: {},
          maxValue : 100
        },
        legend: {
          position: "top",
          alignment: "end",
          maxlines : 2,
          legendFontSize : 3,
          x : 100
        },
        chartArea: {
          left: 100,
          right: 50,
        },
        colors: ["#6C5C7C", "#2C8CA4", "#7CA49C", "#C4A484"],
        bar: {
          groupWidth: "40%"
        },
       
      },
      
    };
  }

  getDialogData(event) {
    this.total_lessons_course = 0;
    this.total_lessons_co = 0;
    this.levels = ["Remember","Understand","Apply","Analyze","Evaluate","Create"];
    this.course_bloom = [];
    this.co_bloom = [];
    let a;
    for ( let i = 1 ; i <= 6 ; i++ ) {
      if (event.column == "CO" + i) {
        this.co_num = i;
        break;
      }
    }
    this.co2 = this.dialogData[this.course_num][
      "course_difficultyLevel_per"
    ];
    this.course_diff = this.co2.toFixed(2)
    a = this.dialogData[this.course_num]["Co_details"]
    a.sort(function(a,b){
      return a.CO - b.CO
    })
    this.co_diff = a[
      this.co_num - 1
    ]["co_difficultyLevel"];
    for (var k in this.blooms_Weightage[0]) {
      this.levels.push(k);
    }
    if(this.hod || this.principal){
      this.analyticService.get_total_Lessons(this.faculty_choose,this.sel_data.value.year,this.course_code).subscribe(res=>{
        this.total = res["res"]
        for(let i=0;i<this.total.length;i++){
          a = this.total[i]
          if(a["CO"] == event["column"]){
            this.total_lessons_co = a["Lesson"]
            this.co = a["blooms"]
            break
          }
        }
        this.co_bloom.push("Remember",this.co["REMEMBER"])
        this.co_bloom.push("Understand",this.co["UNDERSTAND"])
        this.co_bloom.push("Apply",this.co["APPLY"])
        this.co_bloom.push("Analyze",this.co["ANALYZE"])
        this.co_bloom.push("Evaluate",this.co["EVALUATE"])
        this.co_bloom.push("Create",this.co["CREATE"])
        this.total_lessons_course = this.total[this.total.length - 2]["Total_Lessons"]
        this.course= this.total[this.total.length - 1]["Total_blooms"]
        this.course_bloom.push("Remember",this.course["REMEMBER"])
        this.course_bloom.push("Understand",this.course["UNDERSTAND"])
        this.course_bloom.push("Apply",this.course["APPLY"])
        this.course_bloom.push("Analyze",this.course["ANALYZE"])
        this.course_bloom.push("Evaluate",this.course["EVALUATE"])
        this.course_bloom.push("Create",this.course["CREATE"])
        this.openDialog();
      })
    }
    else{
      this.analyticService.get_total_Lessons(this.facultyGivenId,this.sel_data.value.year,this.course_code).subscribe(res=>{
        this.total = res["res"]
        for(let i=0;i<this.total.length;i++){
          a = this.total[i]
          if(a["CO"] == event["column"]){
            this.total_lessons_co = a["Lesson"]
            this.co = a["blooms"]
            break
          }
        }
        this.co_bloom.push("Remember",this.co["REMEMBER"])
        this.co_bloom.push("Understand",this.co["UNDERSTAND"])
        this.co_bloom.push("Apply",this.co["APPLY"])
        this.co_bloom.push("Analyze",this.co["ANALYZE"])
        this.co_bloom.push("Evaluate",this.co["EVALUATE"])
        this.co_bloom.push("Create",this.co["CREATE"])
        this.total_lessons_course = this.total[this.total.length - 2]["Total_Lessons"]
        this.course= this.total[this.total.length - 1]["Total_blooms"]
        this.course_bloom.push("Remember",this.course["REMEMBER"])
        this.course_bloom.push("Understand",this.course["UNDERSTAND"])
        this.course_bloom.push("Apply",this.course["APPLY"])
        this.course_bloom.push("Analyze",this.course["ANALYZE"])
        this.course_bloom.push("Evaluate",this.course["EVALUATE"])
        this.course_bloom.push("Create",this.course["CREATE"])
        this.openDialog();
      })
    }
    


    // for (let i = 0; i < this.levels.length; i++) {
    //   this.total_lessons_course += this.dialogData[this.course_num][
    //     "courseLevel_blooms_details"
    //   ][0][this.levels[i]];
    //   this.total_lessons_co += this.dialogData[this.course_num]["Co_details"][
    //     this.co_num - 1
    //   ].blooms_details[0][this.levels[i]];
    //   this.course_bloom.push(
    //     this.levels[i],
    //     this.dialogData[this.course_num]["courseLevel_blooms_details"][0][
    //       this.levels[i]
    //     ]
    //   );
    //   this.co_bloom.push(
    //     this.levels[i],
    //     this.dialogData[this.course_num]["Co_details"][this.co_num - 1]
    //       .blooms_details[0][this.levels[i]]
    //   );
    // }
  }

  openDialog() {
    const dialogRef = this.dialog.open(Nba17dialogComponent, {
      data: {
        total_lessons_course: this.total_lessons_course,
        total_lessons_co: this.total_lessons_co,
        course_diff: this.course_diff,
        bloomsList: this.blooms_Weightage[0],
        co_num: this.co_num,
        co_diff: this.co_diff,
        course_bloom: this.course_bloom,
        co_bloom: this.co_bloom,
        levels: this.levels,
        course_code:this.course_code
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  courseSelected(i, sub) {
    console.log(sub);
    this.course_code = sub.courseCode;
    this.section = sub.section;
    this.faculty_choose = sub.facultyGivenId
    this.secondChart = true;
    this.firstChart = false;
    let graph_data;
    // for (let i = 0; i < this.domain_data.length; i++) {
    //   if (
    //     this.course_code == this.domain_data[i]["courseCode"] && this.domain_data[i]['section'] == this.section && this.faculty_choose == this.domain_data[i]['facultyGivenId']
    //   ) {
        graph_data = sub["Co_details"];
        this.clicked_course =
        sub["courseName"] +
        
          " - " +
          sub["courseCode"] +
          "(" +
          "Semester " +
          sub["termNumber"] +
          " - " +
          "\nSection" +
          sub["section"]+
          ")";
        this.leftNavPush = sub["courseCode"];

        this.course_num = i;
    //   }
    // }
    this.getGraphData2(graph_data);
  }
}
