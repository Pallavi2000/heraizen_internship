import { Component, OnInit } from '@angular/core';
import { StudentPerformanceService } from './student-performance.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.css']
})

export class StudentPerformanceComponent implements OnInit {

  data:any;
  second_screen:boolean;

  show_academic:boolean = false;
  academic_toggle:boolean=true;
  cocurricular_toggle:boolean = false;
  skills_toggle:boolean = false;

  corporate_indication="+";
  professional_indication="+";

  jsonData: [string, any][];
  academicYear: any;
  year : number = 0;
  studentName: any;
  usn: any;
  dataSource: any;
  dataSource2: any;
  dataSource3: any;
  dataSource4: any;
  dataSource8: any;
  dataSource5: any;
  dataSource6: any;
  dataSource7: any;
  comitteePage: boolean = false;
  first_screen: boolean = true;
  comitteeContent: any;
  presentatio_skill_rate1 = false;
  data_not_found : boolean = true;

  constructor(private studentPerformanceService:StudentPerformanceService,
    private http:HttpClient) { }


  ngOnInit(): void {
    this.studentPerformanceService.getData().subscribe(data=>
      {
          this.data = data['student_details'][0];
      })

      this.getJsonData();
  }

  goTo_second_screen()
  {
    this.second_screen = true;
    this.first_screen = this.comitteePage = false;
  }

  show_academics(){
    this.academic_toggle = true;
    this.cocurricular_toggle = this.skills_toggle = false;
  }

  show_co_curricular(){
    this.cocurricular_toggle = true;
    this.academic_toggle = this.skills_toggle = false;
  }

  show_skills(){
    this.skills_toggle = true;
    this.academic_toggle = this.cocurricular_toggle = false;
    console.log("here");
    console.log(this.skills_toggle);
  }

  show_corporate_life(){
    if(this.corporate_indication == '+')
    {
      this.corporate_indication = '-'
    }
    else{
      this.corporate_indication = '+'
    }
  }

  show_professional_development(){
    if(this.professional_indication == '+')
    {
      this.professional_indication = '-'
    }
    else{
      this.professional_indication = '+'
    }
  }

  getJsonData(){
    this.http.get("assets/json-files/student-performance-data.json").subscribe(data =>{
      this.jsonData = Object.entries(data);
      this.getAcademicYear();
     });
     
  }
  getAcademicYear(){
    this.academicYear = this.jsonData[0][1];
  }
  academicYearSelected(){
    this.data_not_found = true;
    const studentsDetailsArray = this.jsonData[4][1];
    let i =0,length_array = studentsDetailsArray.length;
    console.log(this.year);
    for(i=0;i<length_array ; i++)
    {
      if(this.year == studentsDetailsArray[i]["year"])
      {
        console.log("Found");
      this.getStudentDetails();
      this.getStudentMarks();
      this.getStudentAttendance();
      this.getPublicationDetails();
      this.getProjectDetails();
      this.getPatentsDetails();
      this.getInternshipDetails();
      this.getCertificationDetails();
      this.data_not_found = false;
      break;
      }
    }
  }

  getStudentDetails(){
    this.studentName = this.jsonData[4][1][0]["name"];
    this.usn = this.jsonData[4][1][0]["USN"];
  }

  getStudentMarks(){
    this.dataSource = this.jsonData[4][1][0]["course_result"];
  }

  getStudentAttendance(){
    this.dataSource2 = this.jsonData[4][1][0]["attendance"];
  }

  // getCommitteDetails(){
  //   this.dataSource3 = this.jsonData[4][1][0]["committee"]["Mentor Meeting"];
  // }

  getProjectDetails(){
    this.dataSource4 = this.jsonData[4][1][0]["project"];
  }
  getInternshipDetails(){
    this.dataSource5 = this.jsonData[4][1][0]["internship"]["Internship"];
  }
  getPublicationDetails(){
    this.dataSource6 = this.jsonData[4][1][0]['publication'];
  }
  getPatentsDetails(){
    this.dataSource7 = this.jsonData[4][1][0]['patent']['Patent']
  }
  getCertificationDetails(){
    this.dataSource8 = this.jsonData[4][1][0]["certification"]["certificates"];
  }
  comitteeDetails()
  {
    this.comitteePage = true;
    this.first_screen = false;
    this.second_screen = false;
    this.comitteeContent = this.data["committee"]["Mentor Meeting"]["meeting_details"];
  }
  BackToFirstScreen(){
    this.comitteePage = false;
    this.first_screen = true;
    this.second_screen = false;
  }  

  checkRating(rate_of:string ,num_index : number){
    const verbal_stars = document.querySelector(rate_of).children;
    for(let index = num_index+1;index < verbal_stars.length;index++)
    {
      verbal_stars[index].classList.remove("fa-circle");
      verbal_stars[index].classList.add("fa-circle-o");
    }
    for(let index = 0;index <= num_index; index++)
    {
      verbal_stars[index].classList.remove("fa-circle-o");
      verbal_stars[index].classList.add("fa-circle");
    }
  }

}
