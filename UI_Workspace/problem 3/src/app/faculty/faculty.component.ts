import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';
import { Faculty } from '../shared/faculty.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  searchStr = ""
  searchFaculty =[]
  f_dname_list:Faculty[] = []
  flag = false
  f_form:any;
  constructor(private appService:AppService,private fb:FormBuilder) { }

  ngOnInit() {
    this.f_form = this.fb.group({
      employeeId:['',Validators.required],
      name:['',Validators.required],
      qualification:['',Validators.required],
      deptId:['',Validators.required],
      active:['',Validators.required]
    })
  }
  getSearchResult(){
    this.searchStr = this.searchStr.trim()
    if(this.searchStr.length > 0){
      this.flag = true
      this.appService.getSearchResult(this.searchStr)
      .subscribe(data=>{
        this.searchFaculty = data;
      })
    }
  }

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: this.appService.getFacultyCountByDept(),
    //opt_firstRowIsData: true,
    options: {'title': 'Employee Count By Department',
              'height':400,
              'width':400
             },
  };


getEmpByDept(event:ChartSelectEvent){
  let dname = event.selectedRowValues[0]
  this.f_dname_list = this.appService.getEmpByDept(dname)

}
submitForm(){
    let faculty:Faculty = this.f_form.value;
    console.log(faculty)
    this.appService.addFaculty(faculty);
    this.f_form.reset()
}

get employeeId(){
  return this.f_form.get('employeeId')
}
get name(){
  return this.f_form.get('name')

}
get deptId(){
  return this.f_form.get('deptId')
}
get qualification(){
  return this.f_form.get('qualification')
}
  
}
