import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseurl = environment.baseUrl
  constructor(private http:HttpClient) { }

  get_all_tenants():Observable<any>{
    let url = `${this.baseurl}/api/v1/apikeymaker/alltenantids`;
    return this.http.get(url)
  }

  get_all_keys():Observable<any>{
    let url = `${this.baseurl}/api/v1/apikeymaker/allactivekeys`
    return this.http.get(url)
  }

  get_all_services():Observable<any>{
    let url = `${this.baseurl}/api/v1/apikeymaker/allservices`
    return this.http.get(url)
  }

  get_service_names():Observable<any>{
    let url = `${this.baseurl}/api/v1/apikeymaker/servicenames`
    return this.http.get(url)
  }

  create_api_key(email:string,serviceId:string,tenantId:string){
    let url = `${this.baseurl}/api/v1/apikeymaker/newapikey`;
    let api_crt_details = {"email": email,
    "serviceId": serviceId,
    "tenantId": tenantId}
    console.log(api_crt_details)
    return this.http.post<any>(url, api_crt_details)
  }

  create_api_service(description:string,service_name:string,id:string,){
    let url = `${this.baseurl}/api/v1/apikeymaker/addnewservice`;
    let service_crt_details = {"description": description,
    "id": id,
    "name": service_name}
    console.log(service_crt_details)
    return this.http.post<any>(url, service_crt_details);
  }

  delete_api_service(id:string):Observable<any>{
    let url = `${this.baseurl}/api/v1/apikeymaker/removeservice/${id}`
    return this.http.delete<any>(url);
  }

  update_status_of_api_key(id:string):Observable<any>{
    let status = {"status":"INACTIVE"};
    let url = `${this.baseurl}/api/v1/apikeymaker/update/${id}/INACTIVE`;
    return this.http.put(url,status);
}
  search_tenant_service(tenantId:string,serviceId:string):Observable<any>{
    let str = tenantId + "-" + serviceId;
    let url = `${this.baseurl}/api/v1/apikeymaker/search/${str}`
    return this.http.get(url);
  }

  
}
