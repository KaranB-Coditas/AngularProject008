import { Skeleton } from 'primeng/skeleton';

import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { LayoutService } from '../../../service/chart.service';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-graphchart',
  imports: [Skeleton,ChartModule,CardModule],
  templateUrl: './graphchart.component.html',
  styleUrl: './graphchart.component.css'
})
export class GraphchartComponent implements OnInit {

  chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initChart();
        });
    }
    

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const borderColor = documentStyle.getPropertyValue('--p-content-border-color');
        const textMutedColor = documentStyle.getPropertyValue('--p-text-muted-color');

        this.chartData = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Meeting Scheduled',
                    backgroundColor: documentStyle.getPropertyValue('--p-sky-500'),
                    data: [4000, 10000, 15000, 4000, 4000, 2400],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Not Interested',
                    backgroundColor: documentStyle.getPropertyValue('--p-sky-400'),
                    data: [4000, 10000, 15000, 4000, 7000, 10000, 2400],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Interested',
                    backgroundColor: documentStyle.getPropertyValue('--p-sky-300'),
                    data: [2100, 8400, 2400, 7500, 6000, 7500,2400],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Voicemail',
                    backgroundColor: documentStyle.getPropertyValue('--p-sky-200'),
                    data: [4100, 5200, 3400, 7400, 7000,3400,5200],
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    borderSkipped: false,
                    barThickness: 32
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                        borderColor: 'transparent'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: borderColor,
                        borderColor: 'transparent',
                        drawTicks: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
