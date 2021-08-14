import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentPerformanceMentorViewService {

  private url: string  =  "/assets/json-files/student-performance-data.json";

  constructor(private http: HttpClient) { }

  get_student_details(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
