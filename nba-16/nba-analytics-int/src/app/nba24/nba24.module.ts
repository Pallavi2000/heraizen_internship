import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Nba24RoutingModule } from "./nba24-routing.module";
import { Nba24Component } from "./nba24.component";
import { ComponentImportModule } from "../shared/component.import.module";
import { Ng2GoogleChartModule } from "@vrushalisoft/googlechart";
import { MatDialogModule } from '@angular/material';
import { StudentFeedbackComponent } from './student-feedback/student-feedback.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [Nba24Component, StudentFeedbackComponent],
  imports: [
    CommonModule,
    Nba24RoutingModule,
    ComponentImportModule,
    Ng2GoogleChartModule,
    FormsModule,
    MatExpansionModule,
  ],
})
export class Nba24Module {}
