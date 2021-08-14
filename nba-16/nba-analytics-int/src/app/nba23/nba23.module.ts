import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nba23RoutingModule } from './nba23-routing.module';
import { Nba23Component } from './nba23.component';
import { ComponentImportModule } from '../shared/component.import.module';
import { Ng2GoogleChartModule } from '@vrushalisoft/googlechart';
import { MatExpansionModule } from '@angular/material/expansion';
//import { BaseChartDirective } from 'ng2-google-charts';



@NgModule({
  declarations: [Nba23Component],
  imports: [
    CommonModule,
    Nba23RoutingModule,
    ComponentImportModule,
    Ng2GoogleChartModule,
    MatExpansionModule,
    
  ]
})
export class Nba23Module { }
