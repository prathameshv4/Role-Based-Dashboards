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

  public inputValue: number = 0;
  public label: string = '';
  public shortfall: number = 0;

  private chart?: am4charts.PieChart;
  public percentage: number = 0;

  public percentageText: string = '';
  @ViewChild('chartDiv') chartDiv: ElementRef;
  actualPercentage: number;

  ngAfterViewInit(): void {

    // const achievedColor = this.percentage > 100 ? "#ffff1a" : "#ff0000";
    // const shortfallColor = this.percentage > 100 ? "#00cc00" : "#e0e0e0";

    // // Chart config
    // this.chart = am4core.create(this.pieChartName, am4charts.PieChart);
    // this.chart.innerRadius = am4core.percent(50);
    // // this.chart.startAngle = 180;
    // // this.chart.endAngle = 360;

    // this.chart.data = [
    //   {
    //     key: "Achieved",
    //     value: this.achieved,
    //     color: am4core.color(achievedColor)
    //   },
    //   {
    //     key: "Shortfall",
    //     value: this.shortfall,
    //     color: am4core.color(shortfallColor)
    //   }
    // ];

    // let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    // pieSeries.dataFields.value = "value";
    // pieSeries.dataFields.category = "key";
    // pieSeries.slices.template.propertyFields.fill = "color";

    // pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
    // pieSeries.labels.template.text = "";
    // pieSeries.ticks.template.disabled = true;
    // pieSeries.tooltip.disabled = true;
    this.createSemiPieChart();
  }

  ngOnInit(): void {
    this.inputValue = this.target ?? this.commit ?? 0;
    this.label = this.target !== undefined ? 'Target' : 'Commit';
    this.percentage = this.inputValue > 0 ? (this.achieved / this.inputValue) * 100 : 0;
    this.shortfall = Math.max(this.inputValue - this.achieved, 0);
    this.actualPercentage = (this.achieved / this.target) * 100;
  }

  createSemiPieChart(): void {
    this.chart = create(this.chartDiv.nativeElement, PieChart);
    this.chart.innerRadius = am4core.percent(60);

    this.chart.data = [
      { category: 'Achieved', value: this.achieved },
      { category: 'Shortfall', value: (this.target - this.achieved) > 0 ? (this.target - this.achieved) : 0 }
    ];

    this.chart.startAngle = 180;
    this.chart.endAngle = 360;

    const pieSeries = this.chart.series.push(new PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'category';

    pieSeries.slices.template.cornerRadius = 0;
    pieSeries.slices.template.innerRadius = 50;

    pieSeries.slices.template.adapter.add('fill', (fill, target) => {
      if (target.dataItem.dataContext['category'] === 'Shortfall') {
        return color('#e0e0e0');
      }
      return color('#4caf50');
    });
    pieSeries.slices.template.stroke = color('#ffffff');
    pieSeries.labels.template.disabled = true;

    // if (this.actualPercentage > 100) {
    //   const angle = 270 + (this.achieved / this.target) * 180;

    //   const thresholdLine = this.chart.seriesContainer.createChild(am4core.Line);
    //   thresholdLine.stroke = am4core.color("#FF0000");
    //   thresholdLine.strokeWidth = 2;
    //   thresholdLine.strokeDasharray = "4,4";

    //   thresholdLine.y2 = 170;
    //   thresholdLine.x1 = 0
    //   thresholdLine.y1 = 115
    //   thresholdLine.rotation = angle;
    // }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}

