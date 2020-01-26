import { Component, OnChanges, OnInit, ViewChild, Input, SimpleChanges, TemplateRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import {ReactiveFormsModule} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Member } from '../../member/member/member';
import { MemberService } from '../../member/member/member.service';
import { Job } from '../../jobs/job/job';
import { JobService } from '../../jobs/job/job.service';
import { Department } from '../../member/department/department';
import { DepartmentService } from '../../member/department/department.service';
import { JobCategory } from '../../jobs/job-category/job-category';
import { JobCategoryService } from '../../jobs/job-category/job-category.service';
import { TimeSheet, JobTime } from '../../time-sheet/time-sheet';
import { TimeSheetService } from '../../time-sheet/time-sheet.service';



@Component({
  selector: 'timestudy',
  templateUrl: './timestudy.component.html',
  styleUrls: ['./timestudy.component.css']
})


export class TimestudyComponent implements OnChanges {
  @ViewChild('updateTimesheet') updateTimesheet: TemplateRef<any>
  @ViewChild('searchForm') form: any;
  members: Member[];
  jobs: Job[];
  departments: Department[];
  jobCategory: JobCategory[];
  timeSheet: TimeSheet;
  job_times: JobTime[];
  public data: TimeSheet[];
  //public tsForm: FormGroup;

  public tsForm= new FormGroup ({
    first_name: new FormControl(''),
    job_date: new FormControl('')
  })
  today = new Date().toJSON();


  modalRef: BsModalRef;
  pipe = new DatePipe('en-US');
  //public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  //@ViewChild('searchForm') form: any;
  constructor(private memberService: MemberService, private jobService: JobService,
    private timeSheetService: TimeSheetService, private departmentService: DepartmentService,
    private jobCategoryService: JobCategoryService,
    private fb: FormBuilder, private modalService: BsModalService) {

  }

  ngOnChanges() {

  }

  ngOnInit() {
    this.today = this.pipe.transform(this.today, 'M/dd/yyyy')
    // this.tsForm = this.fb.group({
    //   first_name: [ Validators.required],
    //   job_date: [ Validators.required],
    //   job_times_attributes: this.fb.array([])
    // });
    this.tsForm.controls.job_date.setValue(this.today);
    this.getResources();
    //  const today = Date.now();
    // const myFormattedDate = this.pipe.transform(today, 'yyyy-M-dd');
    // console.log("Date ", myFormattedDate);


  }
  init_time() {
    return this.fb.group({
      job_id: ['', Validators.required],
      job_department: ['', Validators.required],
      job_category: ['', Validators.required],
      job_time: ['', Validators.required],
      is_overtime: ['', Validators.required]
    });
  }

  getResources() {
    let mem = this.memberService.getMembers();
    let job = this.jobService.getJobs();
    let dep = this.departmentService.getDepartments();
    let jobCategory = this.jobCategoryService.getJobCategories();
    forkJoin([mem, job, dep, jobCategory
    ]).subscribe(
      results => {
        console.log(" Member ", results[0]);
        this.members = results[0];
        this.jobs = results[1];
        this.departments = results[2];
        this.jobCategory = results[3];
        console.log("Category  ", this.jobCategory);

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

  get jobtimeFormArray(): FormArray {
    return this.tsForm.get('job_times_attributes') as FormArray;
  }

  onSubmit() {
    console.log("search type ", this.tsForm.value);
    if (this.tsForm.valid) {
      //      alert(form.first_name); 
      //this.timeSheets = [];
      if ((this.tsForm.value.first_name != 'undefined' && this.tsForm.value.first_name) &&
        (this.tsForm.value.job_date != 'undefined' && this.tsForm.value.job_date)) {
          this.tsForm.value.job_date = this.pipe.transform(this.tsForm.value.job_date, 'yyyy-M-dd');
        // form.end_date = this.pipe.transform(form.end_date, 'yyyy-M-dd');
        console.log("*** Job date ", this.tsForm.value.job_date);
        this.timeSheetService.getTimeSheets(this.tsForm.value.first_name, this.tsForm.value.job_date).subscribe(
          results => {

            this.data = results;
            console.log("this data ", this.data);
            if (this.data.length > 0) {
              this.timeSheet = this.data[0];         
              this.job_times = this.timeSheet.job_times;
              // console.log(" ***Time sheet ", this.timeSheet);
              //console.log("Job Times ", this.timeSheet.job_times);

              this.createFormWithData(this.timeSheet);
              this.modalRef = this.modalService.show(this.updateTimesheet)
             // this.form.reset();
              console.log("True data ", this.timeSheet.first_name);

            }
            else {
              //              console.log("Null data");
              alert("Data not found");
            }

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
    else { alert(" Form is not valid"); }
  }

  createFormWithData(ts: TimeSheet) {
    this.tsForm.patchValue({
      first_name: ts.first_name,
      job_date: ts.job_date
    })
    let jobtimeFormGroups = ts.job_times.map(job_time => this.fb.group(job_time));
    let jobtimeFormArray = this.fb.array(jobtimeFormGroups);
    this.tsForm.setControl('job_times_attributes', jobtimeFormArray);
  }

  addTime(i: number) {
    console.log("Form Job times ADD ", this.tsForm.value.job_times_attributes[0].time_sheet_id);
    this.tsForm.value.job_times_attributes[i + 1].time_sheet_id = this.tsForm.value.job_times_attributes[0].time_sheet_id;
    const control = <FormArray>this.tsForm.controls['job_times_attributes'];
    control.push(this.init_time());
  }
  removeTime(i: number) {
  
    console.log('remove job time ', this.job_times[i]);
    if(this.job_times[i]){
        alert("Index IF I " + i);
    
    this.timeSheetService.deleteJobTime(this.job_times[i].id).subscribe(
      response => {
        console.log("Job time deleted ");
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log(' client error ', err.error.message);
        } else {
          console.log('  Backend returned status code: ', err.status);
          console.log('  Response body: ', err.error);
          
        }
        this.modalService.hide(1);
      }
    )
    console.log("Delete job time ", this.job_times[i].id)
    
    //const controle = <FormArray> this.tsForm.controls['job_times_attributes'];
    // controle.removeAt(i);
  }
  this.jobtimeFormArray.removeAt(i);
  }
  update() {
    console.log("Form Value ", this.tsForm.value);
    console.log("Form Job times ", this.tsForm.value.job_times_attributes[0].time_sheet_id);
    this.timeSheetService.updateTimeSheet(this.tsForm.value, this.tsForm.value.job_times_attributes[0].time_sheet_id).subscribe(
      response => {
        console.log('Update Response ', response);
        this.modalService.hide(1);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log(' client error ', err.error.message);
        } else {
          console.log('  Backend returned status code: ', err.status);
          console.log('  Response body: ', err.error);
        }
        this.modalService.hide(1);
      }
    )
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
