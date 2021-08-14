import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba17Component } from './nba17.component';


const routes: Routes = [
  {
    path :'',
    component : Nba17Component
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba17RoutingModule { }
