import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nba26RoutingModule } from './nba26-routing.module';
import { Nba26Component } from './nba26.component';
import { ComponentImportModule } from '../shared/component.import.module';
import { Ng2GoogleChartModule } from '@vrushalisoft/googlechart';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [Nba26Component],
  imports: [
    CommonModule,
    Nba26RoutingModule,
    ComponentImportModule,
    Ng2GoogleChartModule,
    FormsModule,
    MatExpansionModule,
    
  ]
})
export class Nba26Module { }
