import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
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


@NgModule({
  declarations: [
    AppComponent,
    DummycomponentComponent,
    CommonLeftNavComponent,
    CommonHeaderComponent
    
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
  ],
  providers: [CommonHeaderService],
  bootstrap: [AppComponent
  ]
})
export class AppModule { }
