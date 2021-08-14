import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Nba22RoutingModule } from './nba22-routing.module';
import { Nba22Component } from './nba22.component';
import { ComponentImportModule } from '../shared/component.import.module';
import {DataTableModule} from "@vrushalisoft/datatable";
import { Ng2GoogleChartModule } from '@vrushalisoft/googlechart';


@NgModule({
  declarations: [Nba22Component],
  imports: [
    CommonModule,
    Nba22RoutingModule,
    ComponentImportModule,
    DataTableModule,
    Ng2GoogleChartModule
  ]
})
export class Nba22Module { }
