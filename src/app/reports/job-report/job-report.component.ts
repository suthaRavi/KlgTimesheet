import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
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
  //job_times: JobTime[];
  timeSheets: TimeSheet[] = [{
    first_name: '',
    job_date: new Date,
    job_times: []
 
  }]
 // job_times: JobTime[];
 // public data: TimeSheet[]; 
  pipe = new DatePipe('en-US');
  public tsForm= new FormGroup ({
    job_id: new FormControl(''),
    job_date: new FormControl('')
  })
  // today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
   today = new Date().toJSON();

   // @Input() timeSheets: TimeSheet[];
  constructor( private jobService: JobService, private fb: FormBuilder,
    private timeSheetService: TimeSheetService) { 
      // this.tsForm = this.fb.group({
      //   job_id: [''],
      //   job_date: [''],
        
      // });
    }

  ngOnInit() {
    this.today = this.pipe.transform(this.today, 'M/dd/yyyy')
    console.log('On Init ', this.timeSheets[0].first_name);
    this.getJobs();
    this.tsForm.controls.job_date.setValue(this.today);
    console.log('Today is ', this.today);
  }

  setTsFormValue(){
    
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
   // alert('Onsubmit');

    if(this.tsForm.valid){
      console.log("Search Job date", this.tsForm.value.job_id);
      if(( this.tsForm.value.job_id != undefined && this.tsForm.value.job_id)){
        console.log("Search by Job id");
        if(typeof this.tsForm.value.job_date != undefined && this.tsForm.value.job_date){
          console.log("Search By job id and Job date");
          this.tsForm.value.job_date = this.pipe.transform(this.tsForm.value.job_date, 'yyyy-MM-dd');
          this.timeSheetService.getJobTimeByDateByJobId(this.tsForm.value.job_id, this.tsForm.value.job_date).subscribe(
            results => {
              this.timeSheets = results;
              console.log('Report by date, job id ', results);
              console.log('Report Time sheets ', this.timeSheets[0].first_name);
              console.log('Report job department ', this.timeSheets[0].job_times[0].job_department);
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
