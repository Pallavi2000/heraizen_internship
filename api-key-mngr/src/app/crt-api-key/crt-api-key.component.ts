import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crt-api-key',
  templateUrl: './crt-api-key.component.html',
  styleUrls: ['./crt-api-key.component.css']
})
export class CrtApiKeyComponent implements OnInit {
  api_key:any;
  service_names : any[];
  
    email:string;
    serviceId:string;
    tenantId:string;
 

  
  constructor(private apiService:ApiServiceService,
    public dialogRef: MatDialogRef<CrtApiKeyComponent>) { }

  ngOnInit(): void {
    this.apiService.get_service_names().subscribe(data=>{
      this.service_names = data;
    })
  }

  cancel(){
    this.dialogRef.close();
  }

  create_api()
  {
    this.apiService.create_api_key(this.email,this.serviceId,this.tenantId).subscribe(data=>{
      console.log(data.apikey);
      this.api_key = data.apiKey;
    })
  }


}
