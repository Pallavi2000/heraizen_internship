import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiServiceService } from '../api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CrtApiServiceComponent } from '../crt-api-service/crt-api-service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  dataSource:any;
  displayedColumns:any;

  constructor(private apiService:ApiServiceService,
    public dialog:MatDialog){}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
      this.apiService.get_all_services().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data);
        this.displayedColumns = ['name','description', 'delete'];
        this.dataSource.paginator = this.paginator;
      })
  
  }

  service_click(){
    this.dialog.open(CrtApiServiceComponent, {width: '500px', height: '450px'});
  }

  search(){

  }

  onClicked(row){
    console.log(row.id);
    this.apiService.delete_api_service(row.id).subscribe(data=>
      {
        console.log(data);
      })
  }

}

