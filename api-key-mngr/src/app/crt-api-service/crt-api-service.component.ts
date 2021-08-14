import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crt-api-service',
  templateUrl: './crt-api-service.component.html',
  styleUrls: ['./crt-api-service.component.css']
})
export class CrtApiServiceComponent implements OnInit {

  description:string;
  service_name:string;

  constructor(private apiService:ApiServiceService,
    public  dialogRef: MatDialogRef<CrtApiServiceComponent>) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close();
  }

  create_service()
  {
    this.apiService.create_api_service(this.description,this.service_name,this.service_name).subscribe(data=>{
      console.log(data.apikey);
      this.dialogRef.close();
    })
  }

}
