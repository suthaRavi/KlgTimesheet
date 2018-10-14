import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { JobStatus } from './job-status';
import { JobStatusService } from './job-status.service'
@Component({
  selector: 'job-statuses',
  templateUrl: './job-statuses.component.html',
  styleUrls: ['./job-statuses.component.css']
})
export class JobStatusesComponent implements OnInit {
  @Input('jobStatus-mode') jobStatusMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template') template: TemplateRef<any>
  private isInsert: boolean = true;
  jobStatuses: JobStatus[];
  private jobStatus: JobStatus = new JobStatus;

  private jobStatusForm: FormGroup;

  modalRef: BsModalRef;
  constructor( private jobStatusService: JobStatusService,
    private modalService: BsModalService, private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.getJobStatuses();
    this.jobStatusForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  getJobStatuses(){
    this.jobStatusService.getJobStatuses().subscribe(
      results =>{
        this.jobStatuses = results;
        console.log("JobStatus ", this.jobStatuses);
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
  presentJobStatusDialog(mode?: 'Add' | 'Update', value?: JobStatus ){
    console.log("** " + mode);
    
    this.jobStatusMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.jobStatus = new JobStatus;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.jobStatus = value;
        console.log("From Update ", this.jobStatus);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addJobStatus(jobStatus){
    console.log("Add jobStatus ", jobStatus.code );
    
    this.jobStatusService.addJobStatus(jobStatus).subscribe(            
                            res =>{   
                                this.jobStatuses.push(res); 
                                this.jobStatus= new JobStatus;
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

  updateJobStatus(value: JobStatus)
  {

    this.jobStatusService.updateJobStatus(this.jobStatus).subscribe
    (
      response => 
      {
        this.jobStatus = response
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

  removeJobStatus(jobStatus)
  {
      if(confirm("Do you want delete JobStatus id " + jobStatus.id) == true)
      {
        console.log("remove " + jobStatus.id); 
        let id = jobStatus.id;     
        this.jobStatusService.deleteJobStatus(jobStatus.id).subscribe(
            response => 
            { //this.jobStatuses = response;
              this.jobStatuses = this.jobStatuses.filter(jobStatus => jobStatus.id !== id)
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

}
