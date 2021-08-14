import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../service/analytics.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Analytics } from '../label-externalisation/analytics';

@Component({
  selector: 'app-nba26',
  templateUrl: './nba26.component.html',
  styleUrls: ['./nba26.component.css']
})

export class Nba26Component implements OnInit {
  label = new Analytics();
  public data: GoogleChartInterface;
  no_of_entries = ['1-10', '11-20', '20-30']
  academic_year = [];
  terms = [];
  faculty_data = [];
  po_details = [];
  rwd_po_chart = [];
  freq = [];
  responsive_data;
  responsive_data_accordion_chart;
  responsiveView: boolean
  first_chart_view = true;
  individual_po_chart_data;
  selected_year;
  selected_term: any[];
  selected_branch;
  bool = false;
  error = false;
  cart_data = [];
  branches = ["CS", "ECE", "BIO", "MEC"];
  user: number;
  clicked = false;
  property_button1: string = 'null';
  property_button2: string = 'null';
  faculty: any[] = [];
  responsiveDatatable;
  bool2 = false;
  show_table = false;
  notshowcourselist = true;
  course_details;
  po_number;
  co_details = [];
  display_chart: boolean;
  course_number;
  course_code;
  constructor(private faculty_service: AnalyticsService) { }

  ngOnInit(): void {
    this.faculty_service.nba26FacultyData().subscribe(data => {
      this.faculty_data = data['faculty_data'];
      this.terms = this.faculty_data['semesters'];
      this.academic_year = this.faculty_data['academic_year'];
      this.user = 0;
    });

    this.sort();
    this.sort1();
  }

  isPresent(array: number[], num: number) {
    for (let i = 0; i < array.length; i++) {
      if (num == array[i])
        return true;
    }
    return false;
  }

  drawChart() {
    // this.responsiveView = true
    this.responsiveDatatable = []
    this.clicked = true;
    let total_data = this.faculty_data['total_attainmnet_data'];
    let po: number[] = [];
    let courses: string[] = []
    let dataTable = [];
    let sections: string[] = [];
    this.cart_data = [];
    this.po_details = [];
    this.freq = [];
    console.log(this.selected_term);
    for (let i = 0; i < total_data.length; i++) {
      //for faculty, instead of '462', it can be the retrieved faculty_id for the user 
      if (this.user == 0) {
        if (this.isPresent(this.selected_term, total_data[i]['termNumber']) && this.selected_year == total_data[i]['academic_year'] && total_data[i]['facultyId'] == 462) {
          courses.push(total_data[i]['courseName']);
          po.push(total_data[i]['po_average_attainment']);
          sections.push(total_data[i]['section']);
          this.cart_data.push(total_data[i]);
          this.po_details.push(total_data[i]['po_wise_attainment']);
          this.freq.push(total_data[i]['po_wise_attainment'].length);
        }
      }
      //for HOD
      if (this.user == 1) {
        if (this.selected_term == total_data[i]['termNumber'] && this.selected_year == total_data[i]['academic_year']) {
          courses.push(total_data[i]['courseName']);
          po.push(total_data[i]['po_average_attainment']);
          sections.push(total_data[i]['section']);
          this.cart_data.push(total_data[i]);
          this.po_details.push(total_data[i]['po_wise_attainment']);
        }
      }
      //for Principal
      if (this.user == 2) {
        if (this.selected_term == total_data[i]['termNumber'] && this.selected_year == total_data[i]['academic_year'] && this.selected_branch == total_data[i]['deptId']) {
          courses.push(total_data[i]['courseName']);
          po.push(total_data[i]['po_average_attainment']);
          sections.push(total_data[i]['section']);
          this.cart_data.push(total_data[i]);
          this.po_details.push(total_data[i]['po_wise_attainment']);
        }
      }
    }
    for (let j = 0; j < this.po_details.length; j++) {
      for (let k = 0; k < this.po_details[j].length; k++) {
        let dummy = [];
        dummy.push(["PO Number", "PO Attainment Value"])
        dummy.push(["PO" + this.po_details[j][k]['poNumber'], this.po_details[j][k]['po_attainment']])
        this.rwd_po_chart.push(dummy);
      }
    }

    for (let j = 0; j < courses.length; j++) {
      let responsive_dataTable = []
      responsive_dataTable.push(["Course", "Average PO Attainment Value"
        , { type: 'string', role: 'tooltip' }
      ])
      responsive_dataTable.push([courses[j] + " Section " + "- " + sections[j], po[j],
      "Average PO Attainment Value : " + po[j]]);
      this.responsiveDatatable.push(responsive_dataTable)
    }
    console.log('responsiveDatatable', this.responsiveDatatable)
    this.error = false;
    this.first_chart_view = true
    this.responsiveChartAveragePo(this.responsiveDatatable)
    this.responsiveChartAccordion(this.rwd_po_chart);
    dataTable.push(["Course", "Average PO Attainment Value"
      , { type: 'string', role: 'tooltip' }
    ])

    for (let j = 0; j < courses.length; j++) {
      dataTable.push([courses[j] + " Section " + "- " + sections[j], po[j],
      "Average PO Attainment Value : " + po[j]]);

    }
    if (courses.length == 0)
      this.error = true;

    else
      this.error = false;
    this.first_chart_view = true
    this.setChartAveragePo(dataTable)



  }

  //rwd chart 1 setting function
  responsiveChartAveragePo(dataTable) {
    this.responsive_data =
    {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      options:
      {
        height: 300,
        width: 340,
        vAxes: {
          // Adds titles to each axis.
          0: {
            title: 'Average PO Attainment Value',
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
        hAxes: {
          // Adds titles to each axis.
          0: {
            title: 'Courses', titleTextStyle: {
              bold: true,
            }
          },
        },
        colors: ["#789d96"],
        bar: {
          groupWidth: '20%'
        },
        // chartArea: {
        //   left: 100,
        //   height: '65%',
        //   width: '100%',
        // },
        legend: {
          position: "top",
          alignment: "center",
          display: true,
        },
      }
    }
  }
  //rwd chart 2 setting function
  responsiveChartAccordion(dataTable) {
    this.responsive_data_accordion_chart =
    {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      options:
      {
        height: 300,
        //width: 220,
        vAxes: {
          // Adds titles to each axis.
          0: {
            title: 'PO Attainment Value',
            baseline: 0,
            viewWindow: {
              max: 100,
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
            title: 'Program Outcomes', titleTextStyle: {
              bold: true,
            }
          },
        },
        colors: ["#789d96"],
        bar: {
          groupWidth: '20%'
        },
        chartArea: {
          left: 100,
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

  // displayed Attainment chart
  setChartAveragePo(dataTable) {
    // console.log('ins', dataTable)
    this.data =
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
            title: 'Average PO Attainment Value',
            baseline: 0,
            viewWindow: {
              max: 100,
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
        colors: ["#789d96"],
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

  display() {
    this.bool = false;
    this.first_chart_view = true;
    this.show_table = false;
  }

  //function to draw second chart
  onSelect(event, s1: string, s2: string, num: number) {
    this.bool = true;
    let str: string;
    let total_data = this.faculty_data['total_attainmnet_data'];
    let po_data = [];
    let names: string[] = [];
    let numbers: number[] = [];
    let dataTable = [];

    if (event != null && s1 == '' && s2 == '')
      str = event.column

    else if (event == null && s1 != '')
      str = s1 + " Section " + "- " + s2

    else
      str = this.course_details;

    this.course_details = str;
    console.log(str)
    for (let i = 0; i < total_data.length; i++) {
      if (str == total_data[i]['courseName'] + " Section " + "- " + total_data[i]['section']) {
        po_data = total_data[i]['po_wise_attainment'];
        this.course_code = total_data[i]['courseCode'];
      }
    }

    for (let j = 0; j < po_data.length; j++) {
      names.push(po_data[j]['poNumber']);
      numbers.push(po_data[j]['po_attainment']);
    }
    //sorting of individual po_data
    if (num != 0) {
      for (let i = 0; i < numbers.length - 1; i++) {
        for (let k = 0; k < numbers.length - i - 1; k++) {
          //for ascending
          if (num == 1) {
            if (numbers[k] > numbers[k + 1]) {
              [numbers[k], numbers[k + 1]] = [numbers[k + 1], numbers[k]];
              [names[k], names[k + 1]] = [names[k + 1], names[k]];
            }
          }
          //for descending
          if (num == 2) {
            if (numbers[k] < numbers[k + 1]) {
              [numbers[k], numbers[k + 1]] = [numbers[k + 1], numbers[k]];
              [names[k], names[k + 1]] = [names[k + 1], names[k]];
            }
          }
        }
      }
    }

    dataTable.push(["PO Number", "PO Attainment Value", { type: 'string', role: 'tooltip' }])
    for (let j = 0; j < numbers.length; j++) {
      dataTable.push(["PO" + names[j], numbers[j],"PO Attainment Value : "+numbers[j]]);
    }
    this.setChartIndividualPo(dataTable)
    this.displayTable();
  }

  setChartIndividualPo(dataTable) {
    this.individual_po_chart_data =
    {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      options:
      {
        height: 350,
        //width: 440,
        vAxes: {
          // Adds titles to each axis.
          0: {
            title: 'PO Attainment Value',
            baseline: 0,
            viewWindow: {
              max: 100,
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
            title: 'Program Outcomes', titleTextStyle: {
              bold: true,
            }
          },
        },
        colors: ["#789d96"],
        bar: {
          groupWidth: '25%'
        },
        chartArea: {
          // left: 100,
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

  //table
  displayTable() {
    this.bool2 = true
    let total_data = this.faculty_data['total_attainmnet_data'];
    let podata = [];
    for (let i = 0; i < total_data.length; i++) {
      if (this.course_details == total_data[i]['courseName'] + " Section " + "- " + total_data[i]['section']) {
        podata = total_data[i]['po_wise_attainment'];
      }
    }
    this.po_number = "PO" + podata[0].poNumber;
    this.co_details = podata[0]['co_details'];

  }

  changeSearch() {
    this.clicked = false;
    this.first_chart_view = false;
    if (this.bool2 == true && this.bool == false) {
      this.bool2 = false;
    }
  }

  getTable(event) {
    this.po_number = event.column;
    let total_data = this.faculty_data['total_attainmnet_data'];
    let po_data = [];

    for (let i = 0; i < total_data.length; i++) {
      if (this.selected_term == total_data[i]['termNumber'] && this.selected_year == total_data[i]['academic_year']) {
        if (this.course_details == total_data[i]['courseName'] + " Section " + total_data[i]['section'])
          po_data = (total_data[i]['po_wise_attainment']);
      }
    }

    let ponum: number = this.po_number[2];
    for (let i = 0; i < po_data.length; i++) {
      if (po_data[i].poNumber == ponum) {
        this.co_details = po_data[i]['co_details'];
      }

    }
  }

  getTablerwd(event, numb: number) {
    this.show_table = true;
    this.notshowcourselist = false;
    this.po_number = event.column;
    this.course_number = numb;
    let coursedata = [];
    let po_data = [];

    coursedata = this.cart_data[this.course_number];
    po_data = coursedata['po_wise_attainment'];

    let po_num: number = this.po_number[2];
    for (let i = 0; i < po_data.length; i++) {
      if (po_data[i].poNumber == po_num) {
        this.co_details = po_data[i]['co_details'];
      }

    }

  }





  //left pane

  Comparator1(a, b) {
    if (a['courseName'] < b['courseName'])
      return 1;
    if (a['courseName'] > b['courseName'])
      return -1;
    return 0;
  }
  Comparator2(a, b) {
    if (a['courseName'] < b['courseName'])
      return -1;
    if (a['courseName'] > b['courseName'])
      return 1;
    return 0;
  }
  Comparator3(a, b) {
    if (a['po_average_attainment'] < b['po_average_attainment'])
      return 1;
    if (a['po_average_attainment'] > b['po_average_attainment'])
      return -1;
    return 0;
  }
  Comparator4(a, b) {
    if (a['po_average_attainment'] < b['po_average_attainment'])
      return -1;
    if (a['po_average_attainment'] > b['po_average_attainment'])
      return 1;
    return 0;
  }

  sort() {
    if (this.property_button1 == 'true') {
      if (this.property_button2 == 'true') {
        this.display_chart = !this.display_chart;
        this.onSelect(null, '', '', 2);
      }
      else {
        this.display_chart = !this.display_chart;
        this.onSelect(null, '', '', 1);
      }
    }
    else {
      if (this.property_button2 == 'true') {
        this.cart_data.sort(this.Comparator1);
      }
      else {
        this.cart_data.sort(this.Comparator2);
      }
    }

  }
  sort1() {
    if (this.property_button1 == 'true') {
      if (this.property_button2 == 'true') {
        this.cart_data.sort(this.Comparator3);
      }
      else {
        this.cart_data.sort(this.Comparator4);
      }
    }
    else {
      if (this.property_button2 == 'true') {
        this.cart_data.sort(this.Comparator1);
      }
      else {
        this.cart_data.sort(this.Comparator2);
      }
    }

  }





  average_po() {
    this.responsiveView = false
    this.drawChart()
  }
  average_po_course_wise() {
    this.responsiveView = true
    this.drawChart()
  }
}

