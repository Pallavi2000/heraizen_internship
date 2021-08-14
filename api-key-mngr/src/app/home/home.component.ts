import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CrtApiKeyComponent } from '../crt-api-key/crt-api-key.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tenants:any[];
  dataSource :any;
  tenantid:string;
  service_name:string;
  displayedColumns: any[];
  
  constructor(private apiService:ApiServiceService,
    public dialog:MatDialog
     ) { }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
      this.apiService.get_all_tenants().subscribe(data=>{
        this.tenants = data;
      })
      
      this.apiService.get_all_keys().subscribe(data=>{
        for(let i=0;i<data.length;i++)
        {
          data[i]['index'] = i+1;
        }
        this.dataSource = new MatTableDataSource(data);
        console.log(data);
        this.displayedColumns = ['index','tenantId', 'email', 'serviceId', 'Edit'];
        this.dataSource.paginator = this.paginator
      })
  }

  api_click(){
    this.dialog.open(CrtApiKeyComponent);
  }

  search(){
    this.apiService.search_tenant_service(this.tenantid,this.service_name).subscribe(data=>
      {
        console.log(data);
      })
  }

  onClickcell(row){
    console.log(row);
    this.apiService.update_status_of_api_key(row.id).subscribe(data=>
      {
        console.log(data);
      })
  }

}
