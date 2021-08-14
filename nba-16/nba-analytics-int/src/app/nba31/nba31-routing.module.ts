import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba31Component } from './nba31.component';


const routes: Routes = [
  {
    path :'', 
    component : Nba31Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba31RoutingModule { }
