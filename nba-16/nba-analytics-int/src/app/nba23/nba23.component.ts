import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../service/analytics.service';
import { Analytics } from '../label-externalisation/analytics';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { co } from '../shared/models/co.model';
import { GoogleChartInterface } from "ng2-google-charts";
import { element } from 'protractor';



@Component({
  selector: 'app-nba23',
  templateUrl: './nba23.component.html',
  styleUrls: ['./nba23.component.css']
})
export class Nba23Component implements OnInit {
  searchBar: FormGroup;
  role = "FACULTY"
  analytics: Analytics = new Analytics()
  co_attainement_data = []
  selectedfaculty: number = 2;
  facultyData: any[] = [];
  faculty: any[] = [];

  //jagtar
  academic_years = []
  departments = []
  terms = []
  show_search: boolean = true;
  co_curricular_details;
  card_array = [];
  methodName: string[] = [];
  attainment: number[] = [];
  Keylist = ["Method Description", "Attainment", "Attainment Percentage", "Total Obtained Score", "Total Max. Score"]
  attainmentPercentage: number[] = [];
  obtainedScore: number[] = [];
  maxScore: number[] = [];
  imethodName: string[] = [];
  iattainment: number[] = [];
  iattainmentPercentage: number[] = [];
  iobtainedScore: number[] = [];
  imaxScore: number[] = [];
  industrial_initiatives: string[] = [];
  cotitle: string = "";
  table2Data = [];
  filteredCOdata: co;
  showCO: boolean = false;
  selectedCO: number = 1;
  selectedCoCu: string = "Industrial Initiatives";
  faclength: number = 0;
  course_code: string
  coursename;
  //Graph objects
  data1;
  data2;
  responsiveDataTable;
  rwdData2;
  acadYr = [];
  termNo = [];
  bloomDetails = [];
  COblooms = [];
  coDetails = [];
  facData = [];
  isClicked = false;
  isSelected = false;
  error = true;
  displayChart: boolean = false;
  responsive_dataTable = [];
  str: string;
  rwd_DataTable;
  isDisabled = false;
  selected_year: string;
  average: string = 'true';
  cname: string = 'false';
  fname: string = 'false';
  reverse: string = 'true';
  show_first_graph: boolean = false;
  show_second_graph: boolean = false;
  show_warning: boolean = true;
  noData: boolean;
  Str: string;
  respo: boolean;
  rwdSelected: boolean;
  //Graph objects end
  displayrwd: boolean = true;

  viewrwd: boolean = false;
  selected_dept: any;

  constructor(private analyticsService: AnalyticsService, private fb: FormBuilder) {
    if (this.role == "PRINCIPAL") {
      this.searchBar = this.fb.group({
        year: ['2019-20', Validators.required],
        term: [['1'], Validators.required],
        course: ['CS', Validators.required],
      });


    }
    this.searchBar = this.fb.group({
      year: ['2018-19', Validators.required],
      term: [['5'], Validators.required],
    });
  }

  ngOnInit(): void {

    this.analyticsService.nba23CoAttainmentData().subscribe((data) => {

      this.co_attainement_data = data
      //Jagtar
      this.academic_years = this.co_attainement_data['academicYear']
      this.departments = this.co_attainement_data['departments']
      this.terms = this.co_attainement_data['terms']

      this.co_attainement_data['faculty_data'].forEach(element => {
        this.facultyData.push(element);
      });

      //Graph
      this.acadYr = this.co_attainement_data["academicYear"];
      this.termNo = this.co_attainement_data["termNumber"];
      switch (this.role) {
        case 'FACULTY': {
          this.facData = this.co_attainement_data["faculty_data"];
          break;
        }
        case 'PRINCIPAL': {
          this.facData = this.co_attainement_data["faculty_data"];
          break;
        }
        case 'HOD': {
          this.facData = this.co_attainement_data["hod_details"];
          break;
        }
        default: {
          this.facData = this.co_attainement_data["faculty_data"];
          break;
        }
      }

      for (let i = 0; i < this.facData.length; i++) {
        this.coDetails[i] = this.facData[i]["Co-details"];
      }
    })

    this.sortfunc();
  }
  //Graph Code starts here
  getAvgCoAttainmentGraph() {
    this.faculty = [];
    this.faclength = 0;
    this.responsiveDataTable = []
    this.show_first_graph = true;
    this.show_warning = false;
    this.show_second_graph = false;
    let count = 0;
    let count2 = 0;
    this.isClicked = false;
    this.isDisabled = false;
    this.showCO = false;
    let data_table = []
    let graphData = [];
    switch (this.role) {
      case 'FACULTY': {
        graphData = this.co_attainement_data["faculty_data"];
        break;
      }
      case 'PRINCIPAL': {
        graphData = this.co_attainement_data["faculty_data"];
        break;
      }
      case 'HOD': {
        graphData = this.co_attainement_data["hod_details"];
        break;
      }
      default: {
        graphData = this.co_attainement_data["faculty_data"];
        break;
      }
    }
    console.log(graphData);

    data_table.push(["Courses", "Average CO Attainment Value", { type: 'string', role: 'tooltip' }]);
    this.selected_year = this.searchBar.value.year;
    this.selected_dept = this.searchBar.value.course;
    console.log("Dept :",this.selected_dept);
    

    for (let j = 0; j < this.searchBar.value.term.length; j++) {
      for (let i = 0; i < graphData.length; i++) {
        if (this.searchBar.value.term[j] == graphData[i]["termNumber"]) {
          if (this.selected_year == graphData[i]["academicYear"]) {
            let responsive_data_table = [];
            responsive_data_table.push(["Courses", "Average CO Attainment Value"]);
            responsive_data_table.push([
              graphData[i]["courseName"] +
              "\nSection-" +
              graphData[i]["section"],
              graphData[i]["average_attainment"],
            ]);
            this.responsive_dataTable.push(responsive_data_table);
          }
        }
      }
    }
    console.log("rwd : ", this.responsive_dataTable);


    for (let j = 0; j < this.searchBar.value.term.length; j++) {
      if (this.role == 'PRINCIPAL') {
        for (let i = 0; i < graphData.length; i++) {
          if (this.searchBar.value.term[j] == graphData[i]["termNumber"]) {
            if (this.selected_year == graphData[i]["academicYear"] && this.selected_dept == graphData[j]["deptId"]) {
              count2++;
              if (this.faclength == 0) {
                this.faculty.push(graphData[i]);
              }
              data_table.push([
                graphData[i]["courseName"] + "\nSection-" + graphData[i]["section"],
                graphData[i]["average_attainment"],
                'Average CO Attainment Value : ' + graphData[i]["average_attainment"]
              ]);
            }
          }
        }
      }
      else if (this.role == 'FACULTY') {
        for (let i = 0; i < graphData.length; i++) {
          if (this.searchBar.value.term[j] == graphData[i]["termNumber"]) {
            if (this.selected_year == graphData[i]["academicYear"]) {
              count++;
              if (this.faclength == 0) {
                this.faculty.push(graphData[i]);
              }
              data_table.push([
                graphData[i]["courseName"] + "\nSection-" + graphData[i]["section"],
                graphData[i]["average_attainment"],
                'Average CO Attainment Value : ' + graphData[i]["average_attainment"]
              ]);
            }
          }
        }
      }
    }
    console.log("Normal :", data_table);
    console.log("Faculty", this.faculty)

    if (count == 0 && count2 == 0)
      this.noData = true;
    else
      this.noData = false;

    this.faclength = this.faculty.length;
    this.postResponsiveCourseGraph(this.responsive_dataTable);
    this.postAvgCoAttainmentGraph(data_table);
  }
  postResponsiveCourseGraph(tableData) {
    this.responsiveDataTable = {
      chartType: "ColumnChart",
      dataTable: tableData,
      options: {
        height: 300,
        hAxis: {
          title: "Courses",
          titleTextStyle: {
            bold: true
          }
        },
        vAxis: {
          title: "Average CO Attainment Value",
          ticks: [0, 4, 8, 12, 16],
          titleTextStyle: {
            bold: true
          }
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        colors: ["#7a9d96"],
        bar: {
          groupWidth: "7%",
        }
      }
    };
  }
  postAvgCoAttainmentGraph(tableData) {
    //console.log(tableData)
    this.data1 = {
      chartType: "ColumnChart",
      dataTable: tableData,
      options: {
        height: 400,
        hAxis: {
          title: "Courses",
        },
        vAxis: {
          title: "Average CO Attainment Value",
          ticks: [0, 4, 8, 12, 16]
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        colors: ["#7a9d96"],
        bar: {
          groupWidth: "7%",
        }
      }
    };
  }
  Colevelsfilter() {

    this.COblooms = [];


    let blooms: string[] = [];
    let CObloom = [];
    this.faculty.forEach(element => {
      element['Co-details'].forEach(e => {
        if (!blooms.includes(e.bloomsLevel)) {
          blooms.push(e.bloomsLevel);
        }

      })
      this.bloomDetails.push(blooms);
      blooms = [];
    });

    // this.bloomDetails = blooms;

    for (let j = 0; j < this.bloomDetails.length; j++) {
      let subCObloom = [];

      for (let i = 0; i < this.bloomDetails[j].length; i++) {

        subCObloom.push(this.faculty[j]['Co-details'].filter(co => co.bloomsLevel == this.bloomDetails[j][i]));

      };
      console.log("sub",subCObloom);
      CObloom.push(subCObloom);
    
    this.COblooms.push(CObloom);
    CObloom = [];

    } 
  

    console.log("COblooms", this.COblooms);
    console.log("blooms", this.bloomDetails);
  }
courseBarSelect(event) {
  this.show_first_graph = false;
  this.show_second_graph = true;
  this.isDisabled = true;
  this.str = event.column;
  this.isClicked = true;
  let tableData2 = [];
  let graphData = [];

  console.log('returned event', event);
  console.log('codetails', this.coDetails);

  for (let i = 0; i < this.coDetails.length; i++) {
    if ((this.str == this.facData[i]["courseName"] + "\nSection-" +
      this.facData[i]["section"]) && this.selected_year == this.facData[i]['academicYear']) {
      this.course_code = this.facData[i]['courseCode'];
      this.coursename = this.facData[i];
      graphData = this.coDetails[i];
      console.log('graphdata', graphData);
      break;
    }
  }

  tableData2.push([
    "Blooms levels with mapped COs",
    "Total Attainment", { type: 'string', role: 'tooltip' },
    "Direct Attainment", { type: 'string', role: 'tooltip' },
    "Indirect Attainment", { type: 'string', role: 'tooltip' }
  ]);

  for (let j = 0; j < graphData.length; j++) {
    let tooltip = "Total Attainment : " + graphData[j].totalAttainment +
      "\n Direct Attainment : " + graphData[j].directAttainment +
      "\n Indirect Attainment : " + graphData[j].indirectAttainment;
    tableData2.push([
      "CO" + graphData[j]["coNumber"] + "\n" + graphData[j]["bloomsLevel"],
      graphData[j]["totalAttainment"], tooltip,
      graphData[j]["directAttainment"], tooltip,
      graphData[j]["indirectAttainment"], tooltip
    ]);
  }
  console.log("Graph 2",tableData2);
  
  //call second graph fn
  this.table2Data = graphData;
  this.postMyCourseGraph(tableData2);
  this.Colevelsfilter();
  this.bloomsLevelgraph(0, 0);

}

bloomsLevelgraph(i, j) {

  this.displayrwd = !this.displayrwd;

  this.rwdSelected = false;
  this.rwd_DataTable = [];
  for (let k = 0; k < this.COblooms[i][0][j].length; k++) {
        
    console.log('arr',this.COblooms[i][0][j][k]);
    let rwd_data_table2 = [];
    rwd_data_table2.push([
      "Blooms levels with mapped COs",
      "Total Attainment", { type: 'string', role: 'tooltip' },
      "Direct Attainment", { type: 'string', role: 'tooltip' },
      "Indirect Attainment", { type: 'string', role: 'tooltip' },
    ]);
    let tooltip = "Total Attainment : " + this.COblooms[i][0][j][k].totalAttainment +
      "\n Direct Attainment : " + this.COblooms[i][0][j][k].directAttainment +
      "\n Indirect Attainment : " + this.COblooms[i][0][j][k].indirectAttainment;
    rwd_data_table2.push([
      "CO" + this.COblooms[i][0][j][k]["coNumber"] + "\n" + this.COblooms[i][0][j][k]["bloomsLevel"],
      this.COblooms[i][0][j][k]["totalAttainment"], tooltip,
      this.COblooms[i][0][j][k]["directAttainment"], tooltip,
      this.COblooms[i][0][j][k]["indirectAttainment"], tooltip
    ]);
    this.rwd_DataTable.push(rwd_data_table2);
  }

  console.log('rwd', this.rwd_DataTable);
  this.postRwdGraph2(this.rwd_DataTable);


}

onSelect(event) {
  console.log(event.isTrusted);
  this.rwdSelected = true;

  console.log("table2data", this.table2Data);
  console.log("fitered data", this.filteredCOdata);

  if (event.isTrusted == true) { }
  else {
    this.str = event.column;
    var st: string = this.str[2];
    var index: number = +st;

    this.filteredCOdata = this.table2Data[index - 1];
  }
  console.log("Hey", this.filteredCOdata);
  this.showCO = true;
  this.methodName = this.filteredCOdata.direct_methodName;
  this.attainment = this.filteredCOdata.direct_attainment;
  this.attainmentPercentage = this.filteredCOdata.direct_attainmentPercentage;
  this.obtainedScore = this.filteredCOdata.direct_total_obtained_score;
  this.maxScore = this.filteredCOdata.direct_total_max_score;
  this.imethodName = this.filteredCOdata.indirect_methodName;
  this.iattainment = this.filteredCOdata.indirect_attainment;
  this.iattainmentPercentage = this.filteredCOdata.indirect_attainmentPercentage;
  this.iobtainedScore = this.filteredCOdata.indirect_total_obtained_score;
  this.imaxScore = this.filteredCOdata.indirect_total_max_score;
  this.co_curricular_details = this.filteredCOdata.co_curricular_deatails;
  this.card_array = this.co_curricular_details[this.selectedCoCu];
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
        groupWidth: "25%",
      },
    }
  };
}
postRwdGraph2(tableData) {

  console.log("table data", tableData);
  this.rwdData2 = {
    dataTable: tableData,
    // chartType: "ColumnChart",
    options: {
      height: 400,
      hAxis: {
        title: "Blooms levels with mapped COs",
      },
      vAxis: {
        title: "CO Attainment Value",
      },
      legend: {
        position: "top",
        alignment: "end",
      },
      colors: ["#2d8ea7", "#7a9d96", "#bda07d"],
      bar: {
        groupWidth: "25%",
      },
    }
  };
}
//Graph code ends here

ComparatorCorev(a, b) {
  if (a['courseName'] < b['courseName']) return 1;
  if (a['courseName'] > b['courseName']) return -1;
  return 0;
}
ComparatorCo(a, b) {
  if (a['courseName'] < b['courseName']) return -1;
  if (a['courseName'] > b['courseName']) return 1;
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


ComparatorAvrev(a, b) {

  if (a['average_attainment'] < b['average_attainment']) return 1;
  if (a['average_attainment'] > b['average_attainment']) return -1;
  return 0;
}
ComparatorAv(a, b) {
  if (a['average_attainment'] < b['average_attainment']) return -1;
  if (a['average_attainment'] > b['average_attainment']) return 1;
  return 0;
}


sortfunc() {

  if (this.average == 'true') {
    if (this.reverse == 'true') {
      this.faculty.sort(this.ComparatorAvrev);
    }
    else {
      this.faculty.sort(this.ComparatorAv);
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
ifSelect(event) {
  this.getAvgCoAttainmentGraph();
}

onCoselection() {
  this.card_array = this.co_curricular_details[this.selectedCoCu];
}

courseSelected(i, sub) {

  this.course_code = sub.courseCode;

  console.log(this.faculty);
  this.coursename = this.facData[i];
  //console.log(i);
  this.isDisabled = true;
  //console.log(this.faculty[i]['Co-details']);
  this.table2Data = this.faculty[i]['Co-details'];
  this.isClicked = true;
  let tableData2 = [];
  tableData2.push([
    "Blooms levels with mapped COs",
    "Total Attainment", { type: 'string', role: 'tooltip' },
    "Direct Attainment", { type: 'string', role: 'tooltip' },
    "Indirect Attainment", { type: 'string', role: 'tooltip' }
  ]);

  this.faculty[i]['Co-details'].forEach(e => {
    let tooltip = "Total Attainment : " + e["totalAttainment"] +
      "\n Direct Attainment : " + e["directAttainment"] +
      "\n Indirect Attainment : " + e["indirectAttainment"];
    tableData2.push([
      "CO" + e["coNumber"] + "\n" + e["bloomsLevel"],
      e["totalAttainment"], tooltip,
      e["directAttainment"], tooltip,
      e["indirectAttainment"], tooltip
    ]);
  })
  //console.log(tableData2);
  this.postMyCourseGraph(tableData2);
}
}




