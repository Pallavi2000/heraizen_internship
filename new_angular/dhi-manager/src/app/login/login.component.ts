import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService} from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  localItem:string;

  constructor(private route:Router,
    private loginservice: LoginService) { }

  ngOnInit(): void {

  }

  login_validate() {
      this.loginservice.login(this.username,this.password)
      .subscribe(data=>{
        localStorage.setItem("token",data.token);   
        console.log(data)    
        localStorage.setItem("user",this.username);
        
    })
    this.localItem = localStorage.getItem("token");
    console.log(this.localItem)
    if(this.localItem!= null) {
      this.route.navigate(["/home"]);
    }
  }

}
