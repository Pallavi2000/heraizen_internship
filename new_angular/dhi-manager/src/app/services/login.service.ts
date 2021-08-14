import { Injectable } from '@angular/core';
import { BaseURL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl=BaseURL;

  constructor(private http: HttpClient) { }

  login(username:string,password:string) {
    let url = `${this.baseurl}login`;
    let user_detail = {"email":username,"password":password}
    return this.http.post<any>(url,user_detail)
  }

}
