import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
//import { Observable } from 'rxjs/Observable' ;
import { forkJoin } from 'rxjs';

import { Department } from '../member/department/department';
import { DepartmentService } from '../member/department/department.service';
import { MemberService } from '.././member/member/member.service';
import { Member } from '.././member/member/member';
import { Job } from '.././jobs/job/job';
import { JobService } from '.././jobs/job/job.service';
import { JobCategory } from '.././jobs/job-category/job-category';
import { JobCategoryService } from '.././jobs/job-category/job-category.service';
import { TimeSheet, JobTime } from './time-sheet';
import { TimeSheetService } from '../time-sheet/time-sheet.service';

@Component({
  selector: 'time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {
  public timeSheetForm: FormGroup;
  public total_hours: number = 0;
 
  _jobTime: JobTime[];
  today = new Date().toJSON();
  members:  Member[];
  departments: Department[];
  jobs: Job[];
  jobCategories: JobCategory[];
  pipe = new DatePipe('en-US');
  constructor(private fb: FormBuilder, private memberService: MemberService,
    private departmentService: DepartmentService, private jobService: JobService,
    private timeSheetService: TimeSheetService, private jobCategoryService: JobCategoryService) {

   }

  ngOnInit() {
    this.today = this.pipe.transform(this.today, 'MM/dd/yyyy')
    this.timeSheetForm = this.fb.group({
      first_name: [''],
      job_date: null,
      job_times_attributes: this.fb.array([this.init_time()])
    });
    this.timeSheetForm.controls.job_date.setValue(this.today);
    this.timeSheetForm.valueChanges.subscribe(form =>{
      let hour: number = 0;
     // console.log(this.timeSheetForm.controls.job_times.value);
      this._jobTime = this.timeSheetForm.controls.job_times_attributes.value;
      this._jobTime.forEach(element => {
        //console.log("Job time" + element.job_time);
        hour = hour + Number(element.job_time) ;
      //  console.log("Total Hours " + hour);
        
      });
      this.total_hours = hour;

    })

  this.getResources();

}

init_time(){
  return this.fb.group({
    job_id: ['', Validators.required],
    job_department: [''],
    job_category: [''],
    job_time: [''],
    is_overtime: ['']
  });
}

addTime(){
  const control = <FormArray> this.timeSheetForm.controls['job_times_attributes'];
  control.push(this.init_time());
 
 
}

removeTime(i: number){
 
  const controle = <FormArray> this.timeSheetForm.controls['job_times_attributes'];
  controle.removeAt(i);
 
}



getResources(){
  let mem = this.memberService.getMembers();
  let dep = this.departmentService.getDepartments();
  let job = this.jobService.getJobs();
  let jobCategory = this.jobCategoryService.getJobCategories();
  forkJoin([ mem,dep, job, jobCategory 
            ]).subscribe(
    results => {
      console.log(" Members " , results[0]);
      this.members = results[0];
      this.departments = results[1];
      console.log("Departments  ", results[1]);
      this.jobs = results[2];
      console.log(" Jobs ", results[2])
      this.jobCategories = results[3];
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
save(){
 // console.log("Save ");
  console.log("Form Value ", this.timeSheetForm.value);
  this.timeSheetForm.value.job_date = this.pipe.transform(this.timeSheetForm.value.job_date, 'yyyy-M-dd');

  this.timeSheetService.addTimeSheet(this.timeSheetForm.value).subscribe(
    res => {
      console.log(" TimeSheet added")
      //this.timeSheetForm.reset();
     // console.log('Time sheet ', this.timeSheetForm.value.job_times_attributes.length)
      window.location.reload();
  
     // alert("Saved");
    },
                                                                                   
    (err: HttpErrorResponse) => {
      if(err.error instanceof Error){
        console.log(' client error ', err.error.message);
      }else{
        console.log('  Backend returned status code: ', err.status);
        console.log('  Response error: ', err.error);
        console.log('  Response header: ', err.headers);
        console.log('  Response statusText: ', err.statusText);
        console.log('  Response message: ', err.message);

        alert(" Error " + err.error);
      }
      
    }
  )

}
}