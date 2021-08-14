import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Nba22CriteriaARoutingModule } from './nba-22-criteria-a-routing.module';
import { CoScoresComponent } from './co-scores/co-scores.component';
import { ComponentImportModule } from 'app/shared/component.import.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';



@NgModule({
  declarations: [CoScoresComponent],
  imports: [
    CommonModule,
    Nba22CriteriaARoutingModule,
    ComponentImportModule,
    Ng2GoogleChartsModule
  ]
})
export class Nba22CriteriaAModule { }
