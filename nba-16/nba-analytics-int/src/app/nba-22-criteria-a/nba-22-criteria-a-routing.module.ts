import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoScoresComponent } from './co-scores/co-scores.component';


const routes: Routes = [
  {
    path:'',
    component:CoScoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba22CriteriaARoutingModule { }
