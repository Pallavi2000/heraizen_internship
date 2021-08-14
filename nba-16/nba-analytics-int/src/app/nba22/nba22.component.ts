
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../service/analytics.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartDirective } from '@vrushalisoft/googlechart';
import { Analytics } from '../label-externalisation/analytics';
import { MatExpansionModule } from '@angular/material/expansion';
import { kMaxLength } from 'buffer';


@Component({
  selector: 'app-nba22',
  templateUrl: './nba22.component.html',
  styleUrls: ['./nba22.component.css']
})
export class Nba22Component implements OnInit {

  obj = new Analytics();
  coData;
  emptydata: boolean;
  searchCategoryprev: any;
  change: boolean = false;
  faculty_data: any;
  academicYear: any;
  departments: any;
  termdetails: any;
  hod_data: any;
  acadyear: any;
  term: any;
  searchCategoryList: FormGroup;
  searchCategory: any;
  selectedfacultydata = [];
  responsiveView : boolean;
  rwdCourseData = [];
  rwd_data;
  rwdView: boolean;
  rwdDatatable;
  chartdata: any[];
  firstchartflag: boolean;
  public selectEvent: ChartDirective;
  chart: any;
  responsive_data: any;
  backbtn: boolean;
  bloomname: any;
  bloomDetails = [] ;
  currentBloom = [];
  chart1: any;
  rwdchart2;
  tabledata = [];
  sortOption: string = "avgCo";
  sortOrder: string = "desc";
  smallScreen = false;
  domain_data: any;
  i: any;
  j: any;
  faculty = true;
  hod = false;
  principal = false;
  chart2bool = true;
  display_1 = true;
  Keylist = ["Method Description", "Attainment", "Attainment Percentage", "Total Obtained Score", "Total Max. Score"]
  selected = '1-10'
  rwd_chart2: any[];
  blooms = ["Remember","Understand","Apply","Analyze","Evaluate","Create"]


  constructor(private myService: AnalyticsService, private fb: FormBuilder) {
    if (this.principal) {
      this.hod = true
      this.searchCategoryList = this.fb.group({
        academicYear: ['', Validators.required],
        term: [[], Validators.required],
        dept: ['', Validators.required]


      });
    }

    else {
      this.searchCategoryList = this.fb.group({
        academicYear: ['', Validators.required],
        term: [[], Validators.required]

      });
    }

    interface ChartSelectEvent {
      message: string;
      row: number | null;
      column: number | null;
      columnLabel: string;
      selectedRowValues: any[];
      selectedRowFormattedValues: any[];
    }
  }

  ngOnInit(): void {
    this.myService.getnba22CoAttainmentData().subscribe(data => {
      this.coData = data;
      this.faculty_data = data["faculty_data"]
      this.academicYear = data["academicYear"]
      this.termdetails = data["terms"]
      this.departments = data["departments"]
      this.hod_data = data["hod_details"]

    });



  }

  user() {
    this.hod = !this.hod;
    this.faculty = !this.faculty
  }
  checkdiff() {
    // this.searchCategory = this.searchCategoryList.value;
    // console.log(this.searchCategoryprev);
    // console.log(this.searchCategory);
    // if(this.searchCategoryprev.academicYear==this.searchCategory.academicYear && this.searchCategoryprev.term==this.searchCategory.term)
    //   this.change=true;
    // else
    this.change = false;
  }

  searchfun() {
    if (this.faculty) {
      this.domain_data = this.faculty_data
    }
    else {
      this.domain_data = this.hod_data
    }

    this.selectedfacultydata = [];
    this.searchCategory = this.searchCategoryList.value;
    this.searchCategoryprev = this.searchCategory;
    this.change = true;


        //web chart
        for (let i = 0; i < this.domain_data.length; i += 1) {
          if ((this.principal && this.domain_data[i].deptId == this.searchCategory["dept"]) || (!this.principal)) {
            if (this.domain_data[i].academicYear == this.searchCategory["academicYear"]) {
    
              for (let j = 0; j < this.searchCategory.term.length; j += 1) {
                if (this.searchCategory.term[j] == this.domain_data[i].termNumber) {
                  console.log(this.domain_data[i].termNumber)
    
                  this.selectedfacultydata.push(this.domain_data[i])
                }
              }
    
            }
          }
        }
        this.selectedfacultydata.sort(this.avgCoDesc);
        console.log("selected courses" + this.selectedfacultydata);
        

    //rwd chart
    
              this.rwdDatatable = []
              for (let i = 0; i < this.selectedfacultydata.length; i++) {
                let  rwd_dataTable = []
                rwd_dataTable.push(["Course", "Average CO Attainment Value", { type: 'string', role: 'tooltip' }])
                rwd_dataTable.push([this.selectedfacultydata[i].courseName + '\n Section - ' + this.selectedfacultydata[i].section,this.selectedfacultydata[i].average_attainment, "Averege CO Attainment Value : " + this.selectedfacultydata[i].average_attainment]);
                  this.rwdDatatable.push(rwd_dataTable)
                }
                console.log('rwdDatatable', this.rwdDatatable)
                this.rwd_drawaverageattainment(this.rwdDatatable)            
          


    
    this.averageattainmentdata(this.selectedfacultydata);
    

   
  }


  averageattainmentdata(facultydata) {
    let datatabel = []
    datatabel.push(["courses", "Average CO Attainment Value", { type: 'string', role: 'tooltip' }])
    for (let i = 0; i < facultydata.length; i += 1) {
      if (this.faculty) {
        datatabel.push([facultydata[i].courseName + '\n Section - ' + facultydata[i].section, facultydata[i].average_attainment, "Averege CO Attainment Value : " + facultydata[i].average_attainment]);
      }
      else {
        datatabel.push([facultydata[i].courseName, facultydata[i].average_attainment, "Averege CO Attainment Value : " + facultydata[i].average_attainment]);
      }
    }
    this.chartdata = datatabel
    if (this.chartdata.length > 1) {
      this.firstchartflag = true
      this.emptydata = false;
      this.drawaverageattainment(this.chartdata)
    }
    else {
      this.firstchartflag = false;
      this.emptydata = true;
    }    
  }

  average_co() {
    //this.responsiveView = false
    this.searchfun()
  }
  average_co_course_wise() {
    //this.responsiveView = true
    this.searchfun()
  }

  drawaverageattainment(chartdata) {
       this.chart =
      {
        chartType: 'ColumnChart',
        dataTable: chartdata,
        options: {
          colors: ['#7A9D96'],
          vAxis:
          {
            title: "Average CO Attainment Value",
            minValue: 0,
            format: '0.0'
          },

          hAxis: {
            title: "Courses "
          },
          legend: {
            position: "top",
            alignment: "end",
            display: true,
          },
          bar: {
            groupWidth: '10%'
          },

          chartArea: {
            left: 100,
            //top: '50',
            height: '65%',
            width: '100%',
          },
          //width: 900,
          height: 400,
        }
      }
    }
    
    rwd_drawaverageattainment(dataTable){

      this.rwd_data =
      {
        chartType: 'ColumnChart',
        dataTable: dataTable,
        options: {
          colors: ['#7A9D96'],
          vAxis:
          {
            title: "Average CO Attainment Value",
            minValue: 0,
            format: '0.0'
          },

          hAxis: {
            title: "Courses "
          },
          legend: {
            position: "top",
            alignment: "end",
            display: true,
          },
          bar: {
            groupWidth: '20%'
          },

          chartArea: {
            left: 100,
            //top: '50',
            height: '65%',
            width: '100%',
          },
          //width: 900,
          height: 400,
        }
      }
    console.log("rwd chart displayed ",dataTable)

  }

  courseSelect(event) {
      this.display_1 = !this.display_1
      //alert("happened")
    this.chart2bool = true;
    for (let i = 0; i < this.selectedfacultydata.length; i += 1) {
      let value = this.selectedfacultydata[i].average_attainment
      if (event.row == value) {

        this.selectCourse(i);
      }
    }
  }


  totalattainmentdata(coursedata) {
    //alert("total data")
    // if(!this.smallScreen){
    this.backbtn = true;
    this.firstchartflag = false;
    let datatabel = []
    datatabel.push(["Bloom's level", "Total CO Attainment Value", { type: 'string', role: 'tooltip' }, "Direct  CO Attainment Value", { type: 'string', role: 'tooltip' }, "Indirect  CO Attainment Value", { type: 'string', role: 'tooltip' }])
    for (let i = 0; i < coursedata.Co_details.length; i += 1) {
      let tooltip = "Total Attainment : " + coursedata.Co_details[i].totalAttainment + "\n Direct Attainment : " + coursedata.Co_details[i].directAttainment + "\n Indirect Attainment : " + coursedata.Co_details[i].indirectAttainment
      datatabel.push(["CO" + coursedata.Co_details[i].coNumber + "\n" + coursedata.Co_details[i].bloomsLevel, coursedata.Co_details[i].totalAttainment, tooltip, coursedata.Co_details[i].directAttainment, tooltip, coursedata.Co_details[i].indirectAttainment, tooltip])
    }
    this.chartdata = datatabel
    if (this.chartdata.length > 1) {
      this.drawtotalattainment(this.chartdata);
    }
    else {

      console.log("data not found")

    }

  }

  rwd_totalattainmentdata(coursedata){
      this.backbtn = true;
      this.firstchartflag = false;
      for (let j = 0; j < coursedata.Co_details.length; j++) {
        let mapped_bloom = false;
        let matched_index;
        let rwdCo = [];
        for(let i = 0; i<this.rwdCourseData.length;i++){
          if(coursedata.Co_details[i].bloomsLevel == coursedata.Co_details[j].bloomsLevel){
            mapped_bloom = true;
            matched_index = i
            //alert("CO" + coursedata.Co_details[i].coNumber+coursedata.Co_details[i].bloomsLevel + "CO" + coursedata.Co_details[j].coNumber)
            break;
          }
        }
      
        //console.log('rwdCourseData1', this.rwdCourseData);

        if(!mapped_bloom){
          rwdCo.push(["Bloom's level", "Total CO Attainment Value", "Direct  CO Attainment Value", "Indirect  CO Attainment Value"] )
          rwdCo.push(["CO" + coursedata.Co_details[j].coNumber,coursedata.Co_details[j].totalAttainment, coursedata.Co_details[j].directAttainment, coursedata.Co_details[j].indirectAttainment]);
          this.rwdCourseData.push(rwdCo)
        }
        else{
          mapped_bloom = false;
          console.log('rwdCourseData2', this.rwdCourseData[j]);

          this.rwdCourseData[matched_index].push(["CO" + coursedata.Co_details[j].coNumber,coursedata.Co_details[j].totalAttainment, coursedata.Co_details[j].directAttainment, coursedata.Co_details[j].indirectAttainment])
          console.log('rwdCourseData2', this.rwdCourseData);
        }
      }

      for (let i = 0; i< coursedata.Co_details.length; i++) {
        if (!this.currentBloom.includes(coursedata.Co_details[i].bloomsLevel))
        this.currentBloom.push(coursedata.Co_details[i].bloomsLevel);
      }
    console.log('rwdCourseData', this.rwdCourseData);
    this.rwd_drawtotalattainent(this.rwdCourseData);
   
  }
  drawtotalattainment(chartdata) {
    //alert("draw")
    // if (this.chart2bool) {
      //console.log("chartdata", chartdata)
      this.chart1 =
      {
        chartType: 'ColumnChart',
        dataTable: chartdata,
        options: {
          colors: ['#2d8ea7', '#d3ad5d', '#789d96'],

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
            //top: '50',
            height: '65%',
            width: '100%',
          },
          //width: 700,
          height: 400,

        }
      }
      console.log("chart displayed")
    // }
  }

  rwd_drawtotalattainent(chartdata) {
      console.log("RWD chartdata", chartdata)

    this.rwdchart2 = {
      chartType: "ColumnChart",
      dataTable: chartdata,
      options: {
        // height: 450,
        chartArea: {
          width: "100%",
          left: 50,
          right: 30,
          height: "65%",
        },
        hAxis: {
          title: "Blooms levels with mapped COs",
        },
        vAxis: {
          title: "CO Attainment Value",
          minValue: 0,
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        colors: ['#2d8ea7', '#d3ad5d', '#789d96'],
        //seriesType: "bars",
        bar: {
          groupWidth: "20%",
        },
      },
    }
    console.log("chart displayed")
  }
  backfunction() {
    if (this.backbtn == true) {
      this.backbtn = false
      this.firstchartflag = true
      this.rwdCourseData = [];
      this.currentBloom = [];
    }

  }

  sortFun() {
    if (this.sortOption == "avgCo") {
      if (this.sortOrder == "desc") {
        this.selectedfacultydata.sort(this.avgCoDesc);
      }
      else {
        this.selectedfacultydata.sort(this.avgCoAsc);
      }
    }
    if (this.sortOption == "coName") {
      if (this.sortOrder == "desc") {
        this.selectedfacultydata.sort(this.coNameDesc);
      }
      else {
        this.selectedfacultydata.sort(this.coNameAsc);
      }
    }

    if (this.sortOption == "faName") {
      if (this.sortOrder == "desc") {
        this.selectedfacultydata.sort(this.faNameDesc);
      }
      else {
        this.selectedfacultydata.sort(this.faNameAsc);
      }
    }
  }


  avgCoDesc(a, b) {
    if (a['average_attainment'] < b['average_attainment'])
      return 1;
    if (a['average_attainment'] > b['average_attainment'])
      return -1;
    return 0;
  }

  avgCoAsc(a, b) {
    if (a['average_attainment'] > b['average_attainment'])
      return 1;
    if (a['average_attainment'] < b['average_attainment'])
      return -1;
    return 0;

  }

  coNameDesc(a, b) {
    if (a['courseName'] < b['courseName'])
      return 1;
    if (a['courseName'] > b['courseName'])
      return -1;
    return 0;
    ``
  }

  coNameAsc(a, b) {
    if (a['courseName'] > b['courseName'])
      return 1;
    if (a['courseName'] < b['courseName'])
      return -1;
    return 0;
  }

  faNameDesc(a, b) {
    if (a['facultyName'] < b['facultyName'])
      return 1;
    if (a['facultyName'] > b['facultyName'])
      return -1;
    return 0;
  }

  faNameAsc(a, b) {
    if (a['facultyName'] > b['facultyName'])
      return 1;
    if (a['facultyName'] < b['facultyName'])
      return -1;
    return 0;
  }

  selectCourse(index) {
    // //alert("happened")
    // console.log("data ",data)
    // this.display_1 = !this.display_1
    // this.chart2bool = true;
    // for (let i = 0; i < this.selectedfacultydata.length; i += 1) {
    //   let value = this.selectedfacultydata[i].courseCode
    //   if (data.courseCode == value) {
    //     //alert("matched" + value)
    //     this.bloomname = this.selectedfacultydata[i];
    //     this.tabledata = this.selectedfacultydata[i]
    //     console.log("table data", this.tabledata)
    //     this.totalattainmentdata(this.selectedfacultydata[i]);
    //     console.log(this.bloomname)
    //   }
    // }
    this.tabledata = [];
    this.bloomname = this.selectedfacultydata[index];

    this.totalattainmentdata(this.selectedfacultydata[index]);
    this.rwd_totalattainmentdata(this.selectedfacultydata[index]);

    //this.bloomOrder(this.currentBloom);
    
  }

  //  bloomOrder(bloomData){
   //   for (let i=)
   //   } 


  onClick(event) {
    
    this.tabledata = []
    if(!this.smallScreen){
      for (let i = 0; i < this.bloomname.Co_details.length; i++) {
        if ((("CO" + this.bloomname.Co_details[i].coNumber + "\n" + this.bloomname.Co_details[i].bloomsLevel) == event.column)) {
          this.tabledata.push(this.bloomname.Co_details[i]);
          console.log("on click", this.tabledata)
        }
      }
    }

    else{
      for (let i = 0; i < this.bloomname.Co_details.length; i++) {
        if ((("CO" + this.bloomname.Co_details[i].coNumber) == event.column)) {
          this.tabledata.push(this.bloomname.Co_details[i]);
          console.log("on click", this.tabledata)
        }
      }
    }
    
  }

}

