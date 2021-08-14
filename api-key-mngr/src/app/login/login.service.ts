import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseurl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  login(username:string,password:string){
    let url = `${this.baseurl}/login`;
    let user_details = {"email":username,"password":password}
    console.log(user_details)
    return this.http.post<any>(url, user_details)
  }

}
