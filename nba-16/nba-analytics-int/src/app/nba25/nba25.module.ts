import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nba25RoutingModule } from './nba25-routing.module';
import { Nba25Component } from './nba25.component';
import { ComponentImportModule } from '../shared/component.import.module';
import { Nba25HomeComponent } from './nba25-home/nba25-home.component';
import { Nba25ModalComponent, Nba25Modal1, Nba25Modal2 } from './nba25-modal/nba25-modal.component';
import { SidecardsComponent } from './sidecards/sidecards.component';
 import { Nba25TableComponent } from './nba25-table/nba25-table.component';
import { Nba25GraphComponent } from './nba25-graph/nba25-graph.component';


@NgModule({
	declarations: [
		Nba25Component,
		Nba25HomeComponent,
		Nba25ModalComponent,
		Nba25Modal1,
		Nba25Modal2,
		SidecardsComponent,
		Nba25TableComponent,
		Nba25GraphComponent
	],
	imports: [ CommonModule, Nba25RoutingModule, ComponentImportModule]
})
export class Nba25Module {}
