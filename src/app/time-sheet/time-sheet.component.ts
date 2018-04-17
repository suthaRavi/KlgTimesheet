import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

//import { Observable } from 'rxjs/Observable' ;
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Department } from '../member/department/department';
import { DepartmentService } from '../member/department/department.service';
import { MemberService } from '.././member/member/member.service';
import { Member } from '.././member/member/member';
import { Job } from '.././jobs/job/job';
import { JobService } from '.././jobs/job/job.service';
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
  categories: string[];
  _jobTime: JobTime[];
  _timeSheet: TimeSheet;
  today: number = Date.now() ;
  members:  Member[];
  departments: Department[];
  jobs: Job[];

  
  constructor(private fb: FormBuilder, private memberService: MemberService,
    private departmentService: DepartmentService, private jobService: JobService,
    private timeSheetService: TimeSheetService) {

   }

  ngOnInit() {
    this.categories = ['Finishing', 'Roughing', 'Polishing'];
    this.timeSheetForm = this.fb.group({
      first_name: [''],
      job_date: null,
      job_times: this.fb.array([this.init_time()])
    });

    this.timeSheetForm.valueChanges.subscribe(form =>{
      let hour: number = 0;
     // console.log(this.timeSheetForm.controls.job_times.value);
      this._jobTime = this.timeSheetForm.controls.job_times.value;
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
  const control = <FormArray> this.timeSheetForm.controls['job_times'];
  control.push(this.init_time());
 
 
}

removeTime(i: number){
 
  const controle = <FormArray> this.timeSheetForm.controls['job_times'];
  controle.removeAt(i);
 
}



getResources(){
  let mem = this.memberService.getMembers();
  let dep = this.departmentService.getDepartments();
  let job = this.jobService.getJobs();
  forkJoin([ mem,dep, job 
            ]).subscribe(
    results => {
      console.log(" Results 0 " , results[0]);
      this.members = results[0];
      this.departments = results[1];
      console.log("Results 1  ", results[1]);
      this.jobs = results[2];
      console.log(" Results 2 ", results[2])

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
  console.log("Save ");
  console.log("Form Value ", this.timeSheetForm.value);
  this._timeSheet = this.timeSheetForm.value;
  console.log("TimeSheet ", this._timeSheet);
  this.timeSheetService.addTimeSheet(this._timeSheet).subscribe(
    res => {
      console.log(" TimeSheet added")
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