import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba27aComponent } from './nba27a.component';


const routes: Routes = [
	{
		path: '',
		component: Nba27aComponent
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nba27aRoutingModule { }
