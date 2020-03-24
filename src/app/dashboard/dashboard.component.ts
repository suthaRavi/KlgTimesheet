import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Job } from '.././jobs/job/job';
import { JobService } from '.././jobs/job/job.service';
import { JobTime } from '../time-sheet/time-sheet';
import { TimeSheetService } from '../time-sheet/time-sheet.service'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jobs: Job[];
  job_times: JobTime[];
  labels = new Array();
  chartData = new Array();
  actualTimeData = new Array();
  actualTime: number = 0;
  constructor(private jobService: JobService, private tsService: TimeSheetService) {
    
   }

   async ngOnInit() {
    // this.labels[0] = 'Ravi';
    console.log(" Init ", this.labels);
    await this.getJobs();   
    setTimeout(() => {
      this.getData();
    }, 500);
  }
  
  barChartOptions = {
    responsive: true,
    barValueSpacing: 0,
    scales: {
      xAxes: [{
 //      categoryPercentage: 0.3,
  //      barPercentage: 0.2
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,          
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  //barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartLabels: Label[] = this.labels;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [

              { data: this.chartData, label: 'Estmated Time',categoryPercentage: 0.8,
              barPercentage: 1},
              { data: this.actualTimeData,label: 'Actual Time',categoryPercentage: 0.5,
              barPercentage: 1 }                        
]
 // barChartData1: ChartDataSets[] = [ { data: this.actualTimeData, label: 'Jobs'}]
 // barChartData: ChartDataSets[] = [
  //  { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  //];

  getJobs(){
    this.jobService.getDashboardJobs("Under Progress").subscribe(
      results =>{
        this.jobs = results;
        console.log("Job ", this.jobs);
      },
      (err: HttpErrorResponse) => {
        if(err.error instanceof Error){
          console.log(' client error ', err.error.message);
        }else{
          console.log('  Backend returned status code: ', err.status);
          console.log('  Response body: ', err.error);
        }
      }
    )


  }
  getData(){
    console.log("Get Data ", this.jobs);
    this.jobs.forEach(element => {
      this.getJobTime(element.job_id);
      console.log("Job Id ", element.job_id);

      this.labels.push(element.job_id);
      this.chartData.push(element.estimated_hour);
      
    });
    console.log('Job labels ', this.labels);
    console.log('Job data ', this.chartData);
  }

  getJobTime(job_id: string){
    let total: number = 0.0;
    this.tsService.getJobTimes(job_id).subscribe(
      results =>{
        this.job_times = results;
        this.job_times.forEach(jobTime =>{
          console.log(" ### Job Time " + Object.values(jobTime) );
          total = total + jobTime.job_time;
          console.log("Total " + total);
        })
        this.actualTime = total;
        this.actualTimeData.push(total);
        console.log("*** Job Time ", this.actualTimeData);
      },
      (err: HttpErrorResponse) => {
        if(err.error instanceof Error){
          console.log(' client error ', err.error.message);
        }else{
          console.log('  Backend returned status code: ', err.status);
          console.log('  Response body: ', err.error);
        }
      }
    )
    console.log("Job time " + job_id);
  }
}
