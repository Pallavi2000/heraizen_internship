import { Injectable } from '@angular/core';
import { BaseURL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { ServiceBuilder } from 'selenium-webdriver/chrome';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseurl=BaseURL;
  name : string;
  description : string;
  
  constructor(private http : HttpClient) { }

  getAllKeys(): Observable<any[]> {
    let url = `${this.baseurl}api/v1/apikeymaker/allactivekeys`;
    return this.http.get<any[]>(url);
  }

  getAllTenants() : Observable<any[]> {
    let url = `${this.baseurl}api/v1/apikeymaker/alltenantids`;
    return this.http.get<any[]>(url);
  }

  getAllServices() : Observable<any> {
    let url = `${this.baseurl}api/v1/apikeymaker/servicenames`;
    return this.http.get(url);
  }

  get_services():Observable<any>{
    let url = `${this.baseurl}api/v1/apikeymaker/allservices`;
    return this.http.get(url);
  }

  createApikey(email:string,serviceId:string,tenantId:string) : Observable<any> {
    let url = `${this.baseurl}api/v1/apikeymaker/newapikey`;
    let api_details = {"email":email,"serviceId":serviceId,"tenantId":tenantId}
    return this.http.post<any>(url,api_details);
  }

  addNewService(description:string,name:string,id:string) : Observable<any> {
    let url = `${this.baseurl}api/v1/apikeymaker/addnewservice`;
    let service_details = { "description":description, "id":id,"name":name}
    console.log(service_details);
    return this.http.post<any>(url, service_details);
  }

  deleteService(name:string) : Observable<any> {
    let url = `${this.baseurl}api/v1/apikeymaker/removeservice/${name}`;
    return this.http.delete<any>(url);
  }

  deactivate(id:string) : Observable<any> {
    let status = {"status":"INACTIVE"};
    let url = `${this.baseurl}api/v1/apikeymaker/updates/${id}/INACTIVE`;
    return this.http.put(url,status);
  }

  searchTenant(tenantId:string, serviceId:string) {
    let str = tenantId + "-" + serviceId;
    let url = `${this.baseurl}api/v1/apikeymaker/search/${str}`
    return this.http.get(url);
  }

}
