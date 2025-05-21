import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import { create, color } from '@amcharts/amcharts4/core';
import { PieChart } from '@amcharts/amcharts4/charts';
import { PieSeries } from '@amcharts/amcharts4/charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-semi-circle-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semi-circle-pie-chart.component.html',
  styleUrl: './semi-circle-pie-chart.component.css'
})
export class SemiCirclePieChartComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() target?: number;
  @Input() commit?: number;
  @Input() achieved: number = 0;
  @Input() pieChartName: string = '';

  public percentage: number = 0;
  public inputValue: number = 0;
  public shortfall: number = 0;
  public label: string = '';

  private chart?: am4charts.PieChart;

  @ViewChild('chartDiv') chartDiv: ElementRef;

  ngOnInit(): void {
    this.inputValue = this.target ?? this.commit ?? 0;
    this.label = this.target !== undefined ? 'Target' : 'Commit';
    this.percentage = this.inputValue > 0 ? (this.achieved / this.inputValue) * 100 : 0;
    this.shortfall = Math.max(this.inputValue - this.achieved, 0);
  }

  ngAfterViewInit(): void {
    this.createSemiPieChart();
  }

  private createSemiPieChart(): void {
    this.chart = create(this.chartDiv.nativeElement, PieChart);
    this.chart.innerRadius = am4core.percent(70);
    this.chart.radius = am4core.percent(90)

    this.chart.data = [
      { category: 'Achieved', value: (this.percentage <= 100) ? this.achieved : 0 },
      { category: 'Shortfall', value: (this.inputValue - this.achieved) > 0 ? (this.inputValue - this.achieved) : 0 },
      { category: 'Base 100%', value: (this.percentage > 100) ? this.inputValue : 0 },
      { category: 'Over Achievement', value: (this.percentage > 100) ? (this.achieved - this.inputValue) : 0 }
    ];

    this.chart.startAngle = 180;
    this.chart.endAngle = 360;

    const pieSeries = this.chart.series.push(new PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'category';

    pieSeries.slices.template.cornerRadius = 0;

    // let fillModifier = new am4core.RadialGradientModifier();
    // fillModifier.opacities = [1, 1, 0];
    // fillModifier.offsets = [0, 0.8, 1];
    // pieSeries.slices.template.fillModifier = fillModifier;

    pieSeries.slices.template.adapter.add('fill', (fill, target) => {
      if (target.dataItem.dataContext['category'] === 'Shortfall') {
        return color('#e0e0e0');
      }
      if (target.dataItem.dataContext['category'] === 'Over Achievement') {
        return color('#2ca02c');
      }
      if (target.dataItem.dataContext['category'] === 'Base 100%') {
        return color('#ffbf00');
      }
      if (target.dataItem.dataContext['category'] === 'Achieved') {
        if (this.percentage < 90) return color("#d62728");
        else if (this.percentage < 100) return color("#ffbf00");
        else return color("#2ca02c");
      }
      return color('#000000');

    });
    pieSeries.slices.template.stroke = color('#ffffff');
    pieSeries.labels.template.disabled = true;

    if (this.percentage > 100) pieSeries.slices.template.tooltipText = "";

  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}

