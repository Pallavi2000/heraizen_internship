import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../service/analytics.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Analytics } from '../label-externalisation/analytics';
import { MatDialog } from "@angular/material/dialog";
import { ChartSelectEvent } from 'ng2-google-charts';
import { flatten } from '@angular/compiler';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_venn from "@amcharts/amcharts4/plugins/venn";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-nba31',
  templateUrl: './nba31.component.html',
  styleUrls: ['./nba31.component.css']
})
export class Nba31Component implements OnInit {
  obj = new Analytics();
  public organizers_data: GoogleChartInterface;
  public non_organizers_data: GoogleChartInterface;
  public bar_graph_data: GoogleChartInterface
  final_data = []
  selected_group: any;
  organizer_details;
  non_organizer_details;
  display_chart = false;
  show_bar_graph = false;
  display_graph = false;
  property_button1: string = 'null';
  society_details: any;
  event_details: any;
  






  // Divyansh's
  sel_data: FormGroup;
  academic_year_array = [];
  department_array = [];
  academic_year = "Academic Year";
  department = "Department";
  selected_year: any;
  selected_department: any;
  cardbool = false;
  clicked = false;
  is_data_available = false;
  no_data_available = true;
  total_organizer:any;
  organizer_and_achievers_per:any;
  organizer_and_Nonachievers_per:any;
  non_organizer_and_achievers_per:any;
  non_organizer_and_Nonachievers_per:any;
  key:any;
  Name:any =[];
  ID:any=[];
  Membership:any=[];
  Designation:any=[];
  other:any=[];
  Date_of_Joining:any=[];
  Events_Organized:any=[];
  VAR:any=[];
  visible=false;
  check="None";
  non_selected_grp:any=[];
  option:any;
  key1:any;

  // Divyansh's


  constructor(
    private final_data_service: AnalyticsService,
    private form: FormBuilder,
    public dialog: MatDialog) {

    this.sel_data = this.form.group({
      year: ["2018-19", Validators.required],
      dept: ["CS", Validators.required],
    });

  }

  ngOnInit(): void {
    this.final_data_service.nba31Data().subscribe(data => {
      this.final_data = data['final_data'];
      this.academic_year_array = data['academicYear_details'];
      this.department_array = data['departments_details'];
    });
    
  }
  useSearchAgain() {
    this.clicked = false;
    this.cardbool = false;
    this.is_data_available = false;
    this.no_data_available = true;
    this.show_bar_graph = false;

  }
  Click_on_search() {

    for (let i = 0; i < this.final_data.length; i++) {
      if (this.sel_data.value.year == this.final_data[i]["academicYear"] && this.sel_data.value.dept == this.final_data[i]["deptId"]) {
        this.selected_year = this.sel_data.value.year;
        this.selected_department = this.sel_data.value.dept;
        this.is_data_available = true;
      }
    }
    if (this.is_data_available) {
      this.drawChart();
      this.getCardData();
      this.cardbool = true;
      this.clicked = true;
      this.show_bar_graph = false;
    } else {


      this.no_data_available = false;
    }


  }
  getCardData(){
    for (let i = 0; i < this.final_data.length; i++) {
      if (this.selected_year == this.final_data[i].academicYear && this.selected_department == this.final_data[i].deptId) {
        this.total_organizer=this.final_data[i].Total_organizer;
        this.organizer_and_achievers_per =this.final_data[i].organizer_and_achievers_per;
        this.organizer_and_Nonachievers_per=this.final_data[i].organizer_and_Nonachievers_per;
        this.non_organizer_and_achievers_per=this.final_data[i].non_organizer_and_achievers_per;
        this.non_organizer_and_Nonachievers_per=this.final_data[i].non_organizer_and_Nonachievers_per;
      }
    }

  }
  drawChart() {
    this.display_chart = true;
    this.show_bar_graph = false;
    let deptdata = [];
    let orgChartData = [];
    let nonorgChartData = [];
    for (let i = 0; i < this.final_data.length; i++) {
      if (this.selected_year == this.final_data[i].academicYear && this.selected_department == this.final_data[i].deptId) {
        deptdata = this.final_data[i];
      }
    }
    this.organizer_details = deptdata['organizer_details'];
    orgChartData.push(["category", "num_of_studnts"])
    for (let i = 0; i < this.organizer_details.length; i++) {
      let numb: string = this.organizer_details[i].num_of_studnts;
      orgChartData.push([this.organizer_details[i].category, numb])
    }
    this.non_organizer_details = deptdata['non_organizer_details'];
    nonorgChartData.push(["category", "num_of_studnts"])
    for (let i = 0; i < this.non_organizer_details.length; i++) {
      nonorgChartData.push([this.non_organizer_details[i].category, this.non_organizer_details[i].num_of_studnts])
    }
    this.organizersChart(orgChartData, nonorgChartData);

    // Create chart
    let chart = am4core.create("chartdiv", am4plugins_venn.VennDiagram);

    // Create and configure series
    var series = chart.series.push(new am4plugins_venn.VennSeries())
    series.dataFields.category = "name";
    series.dataFields.value = "value";
    series.dataFields.intersections = "sets";
    series.data = [
      { name: "A", value: deptdata['organizer_and_event_participantes'] },
      { name: "C", value: deptdata['organizer_and_achievers_num'] },
      { name: "B", value: deptdata['total_achiever'], sets: ["A", "C"],  }
    ];

    series.colors.list = [
      am4core.color("#dac4b8"),
      am4core.color("#86bac6"),
      am4core.color("#7ba9ac")
    ];

  }

  organizersChart(orgChartData, nonorgChartData) {
    this.organizers_data = {
      chartType: 'PieChart',
      dataTable: orgChartData,
      options: {
        pieHole: 0.6,
        height: 350,
        fontSize: 12,
        colors: ['#247049', '#6f9f93', '#499c83', '#5fb99e'],
        legend: {
          position: "none",
          alignment: "center",
          display: false,
          textStyle: {
            fontName: 'Arial',
            fontSize: 15,
          },
        },
        chartArea: {
          width: '100%', height: '70%'
        },
        enableInteractivity: true,
      }
    }
    this.non_organizers_data = {
      chartType: 'PieChart',
      dataTable: nonorgChartData,
      options: {
        pieHole: 0.6,
        height: 350,
        fontSize: 12,
        colors: ['#247049', '#6f9f93', '#499c83', '#5fb99e'],
        legend: {
          position: "top",
          alignment: "center",
          display: true,
          textStyle: {
            fontName: 'Arial',
            fontSize: 15,
          },
        },
        chartArea: {
          width: '100%', height: '70%'
        },
        enableInteractivity: true,
      }
    }

  }
  displayGraph() {
    if (this.property_button1 == 'true') {
      this.display_graph = !this.display_graph;
      this.barGraphData(1);
    }
    else {
      this.display_graph = !this.display_graph;
      this.barGraphData(2);
    }

  }

  getGroup(event,organizerType) {
    console.log("organizerType",organizerType);
    this.option=organizerType;
    this.display_chart = false;
    console.log(event.row);
    if(organizerType=="organizer"){
    let selected_details = this.organizer_details[event.row]
    this.selected_group = this.organizer_details[event.row]['category'];
    // this.non_selected_grp = this.non_organizer_details[event.row]['category'];
      if(this.selected_group!="None"){
        this.society_details = this.organizer_details[event.row]['society_details']
      this.event_details = this.organizer_details[event.row]['event_details']
      this.property_button1 = 'true';
      this.key=event.row;
      this.getTableData();
      this.displayGraph();
      }
      if(this.selected_group=="None") {
        this.key=event.row;
        this.visible=true;
        this.show_bar_graph=true;
        console.log(this.key);
        this.getTableData();
        // this.displayGraph();
      }}
      else
      {
        this.non_selected_grp = this.non_organizer_details[event.row]['category'];
        this.key1=event.row;
        this.visible=true;
        this.show_bar_graph=true;
        this.getTableData();
      }
    
      
    
    
  }
  getTableData(){
    console.log(this.key);
    if(this.option=='organizer')
    this.VAR=  this.organizer_details[this.key]["student_details"];
    else
    this.VAR=  this.non_organizer_details[this.key]["student_details"];
    console.log(this.VAR);
    this.Name=this.VAR.name;
    console.log(this.Name);
  }
  
  barGraphData(val: number) {
    this.show_bar_graph = true;
    let societyGraphData = [];
    let eventGraphData = [];

    societyGraphData.push(["name", "per_of_society_student", { type: 'string', role: 'tooltip' }]);
    for (let i = 0; i < this.society_details.length; i++) {
      let tooltip="# of Students in "+this.society_details[i].name+":" + this.society_details[i].num_of_students + "\n% of Students in "+this.society_details[i].name+":" + this.society_details[i].per_of_society_student;
      societyGraphData.push([this.society_details[i].name, this.society_details[i].per_of_society_student,tooltip])
    }
    eventGraphData.push(["name", "per_of_event_student",{ type: 'string', role: 'tooltip' }]);
    for (let i = 0; i < this.event_details.length; i++) {
      let tooltip="# of Students in "+this.event_details[i].name+":" + this.event_details[i].num_of_students + "\n% of Students in "+this.event_details[i].name+":" + this.event_details[i].per_of_event_student;
      eventGraphData.push([this.event_details[i].name, this.event_details[i].per_of_event_student,tooltip])
    }
    if (societyGraphData.length > 1) {
      this.drawBarGraph(societyGraphData, eventGraphData, val);
    }

  }

  drawBarGraph(societyGraphData, eventGraphData, val) {
    console.log("chart data", societyGraphData)
    if (val == 1) {
      this.bar_graph_data = {
        chartType: 'ColumnChart',
        dataTable: societyGraphData,
        options: {
          title: 'Membership vs. '+this.selected_group,
          titlePosition: 'out',
          titleTextStyle: {
            fontSize: 15,
          },
          height: 350,
          vAxes: {
            0: {
              title: '% of Students',
              baseline: 0,
              viewWindow: {
                max: 100,
                min: 0
              }
            },
          },
          hAxes: {
            0: { title: '' },
          },
          colors: ["#789d96"],
          bar: {
            groupWidth: '15%'
          },
          chartArea: {
            left: 100,
            height: '65%',
            width: '100%',
          },

        }
      }
    }
    if (val == 2) {
      this.bar_graph_data = {
        chartType: 'ColumnChart',
        dataTable: eventGraphData,
        options: {
          title: 'Events vs. ' +this.selected_group,
          titlePosition: 'out',
          titleTextStyle: {
            fontSize: 15,
          },
          height: 350,
          vAxes: {
            0: {
              title: '% of Students',
              baseline: 0,
              viewWindow: {
                max: 100,
                min: 0
              }
            },
          },
          hAxes: {
            0: { title: '' },
          },
          colors: ["#789d96"],
          bar: {
            groupWidth: '15%'
          },
          chartArea: {
            left: 100,
            height: '65%',
            width: '100%',
          },

        }
      }
    }


  }

  backfunction() {
    if (this.display_chart) {
      this.display_chart = false;
      this.show_bar_graph = false;

    }
    else if (this.show_bar_graph) {
      this.display_chart = true;
      this.show_bar_graph = false;

    }
  }


}

