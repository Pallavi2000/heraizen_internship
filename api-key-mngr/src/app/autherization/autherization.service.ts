import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutherizationService {

  constructor(private routes:Router) { }

  setParameter(token:string,username:string){
    localStorage.setItem("token", token);
    localStorage.setItem("user",username);
    
    return true;
  }

  getToken()
  {
    let token = localStorage.getItem("token")
    return token
  }

  getUserInfo(){  
    let username = localStorage.getItem("user");
    return username;
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.routes.navigate(["login"]);
  }

}
