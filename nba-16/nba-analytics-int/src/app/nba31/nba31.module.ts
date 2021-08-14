import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Nba31RoutingModule } from './nba31-routing.module';
import { Nba31Component } from './nba31.component';
import { MatCardModule } from '@angular/material';
import { ComponentImportModule } from '../shared/component.import.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


@NgModule({
  declarations: [Nba31Component],
  imports: [
    CommonModule,
    Nba31RoutingModule,
    MatCardModule,
    ComponentImportModule,
    Ng2GoogleChartsModule
  ]
})
export class Nba31Module { }
