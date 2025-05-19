import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
  public activeTab = 'QH';
  private chart: am4charts.XYChart | undefined;
  constructor() { }
  private chartData: any = {
    'QH': [
      { date: "Feb 3", value: 58 },
      { date: "Feb 4", value: 90 },
      { date: "Feb 5", value: 100 },
      { date: "Feb 6", value: 110 },
      { date: "Feb 7", value: 89 },
      { date: "Feb 8", value: 65 },
      { date: "Feb 9", value: 50 },
      { date: "Feb 10", value: 55 },
      { date: "Feb 11", value: 100 },
      { date: "Feb 12", value: 90 }
    ],
    'MICRO': [
      { date: "Feb 3", value: 98 },
      { date: "Feb 4", value: 10 },
      { date: "Feb 5", value: 10 },
      { date: "Feb 6", value: 30 },
      { date: "Feb 7", value: 50 },
      { date: "Feb 8", value: 100 },
      { date: "Feb 9", value: 60 },
      { date: "Feb 10", value: 80 },
      { date: "Feb 11", value: 20 },
      { date: "Feb 12", value: 45 }
    ],
    'AF': [
      { date: "Feb 3", value: 120 },
      { date: "Feb 4", value: 30 },
      { date: "Feb 5", value: 60 },
      { date: "Feb 6", value: 70 },
      { date: "Feb 7", value: 80 },
      { date: "Feb 8", value: 120 },
      { date: "Feb 9", value: 60 },
      { date: "Feb 10", value: 90 },
      { date: "Feb 11", value: 40 },
      { date: "Feb 12", value: 12 }
    ]
  }
  public tabs = [
    { id: 'QH', label: 'QH' },
    { id: 'MICRO', label: 'Micro' },
    { id: 'AF', label: 'AF' }
  ];

  ngOnInit(): void {
    this.createChart();
  }






  selectTab(tabId: string) {

    this.activeTab = tabId;
    if (this.chart) {
      this.chart.dispose();
    }
    this.createChart();

  }

  private createChart() {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = this.chartData[this.activeTab];
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    ;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeWidth = 0;
    // categoryAxis.renderer.minGridDistance = 0;
    // categoryAxis.renderer.cellStartLocation = 0.2,
    // categoryAxis.renderer.cellEndLocation = 0.8

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Sales Achievement";
    valueAxis.title.fontWeight = "bold";

    valueAxis.min = 0;
    valueAxis.max = 120;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 50;
    valueAxis.calculateTotals = true;
    let series = chart.series.push(new am4charts.ColumnSeries());



    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}%[/]";

    series.columns.template.fill = am4core.color("#d62728");
    series.columns.template.stroke = am4core.color("#d62728");
    series.columns.template.adapter.add("fill", (fill, target) => {
      let value = target.dataItem?.values['valueY']['value'] || 0;
      if (value < 90) return am4core.color("#d62728"); // red
      else if (value < 100) return am4core.color("#ffbf00"); // yellow
      else return am4core.color("#2ca02c"); // green

    });
    series.columns.template.adapter.add("stroke", (stroke, target) => {
      let value = target.dataItem?.values['valueY']['value'] || 0;
      if (value < 90) return am4core.color("#d62728");
      else if (value < 100) return am4core.color("#ffbf00");
      else return am4core.color("#2ca02c");
    });
    chart.legend = new am4charts.Legend();
    chart.legend.data = [
      { name: "< 90%", fill: am4core.color("#d62728") },
      { name: "90–100%", fill: am4core.color("#ffbf00") },
      { name: "≥ 100%", fill: am4core.color("#2ca02c") }
    ];
    this.chart = chart;


  }
  ngOnDestroy(): void {

    if (this.chart) {
      this.chart.dispose();
    }

  }


}


