import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPerformanceRoutingModule } from './student-performance-routing.module';
import { StudentPerformanceComponent } from './student-performance.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table'; 

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StudentPerformanceComponent],
  imports: [
    CommonModule,
    StudentPerformanceRoutingModule,

    HttpClientModule,
    FormsModule,

    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class StudentPerformanceModule { }
