import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";
import { HeaderComponent } from './header/header.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DonutPieChartComponent } from './donut-pie-chart/donut-pie-chart.component';
import { SemiCirclePieChartComponent } from './semi-circle-pie-chart/semi-circle-pie-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BarComponent, HeaderComponent, PieChartComponent, PieChartComponent, DonutPieChartComponent, SemiCirclePieChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sales-Dashboard';
}
