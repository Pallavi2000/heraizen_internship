import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentImportModule } from '../shared/component.import.module';
import { Nba16RoutingModule } from './nba16-routing.module';
import { Nba16Component } from './nba16.component';
import { FormsModule } from '@angular/forms';
import { Ng2GoogleChartModule } from '@vrushalisoft/googlechart';
import { ReactiveFormsModule } from '@angular/forms';
import { RubricsPopupComponent } from './rubrics-popup/rubrics-popup.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [Nba16Component, RubricsPopupComponent],
  imports: [
    CommonModule,
    Nba16RoutingModule,
    FormsModule,
    ComponentImportModule,
    ReactiveFormsModule,
    Ng2GoogleChartModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    ScrollingModule
  ]
})
export class Nba16Module { }
