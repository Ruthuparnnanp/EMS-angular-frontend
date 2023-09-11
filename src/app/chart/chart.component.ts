import { Component } from '@angular/core';
import * as HighCharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting'; // for downloading

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  highCharts = HighCharts;
  chartOptions = {};

  constructor() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true,
        type: 'pie',
      },
      title: {
        text: 'Projection completion report sept 2023',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },

      credits: {
        enabled: false,
      },

      series: [
        {
          name: 'Projects',
          colorByPoint: true,
          data: [
            {
              name: 'Angular',
              y: 40,
              sliced: true,
              selected: true,
            },
            {
              name: 'React',
              y: 30,
            },
            {
              name: 'TypeScript',
              y: 10,
            },
            {
              name: 'JavaScript',
              y: 5,
            },
            {
              name: 'Bootstrap',
              y: 5,
            },
            {
              name: 'CSS',
              y: 5,
            },
            {
              name: 'HTML',
              y: 5,
            },
          ],
        },
      ],
    };

    HC_exporting(HighCharts); //to download
  }
}
