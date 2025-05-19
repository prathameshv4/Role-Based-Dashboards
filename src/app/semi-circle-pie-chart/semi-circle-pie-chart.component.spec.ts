import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiCirclePieChartComponent } from './semi-circle-pie-chart.component';

describe('SemiCirclePieChartComponent', () => {
  let component: SemiCirclePieChartComponent;
  let fixture: ComponentFixture<SemiCirclePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemiCirclePieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemiCirclePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
