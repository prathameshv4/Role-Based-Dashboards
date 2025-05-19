import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-semi-circle-pie-chart',
  standalone: true,
  imports: [],
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


  ngAfterViewInit(): void {

    const achievedColor = this.percentage > 100 ? "#ffff1a" : "#ff0000";
    const shortfallColor = this.percentage > 100 ? "#00cc00" : "#e0e0e0";

    // Chart config
    this.chart = am4core.create(this.pieChartName, am4charts.PieChart);
    this.chart.innerRadius = am4core.percent(50);
    // this.chart.startAngle = 180;
    // this.chart.endAngle = 360;

    this.chart.data = [
      {
        key: "Achieved",
        value: this.achieved,
        color: am4core.color(achievedColor)
      },
      {
        key: "Shortfall",
        value: this.shortfall,
        color: am4core.color(shortfallColor)
      }
    ];

    let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "key";
    pieSeries.slices.template.propertyFields.fill = "color";

    pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
    pieSeries.labels.template.text = "";
    pieSeries.ticks.template.disabled = true;
    pieSeries.tooltip.disabled = true;
  }

  ngOnInit(): void {
    this.inputValue = this.target ?? this.commit ?? 0;
    this.label = this.target !== undefined ? 'Target' : 'Commit';
    this.percentage = this.inputValue > 0 ? (this.achieved / this.inputValue) * 100 : 0;
    this.shortfall = Math.max(this.inputValue - this.achieved, 0);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}

