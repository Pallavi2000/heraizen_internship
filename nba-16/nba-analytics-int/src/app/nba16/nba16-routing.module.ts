import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba16Component } from './nba16.component';


const routes: Routes = [
  {
    path :'',
    component : Nba16Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba16RoutingModule { }
