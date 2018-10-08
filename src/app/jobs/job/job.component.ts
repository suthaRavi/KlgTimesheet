import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Job } from '../job/job';
import { JobService } from '../job/job.service';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @Input('job-mode') jobMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template') template: TemplateRef<any>
  private isInsert: boolean = true;
  jobs: Job[];
  customers: Customer[];
  private job: Job = new Job;

  private jobForm: FormGroup;

  modalRef: BsModalRef;

  constructor(private jobService: JobService,private customerService: CustomerService,
    private modalService: BsModalService, private fb: FormBuilder) {  }

  ngOnInit() {
   // this.getJobs();
    this.jobForm = this.fb.group({
      job_id: ['', Validators.required],
      name: ['', Validators.required],
      customer_id: ['', Validators.required],
      order_date: ['', Validators.required],
      shipping_date: ['', Validators.required],
      shipped_date: [''],
      estimated_hour: ['', Validators.required],
      actual_hour: [''],
      status: ['', Validators.required],
      previousjob_id: ['']

  });

  this.getResources();
  }

  _previousjobs(){
    return this.fb.group({
      pjob_id: ['']
    })
  }

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
  presentJobDialog(mode?: 'Add' | 'Update', value?: Job ){
    console.log("** " + mode);
    
    this.jobMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.job = new Job;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.job = value;
        console.log("From Update ", this.job);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addJob(job){
    console.log("Add job ", job.code );
    
    this.jobService.addJob(job).subscribe(            
                            res =>{   
                                this.jobs.push(res); 
                                this.job= new Job;
                                this.modalService.hide(1);                      
                               // this.closeModal(); 
                             //  this.modalAction.emit({action:"modal",params:['close']});                                                     
                            }, 
                                                                               
                            (err: HttpErrorResponse) => {
                              if(err.error instanceof Error){
                                console.log(' client error ', err.error.message);
                              }else{
                                console.log('  Backend returned status code: ', err.status);
                                console.log('  Response body: ', err.error);
                              }
                              this.modalService.hide(1); 
                            });    
                  
  }

  updateJob(value: Job)
  {

    this.jobService.updateJob(this.job).subscribe
    (
      response => 
      {
        this.job = response
        this.modalService.hide(1);
      },
      (err: HttpErrorResponse) => 
      {
        if(err.error instanceof Error){
          console.log(' client error ', err.error.message);
        }else{
          console.log('  Backend returned status code: ', err.status);
          console.log('  Response body: ', err.error);
        }
        this.modalService.hide(1); 
      } 
    )
   
  }

  removeJob(job)
  {
      if(confirm("Do you want delete Job id " + job.job_id) == true)
      {
        console.log("remove " + job.job_id); 
        let id = job.job_id;     
        this.jobService.deleteJob(job.job_id).subscribe(
            response => 
            { //this.jobs = response;
              this.jobs = this.jobs.filter(job => job.job_id !== id)
            },
            (err: HttpErrorResponse) => 
            {
              if(err.error instanceof Error){
                console.log(' client error ', err.error.message);
              }else{
                console.log('  Backend returned status code: ', err.status);
                console.log('  Response body: ', err.error);
              }
              this.modalService.hide(1); 
            } 
        )
      }
      else{
      }
  }

  getResources(){
    let jobs = this.jobService.getJobs();
    let cust = this.customerService.getCustomers();

    forkJoin([jobs, cust]).subscribe(
      results => {
        this.jobs = results[0];
        this.customers = results[1];
        console.log("Jobs: ", results[0]);
        console.log("Customers: ", this.customers);
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
