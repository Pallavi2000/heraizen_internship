import { Component, OnInit } from '@angular/core';
import { AutherizationService } from '../autherization/autherization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autherizationService:AutherizationService,
    private routes:Router) { }
  username = this.autherizationService.getUserInfo();

  ngOnInit(): void {
  }
 
  logout()
  {
    this.autherizationService.logout();
    this.routes.navigate(['/login'])
  }

}
