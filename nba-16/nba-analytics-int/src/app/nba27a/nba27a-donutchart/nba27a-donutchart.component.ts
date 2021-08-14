import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-nba27a-donutchart',
  templateUrl: './nba27a-donutchart.component.html',
  styleUrls: ['./nba27a-donutchart.component.css']
})
export class Nba27aDonutchartComponent implements OnInit {
private chart: am4charts.PieChart;
  constructor(private zone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
		//document.getElementById(this.currActiveContent).classList.add('content-active');

		this.zone.runOutsideAngular(() => {
			// Set theme
			am4core.useTheme(am4themes_animated);

			// Create chart instance
			var chart = am4core.create('chartdiv', am4charts.PieChart);

			// Let's cut a hole in our Pie chart the size of 40% the radius
			chart.innerRadius = am4core.percent(20);

	
			// Add data
			chart.data = [
				{
					country: 'CO1',
					country1: 'PO1',
					litres: 440,
					bottles: 1500
				},
				{
					country: 'CO2',
					country1: 'PO2',
					litres: 301.9,
					bottles: 1300
				},
				{
					country: 'CO3',
					country1: 'PO3',
					litres: 201.1,
					bottles: 1200
				},
				{
					country: 'CO4',
					litres: 180.8,
					country1: 'PO5',
					bottles: 1000
				},
				{
					country: 'CO5',
					litres: 180.9,
					country1: 'PO4',
					bottles: 2100
				}
				,
				{
					country1: 'PO5',
					bottles: 1300
				},
				{
					country1: 'PO1',
					bottles: 2250
				},
				{
	
					country1: 'PO2',
					bottles: 1100
				}
				,
				{
					country1: 'PO4',
					bottles: 1000
				},
				{
					country1: 'PO6',
					bottles: 2000
				}
			];

			// Add first Series
			var pieSeries1 = chart.series.push(new am4charts.PieSeries());
			pieSeries1.dataFields.value = 'litres';
			pieSeries1.dataFields.category = 'country';
			pieSeries1.slices.template.stroke = am4core.color('#fff');
			pieSeries1.slices.template.strokeWidth = 2;
			pieSeries1.slices.template.strokeOpacity = 1;

			let ps1 = pieSeries1.slices.template.states.getKey('hover');
			ps1.properties.scale = 1;

			let as1 = pieSeries1.slices.template.states.getKey('active');
			as1.properties.shiftRadius = 0;

			pieSeries1.slices.template.fillOpacity = 1;
			let hs1 = pieSeries1.slices.template.states.getKey('hover');
			hs1.properties.scale = 1;
			hs1.properties.fillOpacity = 0.5;
			pieSeries1.labels.template.text = '{category}';
			pieSeries1.alignLabels = false;
			pieSeries1.labels.template.radius = -30;
			pieSeries1.labels.template.padding(0, 0, 0, 0);
			//pieSeries1.labels.template.fontSize= 10;
			pieSeries1.labels.template.fill = am4core.color('#fff');
			pieSeries1.ticks.template.disabled = true;

			pieSeries1.slices.template.events.on(
				'hit',
				function(ev) {
					console.log('clicked on ', ev.target.dataItem.dataContext);
				},
				this
			);
			
			var colorSet = new am4core.ColorSet();
			colorSet.list = ['#003333','#ccccff' ,"#e6b800" ,'#8c8c8c' ,"#ffbb99"].map(color => {
			return am4core.color(color);
			});
			pieSeries1.colors = colorSet;





			// Add second series
			var pieSeries2 = chart.series.push(new am4charts.PieSeries());
			pieSeries2.dataFields.value = 'bottles';
			pieSeries2.dataFields.category = 'country1';
			pieSeries2.slices.template.stroke = am4core.color('#fff');
			pieSeries2.slices.template.strokeWidth = 2;
			pieSeries2.slices.template.strokeOpacity = 1;
			pieSeries2.slices.template.states.getKey('hover').properties.shiftRadius = 0;
			pieSeries2.slices.template.states.getKey('hover').properties.scale = 1.1;

			let ps2 = pieSeries2.slices.template.states.getKey('hover');
			ps2.properties.scale = 1;

			let as2 = pieSeries2.slices.template.states.getKey('active');
			as2.properties.shiftRadius = 0;

			pieSeries2.slices.template.fillOpacity = 1;
			let hs2 = pieSeries2.slices.template.states.getKey('hover');
			hs2.properties.scale = 1;
			hs2.properties.fillOpacity = 0.5;
			pieSeries2.labels.template.text = '{category}';
			pieSeries2.alignLabels = false;
			pieSeries2.labels.template.radius = -30;
			pieSeries2.labels.template.padding(0, 0, 0, 0);
			//pieSeries2.labels.template.fontSize= 10;
			pieSeries2.labels.template.fill = am4core.color('#fff');
			pieSeries2.ticks.template.disabled = true;

			var colorSet = new am4core.ColorSet();
			colorSet.list = ['#003333','#003333' ,'#003333','#003333','#ccccff','#ccccff','#e6b800',
			 				'#8c8c8c','#8c8c8c', '#ffbb99'].map(color => {
			return am4core.color(color);
			});
			pieSeries2.colors = colorSet;

			//disable the logo  :)
			chart.logo.disabled = true;
		});
	}

	ngOnDestroy() {
		this.zone.runOutsideAngular(() => {
			if (this.chart) {
				this.chart.dispose();
			}
		});
	}

}
