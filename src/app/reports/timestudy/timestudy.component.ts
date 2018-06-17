import { Component, OnChanges,   OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs/observable/forkJoin';

//import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Member } from '../../member/member/member';
import { MemberService } from '../../member/member/member.service';
import { Job } from '../../jobs/job/job';
import { JobService } from '../../jobs/job/job.service';
import { TimeSheet, JobTime } from '../../time-sheet/time-sheet';
import { TimeSheetService } from '../../time-sheet/time-sheet.service';
@Component({
  selector: 'timestudy',
  templateUrl: './timestudy.component.html',
  styleUrls: ['./timestudy.component.css']
})
export class TimestudyComponent implements  OnInit {

  @ViewChild('searchForm') form: any;
  members: Member[];
  jobs: Job[];
  timeSheets: TimeSheet[];
  public data: TimeSheet[];
  //queryString = "SELECT * FROM time_sheets WHERE ";
  
  pipe = new DatePipe('en-US');  
  //public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  //@ViewChild('searchForm') form: any;
  constructor(private memberService: MemberService, private jobService: JobService,
              private timeSheetService :TimeSheetService) {
              
               }

  ngOnInit() {
  //  this.timeSheets = new TimeSheet;
  //  this.timeSheets.first_name = 'Test';
    this.getResources();
  //  const now = Date.now();
 // const myFormattedDate = this.pipe.transform(now, 'yyyy-M-dd');
 // console.log("Date ", myFormattedDate);

    
  }

  getResources()
  {
    let mem = this.memberService.getMembers();
    let job = this.jobService.getJobs();
    forkJoin([ mem, job 
    ]).subscribe(
        results => {
          console.log(" Member " , results[0]);
          this.members = results[0];
          this.jobs = results[1];
          console.log("Job  ", results[1]);         

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
  onSubmit(form: any){
    if(this.form.valid){
//      alert(form.first_name); 
      this.timeSheets = [];
      if(typeof form.first_name!= 'undefined' && form.first_name){
        form.job_date = this.pipe.transform(form.job_date, 'yyyy-M-dd');
        form.end_date = this.pipe.transform(form.end_date, 'yyyy-M-dd');
        console.log("*** Job date ", form.job_date);
        this.timeSheetService.getTimeSheets(form.first_name,form.job_id, form.job_date, form.end_date).subscribe(
          results =>{
            this.data = results;
            console.log("this data ", this.data);
            this.timeSheets = this.data;
            
            if(this.timeSheets){
              this.form.reset();
              console.log("True data ", this.timeSheets[0].first_name);
            }
            else{
//              console.log("Null data");
              alert("Data not found");
            }
            
            //console.log("Data ", this.timeSheets);
          // console.log("First name ", this.timeSheets.first_name);
          // console.log("Job Times ", this.timeSheets.job_times[0].job_time);
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
    }
    else{alert(" Form is not valid");}
  }

  /** 
  search(form: any){
      
      if(typeof form.first_name!= 'undefined' && form.first_name){
       // alert("first name  " + form.first_name);
        if(form.job_id != 'undsfined' && form.job_id ){
          this.queryString = this.queryString + " first_name=' " + form.first_name + " ' and job_id=' " + form.job_id + "'";
        }
        else{
          this.queryString = this.queryString + " first_name= '" + form.first_name + "'";
        }       
      }
      else{
        if(form.job_id != 'undsfined' && form.job_id ){
          this.queryString = this.queryString + "job_id= '" + form.job_id + "'";
        }
      }

      console.log("Query string ", this.queryString)
      this.timeSheetService.getTimeSheets(this.queryString).subscribe(
        reults =>{
          this.timeSheets = reults;
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
  */
}
