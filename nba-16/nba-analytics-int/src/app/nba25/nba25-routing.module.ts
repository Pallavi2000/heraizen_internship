import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nba25Component } from './nba25.component';

const routes: Routes = [
	{
		path: '',
		component: Nba25Component
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class Nba25RoutingModule {}
