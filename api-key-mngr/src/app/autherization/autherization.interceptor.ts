import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutherizationService } from './autherization.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public autherizationService: AutherizationService) { } 
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      console.log("Here....")
      let token = this.autherizationService.getToken()
      if (token) {
        request = request.clone({
          setHeaders: {
            'authorization': 'Bearer '+ this.autherizationService.getToken()
          }
        });
      }
      return next.handle(request);
    }
}