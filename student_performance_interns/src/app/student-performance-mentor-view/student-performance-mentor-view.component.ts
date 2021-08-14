import { Component, OnInit, ViewChild } from '@angular/core';
import { viewClassName } from '@angular/compiler';
import { StudentPerformanceMentorViewService } from './student-performance-mentor-view.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-performance-mentor-view',
  templateUrl: './student-performance-mentor-view.component.html',
  styleUrls: ['./student-performance-mentor-view.component.css']
})

export class StudentPerformanceMentorViewComponent implements OnInit {
  second_page: boolean;
  third_page: boolean;
  curricular:boolean;
  academic:boolean=true;
  skill:boolean;

  Year: string;
  dept:string;
  sem:string;
  section:string;
  flag:boolean=false;

  name:string;
  usn:string;

  constructor(private mentorservice : StudentPerformanceMentorViewService ) { }

  students_data = [];
  academicYear = [];
  departments = [];
  sections = [];
  semesters = [];
  student_details = [];
  course_result = [];
  committee = [];
  project = [];
  internship = [];
  publication = [];
  patent = [];
  certificate = [];
  Mentor_Meeting = [];
  attendance = [];

  student_array:any[];
  data = [];
  record = [];
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {

    this.mentorservice.get_student_details()
      .subscribe(data => {
        let students_data = data;

        this.academicYear = students_data['academicYear'];
        this.departments = students_data['departments'];
        this.sections = students_data['section'];
        this.semesters = students_data['terms'];
       
        this.data = students_data['student_details'];
        console.log(this.data.length)

        console.log(this.academicYear,this.departments,this.sections,this.semesters);

        this.student_details = students_data['student_details'][0];

        this.course_result = this.student_details['course_result'];

        this.attendance = this.student_details['attendance'];

        this.committee = this.student_details['committee'];
        this.Mentor_Meeting = this.committee['Mentor Meeting'];

        this.project = this.student_details['project'];

        this.internship = this.student_details['internship']['Internship'];

        this.publication = this.student_details['publication'];

        this.patent = this.student_details['patent']['Patent'];
        this.certificate = this.student_details['certification']['certificates'];

      })
  }

  getData() {
    this.record = [];
    for(var index = 0;index<this.data.length;index ++){
      
      if((this.Year == this.data[index]['year']) ){
        this.record.push(this.data[index]);       
        console.log(this.record[0]['name'])
      }
    }
    if(this.record.length == 0) {
      this.flag = true;
      console.log(this.flag);
    }
    else{
      this.flag=false;
    }
  }
  
  check_current_page() {
    if (this.second_page == true) {
      this.second_page = false;
    }

    if (this.third_page == true) {
      this.third_page = false;
      this.second_page = true;
    }

  }

  student_info(index,name,usn){
    this.second_page = true;
    this.name = name;
    this.usn = usn;
    console.log(this.name,this.usn);
  }

  student_score() {
    this.third_page = true;
  }

  cocurricular() {
    this.curricular = true;
    this.academic = false;
    this.skill = false;
  }

  Academic() {
    this.academic = true;
    this.skill = false;
    this.curricular = false;
  }

  Skill() {
    this.skill = true;
    this.academic = false;
    this.curricular = false;
  }
}