import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-donut-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donut-pie-chart.component.html',
  styleUrl: './donut-pie-chart.component.css'
})
export class DonutPieChartComponent implements OnInit {
  @Input() target?: number;
  @Input() commit?: number;
  @Input() achieved: number = 0;
  @Input() pieChartName: string = '';

  public label = '';
  public inputValue = 0;
  public shortfall = 0;
  public percentage = 0;
  public displayPercentage = '0%';
  public arcPath: string = '';
  public markerCoordinates: { x1: number, y1: number, x2: number, y2: number, labelX: number, labelY: number } | null = null;

  ngOnInit(): void {
    this.inputValue = this.target ?? this.commit ?? 0;
    this.label = this.target !== undefined ? 'Target' : 'Commit';
    this.calculateValues();
  }

  public calculateValues(): void {
    if (this.inputValue === 0) return;

    this.percentage = (this.achieved / this.inputValue) * 100;
    this.displayPercentage = `${Math.round(this.percentage)}%`;
    this.shortfall = this.achieved < this.inputValue ? this.inputValue - this.achieved : 0;

    const angle = Math.min(this.percentage, 100) * 3.6;
    this.arcPath = this.getArcPath(angle);

    this.markerCoordinates = this.percentage > 100 ? this.getMarkerCoordinates() : null;
  }

  public getArcPath(angle: number): string {
    const radius = 90;
    const cx = 100, cy = 100;
    const startAngle = -90;
    const endAngle = startAngle + angle;

    const largeArcFlag = angle > 180 ? 1 : 0;

    const startX = cx + radius * Math.cos(startAngle * Math.PI / 180);
    const startY = cy + radius * Math.sin(startAngle * Math.PI / 180);

    const endX = cx + radius * Math.cos(endAngle * Math.PI / 180);
    const endY = cy + radius * Math.sin(endAngle * Math.PI / 180);

    return `M ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}`;
  }

  public getMarkerCoordinates() {
    const angleDeg = 360; // 100%
    const angleRad = (angleDeg - 90) * Math.PI / 180;

    const innerRadius = 80;
    const outerRadius = 100;
    const extraLength = 8;

    const x1 = 100 + innerRadius * Math.cos(angleRad);
    const y1 = 100 + innerRadius * Math.sin(angleRad);

    const x2 = 100 + (outerRadius + extraLength) * Math.cos(angleRad);
    const y2 = 100 + (outerRadius + extraLength) * Math.sin(angleRad);

    const labelX = 100 + (outerRadius + extraLength + 10) * Math.cos(angleRad);
    const labelY = 100 + (outerRadius + extraLength + 10) * Math.sin(angleRad);

    return { x1, y1, x2, y2, labelX, labelY };
  }
}

