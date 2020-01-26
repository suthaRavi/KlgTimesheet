import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { JobCategory } from './job-category';
import { JobCategoryService } from './job-category.service';

@Component({
  selector: 'job-category',
  templateUrl: './job-category.component.html',
  styleUrls: ['./job-category.component.css']
})
export class JobCategoryComponent implements OnInit {
  @Input('jobCategory-mode') jobCategoryMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template', {static: false}) template: TemplateRef<any>
  private isInsert: boolean = true;
  jobCategories: JobCategory[];
  private jobCategory: JobCategory = new JobCategory;

  private jobCategoryForm: FormGroup;

  modalRef: BsModalRef;

  constructor(private jobCategoryService: JobCategoryService,
    private modalService: BsModalService, private fb: FormBuilder) { }
  ngOnInit() {
    this.getJobCategories();
    this.jobCategoryForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  getJobCategories(){
    this.jobCategoryService.getJobCategories().subscribe(
      results =>{
        this.jobCategories = results;
        console.log("JobCategory ", this.jobCategories);
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
  presentJobCategoryDialog(mode?: 'Add' | 'Update', value?: JobCategory ){
    console.log("** " + mode);
    
    this.jobCategoryMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.jobCategory = new JobCategory;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.jobCategory = value;
        console.log("From Update ", this.jobCategory);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addJobCategory(jobCategory){
    console.log("Add jobCategory ", jobCategory.code );
    
    this.jobCategoryService.addJobCategory(jobCategory).subscribe(            
                            res =>{   
                                this.jobCategories.push(res); 
                                this.jobCategory= new JobCategory;
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

  updateJobCategory(value: JobCategory)
  {

    this.jobCategoryService.updateJobCategory(this.jobCategory).subscribe
    (
      response => 
      {
        this.jobCategory = response
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

  removeJobCategory(jobCategory)
  {
      if(confirm("Do you want delete JobCategory id " + jobCategory.id) == true)
      {
        console.log("remove " + jobCategory.id); 
        let id = jobCategory.id;     
        this.jobCategoryService.deleteJobCategory(jobCategory.id).subscribe(
            response => 
            { //this.jobCategories = response;
              this.jobCategories = this.jobCategories.filter(jobCategory => jobCategory.id !== id)
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
