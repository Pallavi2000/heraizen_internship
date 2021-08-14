import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from "../../service/analytics.service";
import { Analytics } from "../../label-externalisation/analytics";
import { MatTableDataSource, MatSort } from '@angular/material';
import * as jsondata from '../../../assets/analytics-data/nba25-data.json';
// import { Analytics } from "../label-externalisation/analytics";

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.css']
})
export class StudentFeedbackComponent implements OnInit {

  analytics: Analytics = new Analytics();
  allJsonData;
  faculty_data;
  feedback;
  cumscore;
  temp;
  names = [];
  usn = [];
  marks_given = [];
  temp2;

  dataSource;
  displayedColumns = [];
  columnNames = [];
  category : string = "Timeliness";
	question : string = "Does the faculty conduct classes on time?";

  constructor(private analyticService: AnalyticsService) { }

  ngOnInit(): void {
    this.analyticService.nba24CoAttainmentData().subscribe((data) => {
    this.allJsonData = data;
    
    this.temp = this.allJsonData.faculty_data[0].student_feedback_details["Time Sense"]["0"]["questionwise_details"]["1"].students_answered;
    this.cumscore = JSON.stringify(this.allJsonData.faculty_data[0].student_feedback_details["Time Sense"]["0"]["cumulative_score"]);
    });
  }
}

