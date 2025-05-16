import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  @Input() target?: number;
  @Input() commit?: number;
  @Input() achieved: number = 0;
  @Input() pieChartName: string = '';


  public label = '';
  public inputValue = 0;
  public shortfall = 0;
  public percentage = 0;
  public displayPercentage = '0%';
  public rotation = 0; // For marker
  public filledAngle = 0; // Arc angle

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

    // For arc fill
    this.filledAngle = Math.min(this.percentage, 100) * 1.8;

    // Marker for 100% (position shifts left for overachievement)
    this.rotation = this.percentage > 100 ? 180 * (100 / this.percentage) : 180;

    // Precompute arc path and marker coordinates
    this.arcPath = this.getArcPath(this.filledAngle);
    this.markerCoordinates = this.percentage > 100 ? this.getMarkerCoordinates() : null;
  }

  public getArcPath(angle: number): string {
    const radius = 95;
    const startX = 195;
    const startY = 110;

    const theta = angle * Math.PI / 180;
    const endX = 100 - radius * Math.cos(theta);
    const endY = 110 - radius * Math.sin(theta);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},0 ${endX},${endY}`;
  }

  public getMarkerCoordinates() {
    if (this.percentage <= 100) return null;

    const angleDeg = 180 * (100 / this.percentage); // Where 100% would fall
    const angleRad = Math.PI + (angleDeg * Math.PI / 180);

    const innerRadius = 83; // Inner edge of background arc (110 - 90 + 20/2)
    const outerRadius = 105; // Outer edge of arc
    const extraLength = 8;   // Line extends slightly past arc

    const x1 = 100 + innerRadius * Math.cos(angleRad);
    const y1 = 110 + innerRadius * Math.sin(angleRad);

    const x2 = 100 + (outerRadius + extraLength) * Math.cos(angleRad);
    const y2 = 110 + (outerRadius + extraLength) * Math.sin(angleRad);

    const labelX = 100 + (outerRadius + extraLength + 10) * Math.cos(angleRad);
    const labelY = 110 + (outerRadius + extraLength + 10) * Math.sin(angleRad);

    return { x1, y1, x2, y2, labelX, labelY };
  }
}
