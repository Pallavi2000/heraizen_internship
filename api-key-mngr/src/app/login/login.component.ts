import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AutherizationService } from '../autherization/autherization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;

  constructor(private loginService:LoginService,
        private autherizationService:AutherizationService,
        private routes:Router) { }

  ngOnInit(): void {
  }

  login()
  {
    this.loginService.login(this.username,this.password).subscribe(result=>
      {
        if(this.autherizationService.setParameter(result.token,this.username) && this.autherizationService.getToken()!=null)
        {
          this.username = this.autherizationService.getUserInfo();
          this.routes.navigate(["/home"]);
        } 
      },()=>
      {
          this.routes.navigate(['/login']);
      })  
    
  }

}
