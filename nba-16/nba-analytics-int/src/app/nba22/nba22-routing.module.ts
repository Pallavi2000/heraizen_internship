import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba22Component } from './nba22.component';


const routes: Routes = [
  {
    path :'',
    component : Nba22Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba22RoutingModule { }
