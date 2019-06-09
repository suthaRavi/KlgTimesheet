import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Job } from '../../jobs/job/job';
import { JobService } from '../../jobs/job/job.service';
import { TimeSheet, JobTime } from '../../time-sheet/time-sheet';
import { TimeSheetService } from '../../time-sheet/time-sheet.service';

@Component({
  selector: 'job-report',
  templateUrl: './job-report.component.html',
  styleUrls: ['./job-report.component.css']
})
export class JobReportComponent implements OnInit {

  jobs: Job[];
  timeSheet: TimeSheet;
  job_times: JobTime[];
  public data: TimeSheet[];
  pipe = new DatePipe('en-US');
  public tsForm: FormGroup;

  constructor( private jobService: JobService, private fb: FormBuilder,
    private timeSheetService: TimeSheetService) { }

  ngOnInit() {
    this.tsForm = this.fb.group({
      job_id: [{ value: '' }],
      job_date: [{ value: null }],
      
    });
    this.getJobs();
  }

  getJobs(){
    this.jobService.getJobs().subscribe(
      results =>{
        if(results.length > 0){
          this.jobs = results;
          console.log("Jobs ", this.jobs);
        }
        else{
          alert("Data not found");

        }
        
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
  onSubmit(){
    alert('Onsubmit');

    if(this.tsForm.valid){
      console.log("Search Job date", this.tsForm.value.job_id);
      if(( this.tsForm.value.job_id != undefined && this.tsForm.value.job_id)){
        console.log("Search by Job id");
        if(typeof this.tsForm.value.job_date != undefined && this.tsForm.value.job_date){
          console.log("Search By job id and Job date");
          this.tsForm.value.job_date = this.pipe.transform(this.tsForm.value.job_date, 'yyyy-M-dd');
          this.timeSheetService.getJobTimeByDateByJobId(this.tsForm.value.job_id, this.tsForm.value.job_date).subscribe(
            results => {
  
              console.log('Report by date, job id ', results);
  
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log(' client error ', err.error.message);
              } else {
                console.log('  Backend returned status code: ', err.status);
                console.log('  Response body: ', err.error);
              }
            }
          )

        }
      }
     
    }
  }

}
