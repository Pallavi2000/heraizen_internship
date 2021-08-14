import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentImportModule } from "../shared/component.import.module";
import { Nba17RoutingModule } from "./nba17-routing.module";
import { Nba17Component } from "./nba17.component";
import { Nba17dialogComponent } from './nba17dialog/nba17dialog.component';
import { MatPaginatorModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
@NgModule({
  declarations: [Nba17Component, Nba17dialogComponent],
  imports: [CommonModule, Nba17RoutingModule, ComponentImportModule, MatPaginatorModule, ScrollingModule],
  entryComponents: [
    Nba17dialogComponent
  ],
})
export class Nba17Module {}
