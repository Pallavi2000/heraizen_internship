import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentPerformanceComponent } from './student-performance.component';


const routes: Routes = [
  
  {
    path: '',
    component: StudentPerformanceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPerformanceRoutingModule { }
