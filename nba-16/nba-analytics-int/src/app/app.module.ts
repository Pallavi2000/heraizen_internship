import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DummycomponentComponent } from './dummycomponent/dummycomponent.component';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { CommonLeftNavComponent } from './common-left-nav/common-left-nav.component';
import { CommonHeaderService } from './common-header/common-header.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2GoogleChartModule } from '@vrushalisoft/googlechart';
import { MatCardModule } from '@angular/material';
import { Nba31Component } from './nba31/nba31.component';
import { CommonModule } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
    DummycomponentComponent,
    CommonLeftNavComponent,
    CommonHeaderComponent,
    
    


  
    
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2GoogleChartModule,
    MatCardModule


  ],
  exports: [
    
  ],
  providers: [CommonHeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
