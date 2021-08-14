import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPerformanceMentorViewRoutingModule } from './student-performance-mentor-view-routing.module';
import { StudentPerformanceMentorViewComponent } from './student-performance-mentor-view.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule, MatTab } from '@angular/material/tabs';

@NgModule({
  declarations: [StudentPerformanceMentorViewComponent],
  imports: [
    CommonModule,
    StudentPerformanceMentorViewRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class StudentPerformanceMentorViewModule { }
