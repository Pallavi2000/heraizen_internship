import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Nba27aRoutingModule } from './nba27a-routing.module';
import { Nba27aComponent } from './nba27a.component';
import { ComponentImportModule } from '../shared/component.import.module';
import { Nba27aDonutchartComponent } from './nba27a-donutchart/nba27a-donutchart.component';


@NgModule({
  declarations: [Nba27aComponent, Nba27aDonutchartComponent],
  imports: [
    CommonModule,
    Nba27aRoutingModule,
    ComponentImportModule
  ]
})
export class Nba27aModule { }
