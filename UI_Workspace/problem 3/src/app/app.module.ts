import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FacultyComponent } from './faculty/faculty.component';
import { LabsComponent } from './labs/labs.component';
import { WhoursComponent } from './whours/whours.component';
import { AppService } from './app.service';
import { DataFeederService } from './shared/datafeeder.sevice';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FacultyComponent,
    LabsComponent,
    WhoursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2GoogleChartsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [AppService,DataFeederService],
  bootstrap: [AppComponent]
})
export class AppModule { }
