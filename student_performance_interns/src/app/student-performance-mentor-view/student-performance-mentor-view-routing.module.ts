import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentPerformanceMentorViewComponent } from './student-performance-mentor-view.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPerformanceMentorViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPerformanceMentorViewRoutingModule { }
