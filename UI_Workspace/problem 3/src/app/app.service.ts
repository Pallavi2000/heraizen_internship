import { Injectable } from '@angular/core';
import { Faculty } from './shared/faculty.model';
import { DataFeederService } from './shared/datafeeder.sevice';
import { ChartSelectEvent } from 'ng2-google-charts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  f_list:Faculty[] = []
  constructor(private dfs:DataFeederService,private http:HttpClient) { 
      this.f_list = dfs.getFaculties();
  }

  getSearchResult(str){
    //Logic to get data from the server by invoking API
    return this.http.get<Faculty[]>("http://fms-mite.herokuapp.com/fms/search/"+str)
   
  }

  getFacultyCountByDept(){
    let data =[]
    let dict ={}
    data.push(["Dname","Count"])
    for(let i=0;i<this.f_list.length;i++)
    {
        let f = this.f_list[i]
        if(f.deptId in dict)
        {
            dict[f.deptId] += 1
        }
        else
        {
            dict[f.deptId] = 1
        }
    }
    for(let [key,value] of Object.entries(dict))
    {
      data.push([key,value])
    } 
    return data
    }

    getEmpByDept(dname:string):Faculty[]{
      let f_lst : Faculty[] = [];
      for(let f of this.f_list){
        if(f.deptId == dname){
          f_lst.push(f)
        }
      }
      return f_lst
      //code needs to be refactored
      //f_lst=this.f_list.filter(x=>X.dname == dname)
    }
    addFaculty(faculty:Faculty){
      this.f_list.push(faculty)
    }
  }

 