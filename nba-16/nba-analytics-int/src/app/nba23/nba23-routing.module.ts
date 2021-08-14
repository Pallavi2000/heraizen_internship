import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba23Component } from './nba23.component';


const routes: Routes = [
  {
    path :'',
    component : Nba23Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba23RoutingModule { }
