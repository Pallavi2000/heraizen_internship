import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { PerformanceConfigurationRoutingModule } from './performance-configuration-routing.module';
import { PerformanceConfigurationComponent } from './performance-configuration.component';
import { MatTableModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [PerformanceConfigurationComponent],
  imports: [
    CommonModule,
    PerformanceConfigurationRoutingModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class PerformanceConfigurationModule { }
