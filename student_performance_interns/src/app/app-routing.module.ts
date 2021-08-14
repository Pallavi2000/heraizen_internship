import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonLeftNavComponent } from './common-left-nav/common-left-nav.component';

const routes: Routes = [
  {
    path: '',
    component: CommonLeftNavComponent
  },
  {
    path: 'performance-configuration',
    loadChildren: () => import('./performance-configuration/performance-configuration.module').then(m => m.PerformanceConfigurationModule)
  },
  {
    path: 'student-performance',
    loadChildren: () => import('./student-performance/student-performance.module').then(m => m.StudentPerformanceModule)
  },
  {
    path: 'student-performance-mentor',
    loadChildren: () => import('./student-performance-mentor-view/student-performance-mentor-view.module').then(m => m.StudentPerformanceMentorViewModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
