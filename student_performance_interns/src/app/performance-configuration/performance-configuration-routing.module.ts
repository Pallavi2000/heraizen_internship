import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceConfigurationComponent } from './performance-configuration.component';


const routes: Routes = [
  {
    path: '',
    component: PerformanceConfigurationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceConfigurationRoutingModule { }
