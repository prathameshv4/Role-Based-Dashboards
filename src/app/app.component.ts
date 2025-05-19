import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";
import { HeaderComponent } from './header/header.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BarComponent, HeaderComponent, PieChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sales-Dashboard';
}
