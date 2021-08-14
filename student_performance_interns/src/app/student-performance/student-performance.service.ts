import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentPerformanceService {

  url = '../../assets/json-files/student-performance-data.json'

  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get(this.url);
  }
}
