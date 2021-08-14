import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba24Component } from './nba24.component';


const routes: Routes = [
  {
    path :'',
    component : Nba24Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba24RoutingModule { }
