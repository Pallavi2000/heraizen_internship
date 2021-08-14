import { Component, OnInit } from '@angular/core';
import { CommonHeaderService } from './common-header.service';
import { AppComponent } from '../app.component';
declare var $:any;
@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit {
  session: any;
  currentRole: string;
  roles: any[];
  anotherRole = false;
  constructor(public commonHeaderService: CommonHeaderService, private appComponent: AppComponent) { }

  ngOnInit() {
    // this.session = this.appComponent.getSessionUser();
    // if (this.session != null || this.session !== undefined) {
    //   this.currentRole = this.appComponent.getCurrentRole();
    // }
    // this.roles = this.session.roles;
    // if (this.roles.length > 1) {
    //   this.anotherRole = true;

    // }
  }

  logout() {
    // this.commonHeaderService.setUserSessionOut(this.session.email, this.session.userName).subscribe(data => {
    // this.keycloakService.logout();
    // // this.compiler.clearCache();
    // window.sessionStorage.removeItem("xttdsr&*");
    // window.sessionStorage.removeItem("trd674&4");
    // window.sessionStorage.removeItem("childSession");
    // window.sessionStorage.removeItem('degree');
    // window.localStorage.removeItem('&78$22');
    // window.localStorage.removeItem('%6^545');
    // this.commonHeaderService.stopLoading();
    // });


    // setUserSessionOut(email: string, username: string){
    //   return this.dataService.getObjects(this.url.SERVER_PORT + 'usersession/logout?email=' + email + '&username=' + username);
    // }
    // window.location.replace(this.routConstant.LOGIN);
    // location.reload();
  }

  changeRole(role: string) {
    // this.dataService.setCurrentRole(role);
    // this.wrapperService.login(role);
    // this.currentRole = this.appComponent.getCurrentRole();
  }

  resize() {
    if($('.sidebar-mini').hasClass('sidebar-collapse')) {
      $('.sidebar-mini').removeClass('sidebar-collapse')
    } else {
      $('.sidebar-mini').addClass('sidebar-collapse')
    }
  }
}
