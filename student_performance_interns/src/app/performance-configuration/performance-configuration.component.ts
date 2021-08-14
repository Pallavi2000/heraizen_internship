import { MatSelectModule } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-performance-configuration',
  templateUrl: './performance-configuration.component.html',
  styleUrls: ['./performance-configuration.component.css']
})
export class PerformanceConfigurationComponent implements OnInit {
  academicYear:any = []
  semesters:any = []
  sections:any = []
  year;
  terms;
  sec;
  count = 0
  department;
  dept_details:any = [];
  dept;
  semester;
  section;
  displaySelect:boolean = true;
  displayTabs:boolean = false;
  displayAcademic:boolean;
  displaySkills:boolean;
  displayCocurricular:boolean;
  displayCorporate:boolean;
  displayActivity:boolean;
  indicator_1 = "+"
  indicator_2 = "+"
  constructor(private httpClient:HttpClient) { }
  ngOnInit(): void {
      this.httpClient.get("assets/json-files/performance-configuration.json").subscribe(data=>{
      var json = Object.entries(data)
      this.academicYear = json[0][1]
      this.semesters = json[1][1]
      this.sections = json[2][1]
      this.department = json[3][1]
      this.displayacademic()
    })
  }
  displayacademic(){
    this.displayAcademic = true;
    this.displaySkills = false
    this.displayCocurricular = false
  }
  displayskills(){
    this.displayAcademic = false
    this.displaySkills = true
    this.displayCocurricular = false
  }
  displaycocurricular(){
    this.displayAcademic = false
    this.displaySkills = false
    this.displayCocurricular = true
  }
  corporate(){
    if(this.indicator_1 == "+"){
      this.indicator_1 = "-"
    }
    else{
      this.indicator_1 = "+"
    }
    if(this.displayCorporate == true){
      this.displayCorporate = false
      this.indicator_2 = "+"
    }
    else{
      this.displayCorporate = true
      this.indicator_2 = "+"
    }
    this.displayActivity = false
  }
  professional(){
    if(this.indicator_2 == "+"){
      this.indicator_2 = "-"
    }
    else{
      this.indicator_2 = "+"
    }
    if(this.displayActivity == true){
      this.displayActivity = false
      this.indicator_1 = "+"
    }
    else{
      this.displayActivity = true
      this.indicator_1 = "+"
    }
    this.displayCorporate = false
  }
  Infosubmit(){
    var i =0
    for(var index = 0;index<this.department.length;index ++){
      var dept = this.department[index]
      if((this.sec == dept.section) && (this.terms == dept.term)){
        this.dept_details.push(dept)
      }
    };
  }

  ClassInfo(deptId,term,section){
    this.dept = deptId
    this.semester = term
    this.section = section
    this.displaySelect = false
    this.displayTabs = true
  }

  back(){
    this.displaySelect = true
    this.displayTabs = false
  }
}

