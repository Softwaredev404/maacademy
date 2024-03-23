import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReportsService } from './../../../../shared/API-Service/services/reports.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-reporting',
  templateUrl: './student-reporting.component.html',
  styleUrls: ['./student-reporting.component.css']
})
export class StudentReportingComponent implements OnInit {
  chart: any;
  FilterData:any;
  FilterDataExams:any;
  constructor( private _ReportsService:ReportsService
             , private _Router:Router
             , private _ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this._ActivatedRoute.queryParams.subscribe(queryParams => {
    this.getReports(queryParams['id'])
   })
}

  getReports(id:number){
   this._ReportsService.Get(id, { }).subscribe((res) => {
    this.FilterData = res;
    this.FilterDataExams = res.data;
    this.charts(res);
   })
  }
  charts(data:any){
    this.chart = new Chart(document.getElementById('myChart1') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: ['عدد الامتحانات', 'عدد الامتحانات المستخدمة'], // x-axis labels
        datasets: [
          {
            label: 'Dataset', 
            data: [data.total, data.attendted],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)'
            ],
            borderColor: 'rgba(75, 192, 192, 1)', // bar border color
            borderWidth: 1 // bar border width
          }
        ]
      },
    });
  }
}
