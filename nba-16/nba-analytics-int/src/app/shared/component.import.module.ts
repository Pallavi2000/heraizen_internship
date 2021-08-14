import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatSortModule,
	MatButtonModule,
	MatIconModule,
	MatTableModule,
	MatButtonToggleModule,
	MatDividerModule,
	MatMenuModule,
	MatSelectModule,
	MatFormFieldModule,
	MatInputModule,
	MatDialogModule,
	MatBadgeModule,
	MatTooltipModule,
	MatCardModule,
	MatToolbarModule,
	MatSidenavModule,
	MatCheckboxModule,
	MatRadioModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatExpansionModule
} from '@angular/material';
import { DataTableModule } from '@vrushalisoft/datatable';
import { Ng2GoogleChartModule } from '@vrushalisoft/googlechart';

const modules = [
	FormsModule,
	MatExpansionModule,
	ReactiveFormsModule,
	MatSelectModule,
	MatFormFieldModule,
	MatInputModule,
	MatDialogModule,
	MatDividerModule,
	MatBadgeModule,
	MatButtonModule,
	MatIconModule,
	MatTooltipModule,
	MatCardModule,
	MatToolbarModule,
	MatSidenavModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatCheckboxModule,
	DataTableModule,
	MatTableModule,
	MatSortModule,
	Ng2GoogleChartModule,
	MatRadioModule,
	MatMenuModule,
	MatDividerModule,
	MatButtonToggleModule
];

@NgModule({
	declarations: [],
	entryComponents: [],
	imports: [ modules ],
	exports: [ modules ],
	providers: [],
	bootstrap: []
	
})
export class ComponentImportModule {}
