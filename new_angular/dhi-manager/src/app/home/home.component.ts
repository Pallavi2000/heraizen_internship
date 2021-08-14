import { Component, OnInit } from '@angular/core';
import { JobService} from '../services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allKeys = [];
  allTenants = [];
  allServices = [];

  email : string;
  serviceId : string;
  tenantId : string;
  api_key : string;
  serviceName : string;

  constructor(private jobservice : JobService) { }

  ngOnInit(): void {
    this.jobservice.getAllKeys()
      .subscribe(data => { this.allKeys = data;
        console.log(data);
      });

    this.jobservice.getAllTenants()
    .subscribe(data => {this.allTenants = data;
      console.log(data);
    });

    this.jobservice.getAllServices()
    .subscribe(data => {this.allServices = data;
      console.log(data);
    });
  }

  create() {
    this.jobservice.createApikey(this.email,this.serviceId,this.tenantId)
    .subscribe(data=>{
        console.log(data.apiKey);
        this.api_key = data.apiKey;
    })
  }

  search() {
    this.jobservice.searchTenant(this.tenantId,this.serviceId)
    .subscribe(data=>{
        console.log(data);
    })
  }

}