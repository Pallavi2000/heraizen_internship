import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultyComponent } from './faculty/faculty.component';
import { WhoursComponent } from './whours/whours.component';
import { LabsComponent } from './labs/labs.component';


const routes: Routes = [
    {
      path:'',
      component:FacultyComponent,
      pathMatch:'full'
    },
    {
      path:'faculty',
      component:FacultyComponent,
    },
    {
      path:'labs',
      component:LabsComponent,
    },
    {
      path:'whours',
      component:WhoursComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
