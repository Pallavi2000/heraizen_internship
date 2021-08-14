import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba26Component } from './nba26.component';


const routes: Routes = [
  {
    path :'',
    component : Nba26Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba26RoutingModule { }
