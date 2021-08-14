import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "../service/analytics.service";
import { Analytics } from "../label-externalisation/analytics";
import { MatDialog } from "@angular/material/dialog";
import { StudentFeedbackComponent } from "./student-feedback/student-feedback.component";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from "@angular/forms";

@Component({
  selector: "app-nba24",
  templateUrl: "./nba24.component.html",
  styleUrls: ["./nba24.component.css"],
})
export class Nba24Component implements OnInit {
  analytics: Analytics = new Analytics();
  //Anish
  termDrop = [];
  academicYearDrop = [];
  defaultYear = null;
  defaultTerm = null;
  searchBar: FormGroup;

  faculty = true;
  hod = false;
  principal = false;

  leftNavPush: string;
  allJsonData;
  data1;
  data2;
  faculty_data = [];
  hod_details = [];
  hod_co_detailsArray = [];
  co_detailsArray = [];
  academicYear = [];
  termNumber = [];
  clickedYear;
  clickedTerm = [];
  visible = true;
  search = true;
  htmlcourse: string;
  rwd_data;
  rwd_data2;
  str: string;
  coNum: string;
  error = false;
  seachEnable = true;
  rwd_DataTable;
  rwd_DataTable2 = [];
  rwd_GraphData = [];
  rwd_enable: boolean;
  // CO_details: any[] = [];
  // Divyansh Singhal
  CO_details: any[] = [];
  methodName: string[] = [];
  attainment: number[] = [];
  attainmentPercentage: number[] = [];
  obtainedScore: number[] = [];
  maxScore: number[] = [];
  imethodName: string[] = [];
  iattainment: number[] = [];
  iattainmentPercentage: number[] = [];
  iobtainedScore: number[] = [];
  xyz: any;
  tp1 = false;
  show_cocurricular: boolean = true;
  arr: any[] = [];
  imaxScore: number[] = [];
  option_1: string = "Industrial Initiatives";
  option_2: number = 0;
  co_curricular_details;
  option_3 = [];
  value: number;
  tablevar: string;
  Keylist = [
    "Method Description",
    "Attainment",
    "Attainment Percentage",
    "Total Obtained Score",
    "Total Max. Score",
  ];
  // Divyansh Singhal
  //charan
  firstChart = true;
  clicked = false;
  avgco_score = 0;
  course_name = 0;
  up_down = 0;
  down_up = 0;
  change_nav;
  new_arr;
  faculty_name = 0;
  var_faculty = true;
  var_hod = false;

  //charan
  bool2 = false;

  secondChart = true;
  constructor(
    private analyticService: AnalyticsService,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) {
    this.searchBar = this.fb.group({
      year: ["2018-19", Validators.required],
      term: [["5"], Validators.required],
    });
  }
  ngOnInit(): void {
    this.analyticService.nba24CoAttainmentData().subscribe((data) => {
      this.allJsonData = data;

      //Anish
      this.termDrop = this.allJsonData["terms"];
      this.academicYearDrop = this.allJsonData["academicYear"];
      this.defaultTerm = this.termDrop[5];
      this.defaultYear = this.academicYearDrop[
        this.academicYearDrop.length - 1
      ];
      this.hod_details = this.allJsonData["hod_details"];
      this.faculty_data = this.allJsonData["faculty_data"];
      this.termNumber = this.faculty_data["termNumber"];
      this.academicYear = this.faculty_data["academicYear"];
      for (let i = 0; i < this.faculty_data.length; i++) {
        this.co_detailsArray[i] = this.faculty_data[i]["Co-details"];
      }
      for (let i = 0; i < this.hod_details.length; i++) {
        this.hod_co_detailsArray[i] = this.hod_details[i]["Co-details"];
      }
    });
    this.clickedYear = this.defaultYear;
    this.clickedTerm = this.defaultTerm;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StudentFeedbackComponent, {
      width: "600px",
      height: "500px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  //likhith here
  isHod() {
    this.hod = true;
  }
  isFaculty() {
    this.faculty = true;
  }
  isPrincipal() {
    this.principal = true;
  }

  searchButton() {
    console.log("Entered..");
    let bool;
    for (let i = 0; i < this.allJsonData["faculty_data"].length; i++) {
      if (
        this.clickedYear == this.allJsonData["faculty_data"][i]["academicYear"]
      ) {
        for (let j = 0; j < this.clickedTerm.length; j++) {
          if (
            this.clickedTerm[j] ==
            this.allJsonData["faculty_data"][i]["termNumber"]
          ) {
            bool = true;
            this.getAttainmentGraphData();
          }
        }
      }
    }
    if (bool != true) {
      this.error = true;
    }
  }
  //gets data for chart
  getAttainmentGraphData() {
    let data_table = [];
    this.rwd_DataTable = [];
    this.search = false;
    this.clicked = true;
    this.error = false;
    this.firstChart = true;
    let graph_data = [];
    if (!this.hod) {
      graph_data = this.allJsonData["faculty_data"];
    } else {
      graph_data = this.allJsonData["hod_details"];
    }
    data_table.push([
      "Courses",
      "Average CO Attainment Value",
      { type: "string", role: "tooltip" },
    ]);
    for (let j = 0; j < this.clickedTerm.length; j++) {
      for (let i = 0; i < graph_data.length; i++) {
        if (this.clickedTerm[j] == graph_data[i]["termNumber"]) {
          if (this.clickedYear == graph_data[i]["academicYear"]) {
            let tooltip =
              "Average CO Attainment Value : " +
              graph_data[i]["average_attainment"];
            data_table.push([
              graph_data[i]["courseName"] +
                "\nSection-" +
                graph_data[i]["section"],
              graph_data[i]["average_attainment"],
              tooltip,
            ]);
          }
        }
      }
    }
    for (let j = 0; j < this.clickedTerm.length; j++) {
      for (let i = 0; i < graph_data.length; i++) {
        if (this.clickedTerm[j] == graph_data[i]["termNumber"]) {
          if (this.clickedYear == graph_data[i]["academicYear"]) {
            let rwd_data_table = [];
            rwd_data_table.push(["Courses", "Average CO Attainment Value"]);
            rwd_data_table.push([
              graph_data[i]["courseName"] +
                "\nSection-" +
                graph_data[i]["section"],
              graph_data[i]["average_attainment"],
            ]);
            this.rwd_DataTable.push(rwd_data_table);
          }
        }
      }
    }
    this.avgCoAttainmentRWDGraph(this.rwd_DataTable);
    this.avgCoAttainmentGraph(data_table);
    //calling the chart function
  }
  avgCoAttainmentRWDGraph(data_table) {
    this.rwd_data = {
      chartType: "ColumnChart",
      dataTable: data_table,
      options: {
        vAxis: {
          title: "Average CO Attainment Value",
          minValue: 0,
          titleTextStyle: {
            bold: true,
          },
        },
        haxis: {
          title: "Courses",
          titleTextStyle: {
            bold: true,
          },
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        chartArea: {
          left: 50,
          right: 30,
          width: "100%",
        },
        colors: ["#7a9d96"],
        bar: {
          groupWidth: "20%",
        },
      },
    };
  }
  //first chart draw
  avgCoAttainmentGraph(data_table) {
    this.data1 = {
      chartType: "ColumnChart",
      dataTable: data_table,
      options: {
        height: 500,
        hAxis: {
          title: "Courses",
          titleTextStyle: {
            bold: true,
          },
        },
        vAxis: {
          title: "Average CO Attainment Value",
          minValue: 0,
          titleTextStyle: {
            bold: true,
          },
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        chartArea: {
          left: 100,
          right: 50,
        },
        colors: ["#7a9d96"],
        bar: {
          groupWidth: "10%",
        },
      },
    };
  }
  //second chart info
  onSelect(event) {
    this.str = event.column;
    this.visible = false;
    this.seachEnable = false;
    let graph_data;
    for (let i = 0; i < this.co_detailsArray.length; i++) {
      if (
        this.str ==
        this.faculty_data[i]["courseName"] +
          "\nSection-" +
          this.faculty_data[i]["section"]
      ) {
        graph_data = this.co_detailsArray[i];
        this.htmlcourse =
          this.str +
          "(" +
          this.faculty_data[i]["courseCode"] +
          ")" +
          " Term - " +
          this.faculty_data[i]["termNumber"];
        this.leftNavPush = this.faculty_data[i]["courseCode"];
      }
    }
    this.getBloomsLevelRWDGraph(graph_data);
    this.getBloomsLevelGraph(graph_data);
  }

  changeNavbar(change_nav) {
    this.visible = false;
    this.seachEnable = false;
    if (this.secondChart) {
      this.secondChart = false;
    } else {
      this.secondChart = true;
    }
    let graph_data = [];
    for (let i = 0; i < this.co_detailsArray.length; i++) {
      if (change_nav == this.faculty_data[i]["courseCode"]) {
        graph_data = this.co_detailsArray[i];
        this.htmlcourse =
          this.faculty_data[i]["courseName"] +
          "\nSection-" +
          this.faculty_data[i]["section"] +
          "(" +
          this.faculty_data[i]["courseCode"] +
          ")" +
          " Term - " +
          this.faculty_data[i]["termNumber"];
      }
    }
    this.getBloomsLevelRWDGraph(graph_data);
    this.getBloomsLevelGraph(graph_data);
  }
  getBloomsLevelRWDGraph(graph_data) {
    this.rwd_enable = true;
    for (let j = 0; j < graph_data.length; j++) {
      let rwd_data_table = [];
      this.rwd_GraphData = graph_data;
      rwd_data_table.push([
        "Blooms levels with mapped COs",
        "Total Attainment",
        "Direct Attainment",
        "Indirect Attainment",
      ]);
      rwd_data_table.push([
        "CO" + graph_data[j]["coNumber"] + "\n" + graph_data[j]["bloomsLevel"],
        graph_data[j]["totalAttainment"],
        graph_data[j]["directAttainment"],
        graph_data[j]["indirectAttainment"],
      ]);
      this.rwd_DataTable2.push(rwd_data_table);
    }
    this.bloomsLevelRWDGraph(this.rwd_DataTable2);
  }

  bloomsLevelRWDGraph(data_table) {
    this.rwd_data2 = {
      chartType: "ColumnChart",
      dataTable: data_table,
      options: {
        height: 300,
        width: 212,
        chartArea: {
          width: "100%",
          left: 50,
          right: 30,
        },
        hAxis: {
          title: "Blooms levels with mapped COs",
          titleTextStyle: {
            bold: true,
          },
        },
        vAxis: {
          title: "CO Attainment Value",
          minValue: 0,
          titleTextStyle: {
            bold: true,
          },
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        colors: ["#2a8cab", "#7d9c94", "#bca07d"],
        //seriesType: "bars",
        bar: {
          groupWidth: "40%",
        },
      },
    };
  }

  getBloomsLevelGraph(graph_data) {
    let data_table2 = [];
    data_table2.push([
      "Blooms levels with mapped COs",
      "Total Attainment",
      { type: "string", role: "tooltip" },
      "Direct Attainment",
      { type: "string", role: "tooltip" },
      "Indirect Attainment",
      { type: "string", role: "tooltip" },
    ]);
    for (let j = 0; j < graph_data.length; j++) {
      let tooltip =
        "Total Attainment :   " +
        graph_data[j]["totalAttainment"] +
        "\n" +
        "Direct Attainment :  " +
        graph_data[j]["directAttainment"] +
        "\n" +
        "Indirect Attainment : " +
        graph_data[j]["indirectAttainment"];

      data_table2.push([
        "CO" + graph_data[j]["coNumber"] + "\n" + graph_data[j]["bloomsLevel"],
        graph_data[j]["totalAttainment"],
        tooltip,
        graph_data[j]["directAttainment"],
        tooltip,
        graph_data[j]["indirectAttainment"],
        tooltip,
      ]);
    }
    this.bloomsLevelGraph(data_table2);
  }

  bloomsLevelGraph(data_table) {
    this.data2 = {
      dataTable: data_table,
      options: {
        height: 450,
        hAxis: {
          title: "Blooms levels with mapped COs",
          titleTextStyle: {
            bold: true,
          },
        },
        vAxis: {
          title: "CO Attainment Value",
          minValue: 0,
          titleTextStyle: {
            bold: true,
          },
        },
        chartArea: {
          width: "100%",
          left: 80,
          right: 50,
        },
        legend: {
          position: "top",
          alignment: "end",
        },
        colors: ["#2a8cab", "#7d9c94", "#bca07d"],
        //seriesType: "bars",
        bar: {
          groupWidth: "20%",
        },
      },
    };
  }
  onSelect2(event) {
    let graph_data = [];
    let index = [];
    this.coNum = event.column;

    for (let i = 0; i < this.co_detailsArray.length; i++) {
      if (
        this.str ==
        this.faculty_data[i]["courseName"] +
          "\nSection-" +
          this.faculty_data[i]["section"]
      ) {
        index.push(i);
        for (let j = 0; j < this.co_detailsArray[i].length; j++) {
          if (
            this.coNum ==
            "CO" +
              this.co_detailsArray[i][j]["coNumber"] +
              "\n" +
              this.co_detailsArray[i][j]["bloomsLevel"]
          ) {
            this.tablevar = "CO" + this.co_detailsArray[i][j]["coNumber"];
            graph_data = this.co_detailsArray[i][j];
            index.push(j);
          }
        }
      }
    }
    this.getTableData(index);
  }
  useSearchAgain() {
    this.clicked = false;
    this.firstChart = false;
    this.search = true;
    this.seachEnable = true;
  }
  go_back() {
    this.visible = true;
    this.seachEnable = true;
    this.firstChart = true;
    this.tp1 = false;
  }
  //till here likhith
  getTableData(index) {
    //console.log("Faculty", this.faculty_data);
    //console.log(this.str);
    this.tp1 = true;
    this.CO_details = this.faculty_data[index[0]]["Co-details"];
    this.methodName = this.CO_details[index[1]].direct_methodName;
    this.attainment = this.CO_details[index[1]].direct_attainment;
    this.attainmentPercentage = this.CO_details[
      index[1]
    ].direct_attainmentPercentage;
    this.obtainedScore = this.CO_details[index[1]].direct_total_obtained_score;
    this.maxScore = this.CO_details[index[1]].direct_total_max_score;
    this.imethodName = this.CO_details[index[1]].indirect_methodName;
    this.iattainment = this.CO_details[index[1]].indirect_attainment;
    this.iattainmentPercentage = this.CO_details[
      index[1]
    ].indirect_attainmentPercentage;
    this.iobtainedScore = this.CO_details[
      index[1]
    ].indirect_total_obtained_score;
    this.imaxScore = this.CO_details[index[1]].indirect_total_max_score;
    this.xyz = this.CO_details[index[1]]["coTitle"];
    // console.log(this.xyz);
    // console.log(this.CO_details[index])
    this.co_curricular_details = this.CO_details[
      index[1]
    ].co_curricular_deatails;
    this.option_3 = this.co_curricular_details[this.option_1];
    // document.getElementById("checked").checked = true;
    this.option_2 = 0;
  }

  //charan
  bordercolour(i) {
    let id = "fac" + i;
    document.getElementById("id").style.borderColor = "blue";
  }
  avgco_sort() {
    this.avgco_score = 1;
    this.course_name = 0;
    this.faculty_name = 0;
    if (this.var_faculty) {
      if (this.avgco_score + this.down_up == 2) {
        //descending
        this.faculty_data.sort(this.cohigh_low);
      } else {
        // ascending
        this.faculty_data.sort(this.colow_high);
      }
    }
    if (this.var_hod) {
      console.log("hi this is caharn");
      if (this.avgco_score + this.down_up == 2) {
        this.hod_details.sort(this.cohigh_low);
      } else {
        console.log("hi this is caharn");
        this.hod_details.sort(this.facultynamelow_high);
      }
    }
  }

  coursename_sort() {
    this.avgco_score = 0;
    this.course_name = 1;
    this.faculty_name = 0;
    if (this.var_faculty) {
      if (this.course_name + this.down_up == 2) {
        //descending
        this.faculty_data.sort(this.coursenamehigh_low);
      } else {
        // ascending
        this.faculty_data.sort(this.coursenamelow_high);
      }
    }
    if (this.var_hod) {
      if (this.course_name + this.down_up == 2) {
        this.hod_details.sort(this.coursenamehigh_low);
      } else {
        this.hod_details.sort(this.facultynamehigh_low);
      }
    }
  }
  facultyname_sort() {
    this.avgco_score = 0;
    this.course_name = 0;
    this.faculty_name = 1;
    if (this.faculty_name + this.down_up == 2) {
      this.hod_details.sort(this.facultynamehigh_low);
    } else {
      this.hod_details.sort(this.facultynamelow_high);
    }
  }

  high_lowsort() {
    this.up_down = 0;
    this.down_up = 1;
    if (this.var_faculty) {
      if (this.avgco_score + this.down_up == 2) {
        //descending
        this.faculty_data.sort(this.cohigh_low);
      } else {
        //descending
        this.faculty_data.sort(this.coursenamelow_high);
      }
    }
    if (this.var_hod) {
      if (this.avgco_score + this.down_up == 2) {
        this.hod_details.sort(this.cohigh_low);
      } else if (this.down_up + this.faculty_name == 2) {
        this.hod_details.sort(this.facultynamehigh_low);
      } else {
        this.hod_details.sort(this.coursenamehigh_low);
      }
    }
  }

  low_highsort() {
    this.up_down = 1;
    this.down_up = 0;
    if (this.var_faculty) {
      if (this.avgco_score + this.up_down == 2) {
        // ascending
        this.faculty_data.sort(this.colow_high);
      } else {
        // ascending
        this.faculty_data.sort(this.coursenamehigh_low);
      }
    }
    if (this.var_hod) {
      if (this.avgco_score + this.up_down == 2) {
        this.hod_details.sort(this.colow_high);
      } else if (this.up_down + this.faculty_name == 2) {
        this.hod_details.sort(this.facultynamelow_high);
      } else {
        this.hod_details.sort(this.coursenamelow_high);
      }
    }
  }

  cohigh_low(a, b) {
    if (a.average_attainment < b.average_attainment) {
      return 1;
    }
    if (a.average_attainment > b.average_attainment) {
      return -1;
    }
    return 0;
  }
  colow_high(a, b) {
    if (a.average_attainment < b.average_attainment) {
      return -1;
    }
    if (a.average_attainment > b.average_attainment) {
      return 1;
    }
    return 0;
  }

  coursenamehigh_low(a, b) {
    if (a.courseName < b.courseName) {
      return 1;
    }
    if (a.courseName > b.courseName) {
      return -1;
    }
    return 0;
  }

  coursenamelow_high(a, b) {
    if (a.courseName < b.courseName) {
      return -1;
    }
    if (a.courseName > b.courseName) {
      return -1;
    }
    return 0;
  }

  facultynamehigh_low(a, b) {
    if (a.facultyName < b.facultyName) {
      return 1;
    }
    if (a.facultyName > b.facultyName) {
      return -1;
    }
    return 0;
  }

  facultynamelow_high(a, b) {
    if (a.facultyName < b.facultyName) {
      return -1;
    }
    if (a.facultyName > b.facultyName) {
      return -1;
    }
    return 0;
  }

  //charan ends

  //Divyansh
  select_radio_option() {
    this.option_3 = this.co_curricular_details[this.option_1];
  }

  onClickActivity(event) {
    console.log("onClickActivity", event.value);
    this.option_2 = event.value;
  }
  select_radio_button() {
    this.show_cocurricular = true;
    if (this.option_2 == 0) {
      return 0;
    } else {
      return 1;
    }
    console.log(this.option_2);
  }

  calculate_len(arr) {
    if (arr == null) {
      return 3;
    }
    return 3 - arr.length;
  }
  // Divyansh
}
