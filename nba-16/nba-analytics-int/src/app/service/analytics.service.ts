import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})

export class AnalyticsService {
  baseUrl = environment.baseurl;
  
  constructor(private httpService: HttpClient) {}

  //NBA 22 CO Attainment data
  
  getnba22CoAttainmentData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba22-data.json");
  }
  //NBA-23 CO Attainment data
  nba23CoAttainmentData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba23-data.json");
  }
  //nba24 Co attainment data
  nba24CoAttainmentData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba24-data.json");
  }
  //NBA 26 Faculty Data
  nba26FacultyData(): Observable<any> {
    return this.httpService.get<any>(
      "/assets/analytics-data/nba26-faculty-data.json"
    );
  }
  //NBA 22 Faculty Data
  getnba22FacultyData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba22-data.json");
  }

  //NBA17 JSON DATA
  nba17JsonData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba-17-data.json");
  }

  //NBA16 Service
  nba16Service(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba16-data.json");
  }

  //NBA 31 Data
  nba31Data(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba-31-data.json");
  }
  //NBA 22(A) Data
  nba22AData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba-22(a).json");
  }
  //NBA 22(A) Selection Data
  nba22ASelData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/selection_data.json");
  }
  //NBA 22(A) Graph Data
  nba22AGraphData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba-22(a)-graph.json");
  }
  //NBA 22(A) Student Data
  nba22AStudentData(): Observable<any> {
    return this.httpService.get<any>("/assets/analytics-data/nba-22(a)-student-data.json");
  }


  getAttainmentData():Observable<any>{
    let URL = `${this.baseUrl}courseAttainmentData`
    return this.httpService.get(URL)
  }
  
  getFacultyData(fid,year,terms):Observable<any>{
    let URL = `${this.baseUrl}courseCodes/${fid}/${year}/${terms}`
    return this.httpService.get(URL)
  }
  /*NBA 16 Part*/

  get_academic_year_for_faculty(facultyId):Observable<any>{
    console.log(this.baseUrl)
    let url = `${this.baseUrl}faculty/academicyear/${facultyId}`;
    return this.httpService.get(url);
  }

  get_terms_for_faculty(facultyId,year):Observable<any>{
    let url = `${this.baseUrl}faculty/terms/${facultyId}/${year}`;
    return this.httpService.get(url);
  }

  get_co_details_of_faculty(facultyId,academicyear,termNumber):Observable<any>{
    let url = `${this.baseUrl}faculty/co_details/${facultyId}/${academicyear}/${termNumber}`;
    return this.httpService.get(url);
  }

  get_accordian_table_data_for_faculty(academicyear,facultyId,termNumber,section,courseCode,coNumber,deptId,courseType):Observable<any>{
    let url = `${this.baseUrl}faculty/data_table/${academicyear}/${facultyId}/${termNumber}/${section}/${courseCode}/${coNumber}/${deptId}/${courseType}`;
    return this.httpService.get(url);
  }

  get_rubric_detail_of_faculty(academicyear,deptId,courseType):Observable<any>{
    let url = `${this.baseUrl}rubric_details/${academicyear}/${deptId}/${courseType}`;
    return this.httpService.get(url);
  }
  get_dept_of_hod(hodId){
    let url = `${this.baseUrl}hod/dept/${hodId}`
    return this.httpService.get(url)
  }
  get_academic_year_for_hod(deptId):Observable<any>{
    let url = `${this.baseUrl}hod/academicyear/${deptId}`;
    return this.httpService.get(url);
  }

  get_terms_for_hod(academicYear,deptId):Observable<any>{
    let url = `${this.baseUrl}hod/terms/${academicYear}/${deptId}`;
    return this.httpService.get(url);
  }

  get_co_details_of_dept_courses(academicyear,termNumber,deptId):Observable<any>{
    let url = `${this.baseUrl}co_details_of_dept_course/${academicyear}/${termNumber}/${deptId}`;
    return this.httpService.get(url);
  }

  get_all_departments():Observable<any>{
    let url = `${this.baseUrl}principal/departments`;
    return this.httpService.get(url);
  }

  //nba 17
  dep_hod( hodId ){
    return this.httpService.get(`${this.baseUrl}hod/dept/${hodId}`);
  }
  get_academicYear_hod(dept)
  {
    return this.httpService.get(`${this.baseUrl}hod/academicyear/${dept}`);
  }
  get_term_hod(year,dept){
    return this.httpService.get(`${this.baseUrl}hod/terms/${year}/${dept}`);
  }
  get_hod_data(year,dept,terms)
  {
    return this.httpService.get(`${this.baseUrl}hod/details/${year}/${dept}/${terms}`)
  }
 
  get_principal_dept( ){
    return this.httpService.get(`${this.baseUrl}principal/departments`)
  }

  get_total_Lessons(fid,year,code){
    let url = `${this.baseUrl}getTotalLessons/${fid}/${year}/${code}/term`;
    return this.httpService.get(url);
  }
}
