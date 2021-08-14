import { Component, OnInit } from '@angular/core';
import { JobService} from '../services/job.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  allServices = [];

  services :any[]
  name:string;
  sname : string;
  description : string;

  constructor(private jobservice : JobService) { }

  ngOnInit(): void {
    this.jobservice.getAllServices()
      .subscribe(data => { this.allServices = data;
        console.log(data);
      });

      this.jobservice.get_services()
      .subscribe(data => { this.services = data;
        console.log(data);
      });
  }

  addService() {
    this.jobservice.addNewService(this.description,this.name,this.name)
      .subscribe(data => { 
        console.log(data.apikey);
      })
  }

  delete() {
    this.jobservice.deleteService(name) 
      .subscribe(data => {
        console.log(data)
      })
  }

}
