import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Job } from '.././jobs/job/job';
import { JobService } from '.././jobs/job/job.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jobs: Job[];
  labels = new Array();
  chartData = new Array();
  constructor(private jobService: JobService) {
    
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
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          
        }

      }]
    }
  };
  //barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartLabels: Label[] = this.labels;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [ { data: this.chartData, label: 'Jobs'}]
 // barChartData: ChartDataSets[] = [
  //  { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  //];

  getJobs(){
    this.jobService.getJobs().subscribe(
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
      console.log("Job Id ", element.job_id);
      this.labels.push(element.job_id);
      this.chartData.push(element.estimated_hour);
    });
    console.log('Job labels ', this.labels);
    console.log('Job data ', this.chartData);
  }
}
